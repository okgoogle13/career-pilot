import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: (import.meta.env ? import.meta.env.VITE_FIREBASE_API_KEY : undefined) || 'dummy-key',
  authDomain: (import.meta.env ? import.meta.env.VITE_FIREBASE_AUTH_DOMAIN : undefined) || 'dummy-domain',
  projectId: (import.meta.env ? import.meta.env.VITE_FIREBASE_PROJECT_ID : undefined) || 'dummy-project',
  storageBucket: (import.meta.env ? import.meta.env.VITE_FIREBASE_STORAGE_BUCKET : undefined) || 'dummy-bucket',
  messagingSenderId: (import.meta.env ? import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID : undefined) || 'dummy-sender',
  appId: (import.meta.env ? import.meta.env.VITE_FIREBASE_APP_ID : undefined) || 'dummy-app',
};



import { getFirestore, Firestore } from 'firebase/firestore';

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let storage: FirebaseStorage;
let db: Firestore;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  storage = getStorage(app);
  db = getFirestore(app);
} catch (error) {
  console.error('Firebase initialization failed:', error);
  // Fallback for tests or missing config
  auth = {} as Auth;
  storage = {} as FirebaseStorage;
  db = {} as Firestore;
}

export { auth, storage, db };
