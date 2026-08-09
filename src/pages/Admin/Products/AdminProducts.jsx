import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiX, FiUploadCloud } from 'react-icons/fi';
import styles from './AdminProducts.module.css';
import { useProducts } from '../../../context/ProductsContext';

const AdminProducts = () => {
  const { products, addProduct, deleteProduct, updateProduct, categories } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const defaultProductState = {
    brand: '',
    model: '',
    price: '',
    description: '',
    image: '',
    stock: 10,
    category: '',
    storage: '128GB',
    ram: '8GB',
    exchangeAvailable: true
  };

  const [newProduct, setNewProduct] = useState(defaultProductState);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setNewProduct(defaultProductState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setNewProduct({
      brand: product.brand || '',
      model: product.model || '',
      price: product.price || '',
      description: product.description || '',
      image: product.image || '',
      stock: product.stock !== undefined ? product.stock : 10,
      category: product.category || 'Smartphones',
      storage: product.storage || '128GB',
      ram: product.ram || '8GB',
      exchangeAvailable: product.exchangeAvailable !== undefined ? product.exchangeAvailable : true
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const productData = {
      brand: newProduct.brand.trim() || 'Generic',
      model: newProduct.model.trim() || 'Untitled Product',
      price: parseInt(newProduct.price) || 0,
      stock: parseInt(newProduct.stock) || 0,
      category: newProduct.category,
      storage: newProduct.storage.trim() || 'N/A',
      ram: newProduct.ram.trim() || 'N/A',
      description: newProduct.description.trim(),
      image: newProduct.image,
      exchangeAvailable: newProduct.exchangeAvailable
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, { ...editingProduct, ...productData });
    } else {
      addProduct(productData);
    }
    
    setIsModalOpen(false);
    setEditingProduct(null);
    setNewProduct(defaultProductState);
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
        setNewProduct(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredProducts = products.filter(product => 
    product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Products</h1>
          <p className={styles.subtitle}>Manage your showroom devices and inventory dynamically.</p>
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
            placeholder="Search products by name, brand, or category..." 
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.tableContainer}>
        {filteredProducts.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
            No products found. Add a new product or adjust your search.
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
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
                        <p className={styles.brandName}>{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td>{product.category}</td>
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
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete ${product.brand} ${product.model}?`)) {
                            deleteProduct(product.id);
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Brand</label>
                  <input 
                    type="text" 
                    className={styles.formInput} 
                    placeholder="e.g. Apple" 
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Model Name</label>
                  <input 
                    type="text" 
                    className={styles.formInput} 
                    placeholder="e.g. iPhone 15 Pro Max" 
                    value={newProduct.model}
                    onChange={(e) => setNewProduct({...newProduct, model: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Category</label>
                  <select 
                    className={styles.formSelect}
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

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
                  <label className={styles.formLabel}>Stock Quantity</label>
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
                  <label className={styles.formLabel}>Storage Spec</label>
                  <input 
                    type="text" 
                    className={styles.formInput} 
                    placeholder="e.g. 256GB" 
                    value={newProduct.storage}
                    onChange={(e) => setNewProduct({...newProduct, storage: e.target.value})}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>RAM Spec</label>
                  <input 
                    type="text" 
                    className={styles.formInput} 
                    placeholder="e.g. 8GB" 
                    value={newProduct.ram}
                    onChange={(e) => setNewProduct({...newProduct, ram: e.target.value})}
                  />
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
                <button type="submit" className={styles.submitBtn}>
                  {editingProduct ? 'Update Product' : 'Save Product'}
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
