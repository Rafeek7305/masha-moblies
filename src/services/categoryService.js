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
  where,
  getDocs
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const CATEGORIES_COLLECTION = 'categories';
const BRANDS_COLLECTION = 'brands';
const PRODUCTS_COLLECTION = 'products';

// 1. Create
export const createCategory = async (name, subBrands = []) => {
  try {
    const docRef = await addDoc(collection(db, CATEGORIES_COLLECTION), {
      name,
      subBrands,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, error: null };
  } catch (error) {
    return { id: null, error: error.message };
  }
};

// 2. Read (Real-time subscription)
export const subscribeToCategories = (callback) => {
  const q = query(
    collection(db, CATEGORIES_COLLECTION),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const categories = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(categories, null);
  }, (error) => {
    callback([], error.message);
  });
};

// 3. Update
export const updateCategory = async (id, newName, subBrands = []) => {
  try {
    const categoryRef = doc(db, CATEGORIES_COLLECTION, id);
    await updateDoc(categoryRef, {
      name: newName,
      subBrands,
      updatedAt: serverTimestamp()
    });
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// 4. Delete
export const deleteCategory = async (id) => {
  try {
    // Check for products
    const productsQ = query(collection(db, PRODUCTS_COLLECTION), where("categoryId", "==", id));
    const productsSnapshot = await getDocs(productsQ);
    
    if (!productsSnapshot.empty) {
      return { error: "This category contains products. Please remove them before deleting the category." };
    }

    await deleteDoc(doc(db, CATEGORIES_COLLECTION, id));
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};
