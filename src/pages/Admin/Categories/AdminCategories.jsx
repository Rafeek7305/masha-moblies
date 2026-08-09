import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import styles from './AdminCategories.module.css';
import { useProducts } from '../../../context/ProductsContext';

const AdminCategories = () => {
  const { 
    categories, 
    products, 
    addCategory, 
    deleteCategory, 
    updateCategory 
  } = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setCategoryName('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setIsModalOpen(true);
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    const trimmed = categoryName.trim();
    if (!trimmed) return;

    if (editingCategory) {
      updateCategory(editingCategory.id, trimmed);
    } else {
      addCategory(trimmed);
    }

    setIsModalOpen(false);
    setEditingCategory(null);
    setCategoryName('');
  };

  // Calculate product counts per category name
  const getProductCount = (catName) => {
    return products.filter((p) => p.category === catName).length;
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
        {filteredCategories.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
            No categories found. Create a new category to get started.
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
                      {getProductCount(cat.name)} {getProductCount(cat.name) === 1 ? 'Product' : 'Products'}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
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
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete category "${cat.name}"? Products in this category will become uncategorized.`)) {
                            deleteCategory(cat.id);
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
    </div>
  );
};

export default AdminCategories;
