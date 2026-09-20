import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvVzMtDD-vUpZ3_5ChCwwP1VH-j9Po_Q4",
  authDomain: "midad-app.firebaseapp.com",
  projectId: "midad-app",
  storageBucket: "midad-app.firebasestorage.app",
  messagingSenderId: "322301314853",
  appId: "1:322301314853:web:63d7f507477ac2600a7ccc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const adminLogin = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const adminLogout = () =>
  signOut(auth);
export const db = getFirestore(app);

export async function saveOrder(orderData) {
  const docRef = await addDoc(collection(db, "orders"), { ...orderData, createdAt: serverTimestamp() });
  return docRef.id;
}

export async function fetchOrders() {
  try {
    const snapshot = await getDocs(collection(db, "orders"));
    
    const orders = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

    return orders.sort((a, b) => {
      const timeA = a.createdAt?.seconds || a.id || 0;
      const timeB = b.createdAt?.seconds || b.id || 0;
      return timeB - timeA;
    });
  } catch (error) {
    console.error("خطأ في جلب الطلبات من Firestore:", error);
    return [];
  }
}
