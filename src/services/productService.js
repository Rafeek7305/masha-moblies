import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  serverTimestamp, 
  query, 
  orderBy,
  getDocs,
  limit
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const PRODUCTS_COLLECTION = 'products';

// Helper: Generate Product Code (e.g. MM-0001)
export const generateProductCode = async () => {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      orderBy('productCode', 'desc'),
      limit(1)
    );
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return 'MM-0001';
    }

    const lastProduct = snapshot.docs[0].data();
    const lastCode = lastProduct.productCode;
    
    if (lastCode && lastCode.startsWith('MM-')) {
      const numStr = lastCode.split('-')[1];
      const num = parseInt(numStr, 10);
      if (!isNaN(num)) {
        return `MM-${String(num + 1).padStart(4, '0')}`;
      }
    }
    
    // Fallback if parsing fails or unexpected format
    return `MM-${String(Date.now()).slice(-4)}`;
  } catch (err) {
    console.error("Error generating product code", err);
    return `MM-${String(Date.now()).slice(-4)}`;
  }
};

// 1. Create
export const createProduct = async (productData) => {
  try {
    const productCode = await generateProductCode();
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...productData,
      productCode,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, error: null };
  } catch (error) {
    return { id: null, error: error.message };
  }
};

// 2. Read (Real-time subscription)
export const subscribeToProducts = (callback) => {
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(products, null);
  }, (error) => {
    callback([], error.message);
  });
};

// 3. Update
export const updateProduct = async (id, updatedData) => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, id);
    await updateDoc(productRef, {
      ...updatedData,
      updatedAt: serverTimestamp()
    });
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// 4. Delete
export const deleteProduct = async (id) => {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};
