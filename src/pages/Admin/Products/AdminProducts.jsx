import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiMoreVertical, FiX, FiUploadCloud } from 'react-icons/fi';
import styles from './AdminProducts.module.css';

// Dummy data for presentation
const initialProducts = [
  { id: 1, brand: 'Apple', model: 'iPhone 15 Pro Max', price: 149900, stock: 45, category: 'Smartphones' },
  { id: 2, brand: 'Samsung', model: 'Galaxy S24 Ultra', price: 129999, stock: 32, category: 'Smartphones' },
  { id: 3, brand: 'Nothing', model: 'Phone (2)', price: 44999, stock: 15, category: 'Smartphones' },
  { id: 4, brand: 'OnePlus', model: '12 5G', price: 64999, stock: 0, category: 'Smartphones' },
  { id: 5, brand: 'Xiaomi', model: '14 Ultra', price: 99999, stock: 8, category: 'Smartphones' },
];

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newProduct, setNewProduct] = useState({
    brand: 'New Brand',
    model: '',
    price: '',
    description: '',
    image: '',
    stock: 10,
    category: 'Smartphones'
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productToAdd = {
      id: Date.now(),
      brand: newProduct.brand,
      model: newProduct.model || 'Untitled Product',
      price: parseInt(newProduct.price) || 0,
      stock: newProduct.stock,
      category: newProduct.category,
      image: newProduct.image
    };
    setProducts([productToAdd, ...products]);
    setIsModalOpen(false);
    setNewProduct({ brand: 'New Brand', model: '', price: '', description: '', image: '', stock: 10, category: 'Smartphones' });
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Products</h1>
          <p className={styles.subtitle}>Manage your showroom devices and inventory.</p>
        </div>
        <motion.button 
          className={styles.addBtn}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
        >
          <FiPlus /> Add Product
        </motion.button>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search products by name or brand..." 
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.tableContainer}>
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
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className={styles.productInfo}>
                    <div className={styles.imgPlaceholder}>
                      {product.image && <img src={product.image} alt={product.model} className={styles.productThumbnail} />}
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
                    <button className={styles.iconBtn} title="Edit"><FiEdit2 /></button>
                    <button className={`${styles.iconBtn} ${styles.deleteBtn}`} title="Delete"><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
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
              <h2>Add New Product</h2>
              <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>
                <FiX />
              </button>
            </div>
            
            <form onSubmit={handleAddProduct} className={styles.modalForm}>
              <div className={styles.formGroup}>
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

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Stock Quantity</label>
                <input 
                  type="number" 
                  className={styles.formInput} 
                  placeholder="e.g. 45" 
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Description</label>
                <textarea 
                  className={styles.formTextarea} 
                  placeholder="Enter product description..."
                  rows={3}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                ></textarea>
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
                    onChange={(e) => {
                      if(e.target.files && e.target.files[0]){
                        setNewProduct({...newProduct, image: URL.createObjectURL(e.target.files[0])});
                      }
                    }}
                  />
                  {newProduct.image ? (
                    <img src={newProduct.image} alt="Preview" className={styles.previewImage} />
                  ) : (
                    <>
                      <FiUploadCloud className={styles.uploadIcon} />
                      <p>Click to upload image</p>
                      <span>PNG, JPG up to 5MB</span>
                    </>
                  )}
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className={styles.submitBtn}>Save Product</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
