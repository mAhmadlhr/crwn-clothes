import { initializeApp } from 'firebase/app';
import { getAuth,
          signInWithRedirect,
          signInWithPopup,
          GoogleAuthProvider,
          createUserWithEmailAndPassword
         } from 'firebase/auth';
import { getFirestore,
        doc,
        getDoc,
        setDoc 
      } from 'firebase/firestore';
import { useRef } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyAU7IRqT3k_VRgAHZnnaBaxxfpXDSUGmIw",
    authDomain: "crwmclothes.firebaseapp.com",
    projectId: "crwmclothes",
    storageBucket: "crwmclothes.appspot.com",
    messagingSenderId: "236001039618",
    appId: "1:236001039618:web:411de70ec753a77b07de1b"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ 
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
  export const db = getFirestore();
  export const createDocumentFromAuth = async (userAuth) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapShot = (await getDoc(userDocRef));

    if(!userSnapShot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      }catch(error){
        console.log('error creating user',error.message);
      }
    }
    return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await createUserWithEmailAndPassword(auth,  email, password);
  }