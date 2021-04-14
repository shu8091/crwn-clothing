import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Firebase config
const config = {
  apiKey: "AIzaSyCV2BxswxcHWzsG7FxRHp2MhQJR1ZgbTLo",
  authDomain: "crwn-db-934b4.firebaseapp.com",
  projectId: "crwn-db-934b4",
  storageBucket: "crwn-db-934b4.appspot.com",
  messagingSenderId: "81982397949",
  appId: "1:81982397949:web:01d6e666d590cf64fa8d94"
};

//--------------------------------------------------
// Create user
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

//-------------------------------------------------
// Push shop data to cloud one time
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  // console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    // console.log(newDocRef);
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
}

//--------------------------------------------------
// Get whole shop data snapshot from cloud

// convert it to an obj
export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });
  // console.log(transformedCollection);
  // pass in the empty obj as our redux initial state reduce( ,{});
  return transformedCollection.reduce((acc, curCollection) => {
    acc[curCollection.title.toLowerCase()] = curCollection;
    return acc;
  }, {});
}

//--------------------------------------------------
// Get current user 

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  });
}



firebase.initializeApp(config)

export const firestore = firebase.firestore();
export const auth = firebase.auth();

// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: 'select_account' })

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);


export default firebase;