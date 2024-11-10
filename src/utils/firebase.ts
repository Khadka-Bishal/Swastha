import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDzOmGegJ7gERq_FmdDcnuDv-ai6kpjF7w",
  authDomain: "health-c9bcb.firebaseapp.com",
  projectId: "health-c9bcb",
  storageBucket: "health-c9bcb.appspot.com",
  messagingSenderId: "146527785628",
  appId: "1:146527785628:web:6c5f298562de76daba9359",
  measurementId: "G-7187BV04G1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    
    provider.setCustomParameters({
      prompt: 'select_account',
      login_hint: 'user@example.com'
    });
    
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export { auth };