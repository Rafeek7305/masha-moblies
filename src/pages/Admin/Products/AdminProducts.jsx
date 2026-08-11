import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiX, FiUploadCloud, FiArrowLeft } from 'react-icons/fi';
import styles from './AdminProducts.module.css';
import { 
  createProduct, 
  subscribeToProducts, 
  updateProduct, 
  deleteProduct 
} from '../../../services/productService';
import { subscribeToCategories } from '../../../services/categoryService';

const AdminProducts = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryFilter = searchParams.get('category');

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [brandSearch, setBrandSearch] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const unsubProducts = subscribeToProducts((data, err) => {
      if (!err) setProducts(data);
      setLoading(false);
    });
    
    const unsubCategories = subscribeToCategories((data, err) => {
      if (!err) setCategories(data);
    });

    return () => {
      unsubProducts();
      unsubCategories();
    };
  }, []);

  const defaultProductState = {
    brandName: '',
    categoryId: '',
    model: '',
    price: '',
    description: '',
    image: '',
    stock: 10,
    storage: '128GB',
    ram: '8GB',
    exchangeAvailable: true,
    hasStorage: false,
    hasRam: false
  };

  const [newProduct, setNewProduct] = useState(defaultProductState);

  const activeCategory = categories.find(c => c.id === newProduct.categoryId);
  const availableBrandsForCategory = activeCategory && activeCategory.subBrands ? activeCategory.subBrands : [];

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setNewProduct({ ...defaultProductState, categoryId: categoryFilter || '' });
    setBrandSearch('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setNewProduct({
      brandName: product.brandName || '',
      categoryId: product.categoryId || '',
      model: product.model || '',
      price: product.price || '',
      description: product.description || '',
      image: product.image || '',
      stock: product.stock !== undefined ? product.stock : 10,
      storage: product.storage !== 'N/A' ? product.storage : '128GB',
      ram: product.ram !== 'N/A' ? product.ram : '8GB',
      exchangeAvailable: product.exchangeAvailable !== undefined ? product.exchangeAvailable : true,
      hasStorage: product.storage !== 'N/A',
      hasRam: product.ram !== 'N/A'
    });
    setBrandSearch('');
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();

    if (!newProduct.categoryId || !newProduct.brandName) {
      alert("Please select both a category and a brand.");
      return;
    }

    setIsSaving(true);

    const catObj = categories.find(c => c.id === newProduct.categoryId);

    const productData = {
      model: newProduct.model.trim() || 'Untitled Product',
      name: newProduct.model.trim() || 'Untitled Product',
      brandId: newProduct.brandName, // Fallback for backwards compatibility if needed
      brandName: newProduct.brandName,
      categoryId: catObj.id,
      categoryName: catObj.name,
      price: parseInt(newProduct.price) || 0,
      stock: parseInt(newProduct.stock) || 0,
      storage: newProduct.hasStorage ? (newProduct.storage.trim() || 'N/A') : 'N/A',
      ram: newProduct.hasRam ? (newProduct.ram.trim() || 'N/A') : 'N/A',
      description: newProduct.description.trim(),
      image: newProduct.image,
      exchangeAvailable: newProduct.exchangeAvailable
    };

    if (editingProduct) {
      const { error: updErr } = await updateProduct(editingProduct.id, productData);
      if (updErr) {
        alert(updErr);
        setIsSaving(false);
        return;
      }
    } else {
      const { error: addErr } = await createProduct(productData);
      if (addErr) {
        alert(addErr);
        setIsSaving(false);
        return;
      }
    }
    
    setIsSaving(false);
    setIsSaved(true);
    
    setTimeout(() => {
      setIsSaved(false);
      setIsModalOpen(false);
      setEditingProduct(null);
      setNewProduct(defaultProductState);
    }, 200);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (limit to 2MB to keep localStorage happy)
      if (file.size > 2 * 1024 * 1024) {
        alert('File is too large. Please select an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const max_size = 800;
          if (width > height) {
            if (width > max_size) {
              height *= max_size / width;
              width = max_size;
            }
          } else {
            if (height > max_size) {
              width *= max_size / height;
              height = max_size;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.7);
          setNewProduct(prev => ({ ...prev, image: compressed }));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (product.brandName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (product.categoryName || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesCategory = true;
    if (categoryFilter) {
      matchesCategory = product.categoryId === categoryFilter;
    }

    let matchesBrand = true;
    if (brandFilter) {
      matchesBrand = product.brandName === brandFilter;
    }

    return matchesSearch && matchesCategory && matchesBrand;
  });

  const categoryNameDisplay = categoryFilter ? categories.find(c => c.id === categoryFilter)?.name : null;
  const activeFilterCategoryObj = categories.find(c => c.id === categoryFilter);
  const filterBrandsAvailable = categoryFilter 
    ? (activeFilterCategoryObj?.subBrands || [])
    : [...new Set(categories.flatMap(c => c.subBrands || []))].sort();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {categoryFilter && (
            <button 
              onClick={() => navigate('/admin/categories')}
              style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <FiArrowLeft /> Back
            </button>
          )}
          <div>
            <h1 className={styles.title}>
              {categoryNameDisplay ? `${categoryNameDisplay} Products` : 'All Products'}
            </h1>
            <p className={styles.subtitle}>Manage your showroom devices and inventory dynamically.</p>
          </div>
        </div>
        <motion.button 
          className={styles.addBtn}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpenAdd}
        >
          <FiPlus /> Add Product
        </motion.button>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search products..." 
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className={styles.searchInput} 
          style={{ width: 'auto', paddingLeft: '1rem' }}
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
        >
          <option value="">All Brands</option>
          {filterBrandsAvailable.map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
            Loading products...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
            {categoryFilter 
              ? `No products found in ${categoryFilter}. Add one to get started.` 
              : 'No products found. Add a new product or adjust your search.'}
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Code</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>{product.productCode}</span>
                  </td>
                  <td>
                    <div className={styles.productInfo}>
                      <div className={styles.imgPlaceholder}>
                        {product.image ? (
                          <img src={product.image} alt={product.model} className={styles.productThumbnail} />
                        ) : (
                          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>No Img</div>
                        )}
                      </div>
                      <div>
                        <p className={styles.modelName}>{product.model}</p>
                        <p className={styles.brandName}>{product.brandName}</p>
                      </div>
                    </div>
                  </td>
                  <td>{product.categoryName}</td>
                  <td className={styles.price}>₹{product.price.toLocaleString('en-IN')}</td>
                  <td>{product.stock}</td>
                  <td>
                    {product.stock > 0 ? (
                      <span className={`${styles.badge} ${styles.inStock}`}>In Stock</span>
                    ) : (
                      <span className={`${styles.badge} ${styles.outOfStock}`}>Out of Stock</span>
                    )}
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button 
                        className={styles.iconBtn} 
                        title="Edit"
                        onClick={() => handleOpenEdit(product)}
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        className={`${styles.iconBtn} ${styles.deleteBtn}`} 
                        title="Delete"
                        onClick={async () => {
                          if (window.confirm(`Are you sure you want to delete ${product.brandName} ${product.model}?`)) {
                            const { error } = await deleteProduct(product.id);
                            if (error) alert(error);
                          }
                        }}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Product Form Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <motion.div 
            className={styles.modal}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className={styles.modalHeader}>
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>
                <FiX />
              </button>
            </div>
            
            <form onSubmit={handleSaveProduct} className={styles.modalForm}>
              {editingProduct && (
                <div style={{ marginBottom: '1rem', padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Product Code: </span>
                  <strong style={{ color: '#fff' }}>{editingProduct.productCode}</strong>
                </div>
              )}
              
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Category</label>
                  <select 
                    className={styles.formSelect}
                    value={newProduct.categoryId}
                    onChange={(e) => {
                      setNewProduct({...newProduct, categoryId: e.target.value, brandName: ''});
                      setBrandSearch('');
                    }}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Brand</label>
                  {newProduct.categoryId ? (
                    availableBrandsForCategory.length > 0 ? (
                      <select 
                        className={styles.formSelect}
                        value={newProduct.brandName}
                        onChange={(e) => setNewProduct({...newProduct, brandName: e.target.value})}
                        required
                      >
                        <option value="">Select Brand</option>
                        {availableBrandsForCategory.map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    ) : (
                      <select className={styles.formSelect} disabled>
                        <option value="">No brands available</option>
                      </select>
                    )
                  ) : (
                    <select className={styles.formSelect} disabled>
                      <option value="">Select a category first</option>
                    </select>
                  )}
                </div>
              </div>

              <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
                <label className={styles.formLabel}>Product Name (Model)</label>
                <input 
                  type="text" 
                  className={styles.formInput} 
                  placeholder="e.g. iPhone 15 Pro Max" 
                  value={newProduct.model}
                  onChange={(e) => setNewProduct({...newProduct, model: e.target.value})}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Price (₹)</label>
                  <input 
                    type="number" 
                    className={styles.formInput} 
                    placeholder="e.g. 149900" 
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} style={{ whiteSpace: 'nowrap' }}>Stock</label>
                  <input 
                    type="number" 
                    className={styles.formInput} 
                    placeholder="e.g. 45" 
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <label className={styles.formLabel} style={{ marginBottom: 0, whiteSpace: 'nowrap' }}>Storage</label>
                    <div style={{ display: 'flex', gap: '0.2rem', background: 'rgba(255,255,255,0.05)', padding: '2px', borderRadius: '4px' }}>
                      <button 
                        type="button" 
                        onClick={() => setNewProduct({...newProduct, hasStorage: true})}
                        style={{ background: newProduct.hasStorage ? '#2ecc71' : 'transparent', color: newProduct.hasStorage ? '#fff' : 'rgba(255,255,255,0.5)', border: 'none', borderRadius: '3px', padding: '0.1rem 0.4rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
                      >
                        ✓
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setNewProduct({...newProduct, hasStorage: false})}
                        style={{ background: !newProduct.hasStorage ? '#e71d36' : 'transparent', color: !newProduct.hasStorage ? '#fff' : 'rgba(255,255,255,0.5)', border: 'none', borderRadius: '3px', padding: '0.1rem 0.4rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  {newProduct.hasStorage ? (
                    <input 
                      type="text" 
                      className={styles.formInput} 
                      placeholder="e.g. 256GB" 
                      value={newProduct.storage}
                      onChange={(e) => setNewProduct({...newProduct, storage: e.target.value})}
                    />
                  ) : (
                    <div style={{ padding: '0.8rem 1rem', background: 'rgba(231, 29, 54, 0.05)', color: '#e71d36', borderRadius: '10px', border: '1px solid rgba(231, 29, 54, 0.2)', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '46px' }}>
                      ✕
                    </div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <label className={styles.formLabel} style={{ marginBottom: 0, whiteSpace: 'nowrap' }}>RAM</label>
                    <div style={{ display: 'flex', gap: '0.2rem', background: 'rgba(255,255,255,0.05)', padding: '2px', borderRadius: '4px' }}>
                      <button 
                        type="button" 
                        onClick={() => setNewProduct({...newProduct, hasRam: true})}
                        style={{ background: newProduct.hasRam ? '#2ecc71' : 'transparent', color: newProduct.hasRam ? '#fff' : 'rgba(255,255,255,0.5)', border: 'none', borderRadius: '3px', padding: '0.1rem 0.4rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
                      >
                        ✓
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setNewProduct({...newProduct, hasRam: false})}
                        style={{ background: !newProduct.hasRam ? '#e71d36' : 'transparent', color: !newProduct.hasRam ? '#fff' : 'rgba(255,255,255,0.5)', border: 'none', borderRadius: '3px', padding: '0.1rem 0.4rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  {newProduct.hasRam ? (
                    <input 
                      type="text" 
                      className={styles.formInput} 
                      placeholder="e.g. 8GB" 
                      value={newProduct.ram}
                      onChange={(e) => setNewProduct({...newProduct, ram: e.target.value})}
                    />
                  ) : (
                    <div style={{ padding: '0.8rem 1rem', background: 'rgba(231, 29, 54, 0.05)', color: '#e71d36', borderRadius: '10px', border: '1px solid rgba(231, 29, 54, 0.2)', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '46px' }}>
                      ✕
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Description</label>
                <textarea 
                  className={styles.formTextarea} 
                  placeholder="Enter product description details..."
                  rows={2}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                ></textarea>
              </div>

              <div className={styles.formGroup} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <input 
                  type="checkbox" 
                  id="exchangeAvailable"
                  checked={newProduct.exchangeAvailable}
                  onChange={(e) => setNewProduct({...newProduct, exchangeAvailable: e.target.checked})}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="exchangeAvailable" className={styles.formLabel} style={{ marginBottom: 0, cursor: 'pointer', userSelect: 'none' }}>
                  Exchange Offer Eligible
                </label>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Product Image</label>
                <div 
                  className={styles.uploadArea}
                  onClick={() => document.getElementById('imageUpload').click()}
                >
                  <input 
                    type="file" 
                    id="imageUpload" 
                    hidden 
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {newProduct.image ? (
                    <div style={{ position: 'relative' }}>
                      <img src={newProduct.image} alt="Preview" className={styles.previewImage} />
                      <button 
                        type="button" 
                        style={{
                          position: 'absolute',
                          top: '-8px',
                          right: '-8px',
                          background: '#e71d36',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontSize: '0.7rem'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setNewProduct({ ...newProduct, image: '' });
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <>
                      <FiUploadCloud className={styles.uploadIcon} />
                      <p>Click to upload image</p>
                      <span>PNG, JPG (recommended under 2MB)</span>
                    </>
                  )}
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button 
                  type="submit" 
                  className={styles.submitBtn} 
                  disabled={isSaving || isSaved}
                  style={isSaved ? { background: '#2ecc71', color: '#fff', borderColor: '#2ecc71' } : {}}
                >
                  {isSaving ? 'Saving...' : isSaved ? 'Saved! Closing...' : (editingProduct ? 'Update Product' : 'Save Product')}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
