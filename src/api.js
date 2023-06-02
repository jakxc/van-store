
import { initializeApp } from "firebase/app";
import { 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    getFirestore, 
    query,
    where 
} from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "van-life-43038.firebaseapp.com",
  projectId: "van-life-43038",
  storageBucket: "van-life-43038.appspot.com",
  messagingSenderId: "20658744482",
  appId: "1:20658744482:web:27e39030d3d457fb5d7bfb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vansCollectionRef = collection(db, 'vans');

export async function getVans() {
    const querySnapshot = await getDocs(vansCollectionRef)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    // console.log(dataArr)
    return dataArr
}

export async function getVan(id) {
    const docRef = doc(db, 'vans', id);
    const querySnapshot = await getDoc(docRef);

    return {
        ...querySnapshot.data(),
        id: querySnapshot.id
    }
}


export async function getHostVans() {
    const q = query(vansCollectionRef, where('hostId', '==', '123'));
    const querySnapshot = await getDocs(q);
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    // console.log(dataArr)
    return dataArr
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}