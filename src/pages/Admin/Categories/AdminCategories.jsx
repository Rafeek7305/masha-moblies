import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiX, FiList, FiEye } from 'react-icons/fi';
import styles from './AdminCategories.module.css';
import { subscribeToProducts } from '../../../services/productService';
import { 
  createCategory, 
  subscribeToCategories, 
  updateCategory, 
  deleteCategory 
} from '../../../services/categoryService';

const AdminCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [subBrandsList, setSubBrandsList] = useState([]);
  const [newBrandInput, setNewBrandInput] = useState('');
  const [viewingCategory, setViewingCategory] = useState(null);

  useEffect(() => {
    const unsubCategories = subscribeToCategories((data, err) => {
      if (err) {
        setError(err);
      } else {
        setCategories(data);
        setError(null);
      }
      setLoadingCategories(false);
    });
    
    const unsubProducts = subscribeToProducts((data, err) => {
      if (!err) setProducts(data);
    });

    return () => {
      unsubCategories();
      unsubProducts();
    };
  }, []);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setCategoryName('');
    setSubBrandsList([]);
    setNewBrandInput('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setSubBrandsList(category.subBrands ? [...category.subBrands] : []);
    setNewBrandInput('');
    setIsModalOpen(true);
  };

  const handleAddBrand = (e) => {
    if (e) e.preventDefault();
    const trimmed = newBrandInput.trim();
    if (trimmed && !subBrandsList.includes(trimmed)) {
      setSubBrandsList([...subBrandsList, trimmed]);
      setNewBrandInput('');
    }
  };

  const handleRemoveBrand = (index) => {
    setSubBrandsList(subBrandsList.filter((_, i) => i !== index));
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    const trimmed = categoryName.trim();
    if (!trimmed) return;

    if (editingCategory) {
      // Check duplicates
      const exists = categories.some(
        c => c.name.toLowerCase() === trimmed.toLowerCase() && (!editingCategory || c.id !== editingCategory.id)
      );
      if (exists) {
        alert('Category already exists.');
        return;
      }

      const { error } = await updateCategory(editingCategory.id, trimmed, subBrandsList);
      if (error) alert(`Error updating: ${error}`);
    } else {
      // Check duplicates
      const exists = categories.some(
        c => c.name.toLowerCase() === trimmed.toLowerCase()
      );
      if (exists) {
        alert('Category already exists.');
        return;
      }

      const { error } = await createCategory(trimmed, subBrandsList);
      if (error) alert(`Error creating: ${error}`);
    }

    setIsModalOpen(false);
    setEditingCategory(null);
    setCategoryName('');
    setSubBrandsList([]);
    setNewBrandInput('');
  };

  // Calculate product counts per category id
  const getProductCount = (catId) => {
    return products.filter((p) => p.categoryId === catId).length;
  };

  // Filter categories by search term
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Categories</h1>
          <p className={styles.subtitle}>Manage your product categories dynamically.</p>
        </div>
        <motion.button 
          className={styles.addBtn}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpenAdd}
        >
          <FiPlus /> Add Category
        </motion.button>
      </div>
      {error && <div style={{ color: '#ff4d4d', padding: '1rem', background: 'rgba(255,0,0,0.1)', borderRadius: '8px', marginBottom: '1rem' }}>Error: {error}</div>}

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search categories by name..." 
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.tableContainer}>
        {loadingCategories ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
            Loading categories...
          </div>
        ) : filteredCategories.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
            {categories.length === 0 ? 'No categories yet. Create your first product category to get started.' : 'No matching categories found.'}
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Associated Products</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((cat) => (
                <tr key={cat.id}>
                  <td>
                    <span className={styles.categoryName}>{cat.name}</span>
                  </td>
                  <td>
                    <span className={styles.productCountBadge}>
                      {getProductCount(cat.id)} {getProductCount(cat.id) === 1 ? 'Product' : 'Products'}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button 
                        className={styles.iconBtn} 
                        title="View Products"
                        onClick={() => navigate(`/admin/products?category=${encodeURIComponent(cat.id)}`)}
                      >
                        <FiList />
                      </button>
                      <button 
                        className={styles.iconBtn} 
                        title="View Sub Brands"
                        onClick={() => setViewingCategory(cat)}
                      >
                        <FiEye />
                      </button>
                      <button 
                        className={styles.iconBtn} 
                        title="Edit"
                        onClick={() => handleOpenEdit(cat)}
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        className={`${styles.iconBtn} ${styles.deleteBtn}`} 
                        title="Delete"
                        onClick={async () => {
                          if (window.confirm(`Are you sure you want to delete category "${cat.name}"? Products in this category will become uncategorized.`)) {
                            const { error } = await deleteCategory(cat.id);
                            if (error) alert(`Error deleting: ${error}`);
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

      {/* Category Add/Edit Modal */}
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
              <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
              <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>
                <FiX />
              </button>
            </div>
            
            <form onSubmit={handleSaveCategory} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Category Name</label>
                <input 
                  type="text" 
                  className={styles.formInput} 
                  placeholder="e.g. Tablets, Audio, Wearables" 
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Sub Brands</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: subBrandsList.length > 0 ? '1rem' : '0' }}>
                  {subBrandsList.map((brand, idx) => (
                    <div key={idx} style={{ background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.3)', padding: '0.4rem 0.8rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.85rem', color: '#fff' }}>{brand}</span>
                      <button type="button" onClick={() => handleRemoveBrand(idx)} style={{ background: 'none', border: 'none', color: '#e71d36', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }} title="Remove Brand">
                        <FiX size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="text" 
                    className={styles.formInput} 
                    placeholder="Enter new brand name..." 
                    value={newBrandInput}
                    onChange={(e) => setNewBrandInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddBrand(e);
                      }
                    }}
                  />
                  <button 
                    type="button" 
                    onClick={handleAddBrand}
                    style={{ background: '#00d4ff', color: '#0b0f19', border: 'none', borderRadius: '10px', padding: '0 1.2rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', whiteSpace: 'nowrap' }}
                  >
                    <FiPlus /> Add
                  </button>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className={styles.submitBtn}>
                  {editingCategory ? 'Update Category' : 'Save Category'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Sub Brands View Modal */}
      {viewingCategory && (
        <div className={styles.modalOverlay}>
          <motion.div 
            className={styles.modal}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ maxWidth: '500px' }}
          >
            <div className={styles.modalHeader}>
              <h2>{viewingCategory.name} - Sub Brands</h2>
              <button className={styles.closeBtn} onClick={() => setViewingCategory(null)}>
                <FiX />
              </button>
            </div>
            
            <div style={{ padding: '1.5rem' }}>
              {(!viewingCategory.subBrands || viewingCategory.subBrands.length === 0) ? (
                <div style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '2rem 0' }}>
                  No sub brands found for this category.
                </div>
              ) : (
                <table className={styles.table} style={{ background: 'transparent' }}>
                  <thead>
                    <tr>
                      <th>Brand Name</th>
                      <th style={{ textAlign: 'right' }}>Products</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewingCategory.subBrands.map((brandName, idx) => {
                      const count = products.filter(p => p.categoryId === viewingCategory.id && p.brandName === brandName).length;
                      return (
                        <tr key={idx}>
                          <td><span className={styles.categoryName}>{brandName}</span></td>
                          <td style={{ textAlign: 'right' }}>
                            <span className={styles.productCountBadge}>
                              {count} {count === 1 ? 'Product' : 'Products'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
