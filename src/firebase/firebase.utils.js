import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCV2BxswxcHWzsG7FxRHp2MhQJR1ZgbTLo",
  authDomain: "crwn-db-934b4.firebaseapp.com",
  projectId: "crwn-db-934b4",
  storageBucket: "crwn-db-934b4.appspot.com",
  messagingSenderId: "81982397949",
  appId: "1:81982397949:web:01d6e666d590cf64fa8d94"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${ userAuth.uid }`)
  const snapshot = await userRef.get()
  // console.log(snapshot)

  if(!snapshot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (e) {
      console.log('Error creating user', e.message)
    }
  }
  return userRef;
}

firebase.initializeApp(config)

export const firestore = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;