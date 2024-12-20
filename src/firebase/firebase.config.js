// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyABv1L6-LRAPCHNG49-7OiTbJlfJBJXmzA',
  authDomain: 'dautubenvung-1f476.firebaseapp.com',
  projectId: 'dautubenvung-1f476',
  storageBucket: 'dautubenvung-1f476.appspot.com',
  messagingSenderId: '874245522876',
  appId: '1:874245522876:web:ae0d4f44ec40fc387997b9',
  measurementId: 'G-4WH964LZMQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
export { auth, provider };
