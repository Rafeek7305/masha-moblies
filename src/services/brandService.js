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

const BRANDS_COLLECTION = 'brands';
const PRODUCTS_COLLECTION = 'products';

// 1. Create
export const createBrand = async (brandData) => {
  try {
    const docRef = await addDoc(collection(db, BRANDS_COLLECTION), {
      ...brandData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, error: null };
  } catch (error) {
    return { id: null, error: error.message };
  }
};

// 2. Read (Real-time subscription)
export const subscribeToBrands = (callback) => {
  const q = query(
    collection(db, BRANDS_COLLECTION),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const brands = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(brands, null);
  }, (error) => {
    callback([], error.message);
  });
};

// 3. Update
export const updateBrand = async (id, updatedData) => {
  try {
    const brandRef = doc(db, BRANDS_COLLECTION, id);
    await updateDoc(brandRef, {
      ...updatedData,
      updatedAt: serverTimestamp()
    });
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// 4. Delete (with protection)
export const deleteBrand = async (id) => {
  try {
    // Check for products
    const q = query(collection(db, PRODUCTS_COLLECTION), where("brandId", "==", id));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return { error: "This brand has products assigned to it. Please move or delete those products before deleting the brand." };
    }

    await deleteDoc(doc(db, BRANDS_COLLECTION, id));
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};
