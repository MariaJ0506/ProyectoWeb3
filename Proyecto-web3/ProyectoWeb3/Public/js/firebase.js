import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCiYHmdntAZBRnhqinXMVd-r2QUE5dc7x4",
  authDomain: "proyectoweb-403ef.firebaseapp.com",
  projectId: "proyectoweb-403ef",
  storageBucket: "proyectoweb-403ef.firebasestorage.app",
  messagingSenderId: "318823215267",
  appId: "1:318823215267:web:9adc96aa9d46c2713ecf16",
  measurementId: "G-0GSKCYV2CE"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar los servicios
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Exportar los servicios
export { auth, db, storage, GoogleAuthProvider, FacebookAuthProvider };
