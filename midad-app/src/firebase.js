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

// دالة إضافة الطلبات المزيفة للمسابقة
export async function addBatchDummyOrders() {
  const dummyOrders = [
    {
      customerName: "عبدالله بن أحمد البوسعيدي",
      phone: "91234567",
      region: "مسقط",
      quantity: 5,
      total: 25,
      date: "12/08/2026",
      time: "09:15 ص",
      createdAt: new Date("2026-08-12T09:15:00"),
      receiptPreview: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=500&q=80"
    },
    {
      customerName: "Sultan Ali Al Maskari",
      phone: "95882211",
      region: "إبرا",
      quantity: 3,
      total: 18,
      date: "18/08/2026",
      time: "02:30 م",
      createdAt: new Date("2026-08-18T14:30:00"),
      receiptPreview: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=500&q=80"
    },
    {
      customerName: "مريم بنت خلفان المقبالية",
      phone: "96334455",
      region: "صحار",
      quantity: 8,
      total: 32,
      date: "25/08/2026",
      time: "11:45 ص",
      createdAt: new Date("2026-08-25T11:45:00"),
      receiptPreview: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=500&q=80"
    },
    {
      customerName: "Fatma Rashid Al Hinai",
      phone: "92110099",
      region: "نزوى",
      quantity: 3,
      total: 15,
      date: "02/09/2026",
      time: "05:10 م",
      createdAt: new Date("2026-09-02T17:10:00"),
      receiptPreview: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=500&q=80"
    },
    {
      customerName: "سعيد بن حمد الشحي",
      phone: "99447722",
      region: "خصب",
      quantity: 2,
      total: 12,
      date: "08/09/2026",
      time: "08:20 م",
      createdAt: new Date("2026-09-08T20:20:00"),
      receiptPreview: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=500&q=80"
    },
    {
      customerName: "Mohammed Khalid Al Zadjali",
      phone: "91778833",
      region: "مطرح",
      quantity: 4,
      total: 20,
      date: "12/09/2026",
      time: "10:05 ص",
      createdAt: new Date("2026-09-12T10:05:00"),
      receiptPreview: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=500&q=80"
    },
    {
      customerName: "شيخة بنت ناصر البلوشية",
      phone: "94556611",
      region: "صور",
      quantity: 2,
      total: 14,
      date: "17/09/2026",
      time: "03:40 م",
      createdAt: new Date("2026-09-17T15:40:00"),
      receiptPreview: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=500&q=80"
    },
    {
      customerName: "Tariq Salem Al Maamari",
      phone: "98332211",
      region: "صحم",
      quantity: 4,
      total: 20,
      date: "20/09/2026",
      time: "07:15 م",
      createdAt: new Date("2026-09-20T19:15:00"),
      receiptPreview: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=500&q=80"
    }
  ];

  for (const order of dummyOrders) {
    await addDoc(collection(db, "orders"), order);
  }
  console.log("تمت إضافة الطلبات بنجاح!");
}

if (typeof window !== "undefined") {
  window.addBatchDummyOrders = addBatchDummyOrders;
}
