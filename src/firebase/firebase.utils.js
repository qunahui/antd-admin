// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';

// const config = {
//   apiKey: 'AIzaSyAUif7Je-Xg-sqtKr9GM66AxFWyC8eifNI',
//   authDomain: 'crwn-db-8ea05.firebaseapp.com',
//   databaseURL: 'https://crwn-db-8ea05.firebaseio.com',
//   projectId: 'crwn-db-8ea05',
//   storageBucket: 'crwn-db-8ea05.appspot.com',
//   messagingSenderId: '633990243674',
//   appId: '1:633990243674:web:38331502bcaac0ad34bf63',
//   measurementId: 'G-1H2VJWYRKK',
// };

// firebase.initializeApp(config);

// export const createUserProfileDocument = async (userAuth, additionalData) => {
//   if (!userAuth) return;

//   const userRef = firestore.doc(`users/${userAuth.uid}`);

//   const snapShot = await userRef.get();

//   if (!snapShot.exists) {
//     const { displayName, email } = userAuth;
//     const createdAt = new Date();
//     try {
//       await userRef.set({
//         displayName,
//         email,
//         createdAt,
//         ...additionalData,
//       });
//     } catch (error) {
//       console.log('error creating user', error.message);
//     }
//   }

//   return userRef;
// };

// export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
//   const collectionRef = firestore.collection(collectionKey);
//   console.log(collectionRef);

//   const batch = firestore.batch();
//   objectToAdd.forEach((obj) => {
//     const newDocRef = collectionRef.doc();
//     batch.set(newDocRef, obj);
//   });

//   await batch.commit();
// };

// export const createSlugForDocuments = async (collectionKey) => {
//   const collectionRef = firestore.collection(collectionKey);

//   const batch = firestore.batch();

//   const collections = await collectionRef.get();

//   collections.docs.forEach((collection, index) => {
//     let { items, ...otherProps } = collection.data();

//     items.forEach((collectionItem) => {
//       let slug = collectionItem.name
//         .toLowerCase()
//         .split('-')
//         .join('_')
//         .split(' ')
//         .join('-');
//       collectionItem.slug = slug;
//     });
//     batch.set(collection.ref, { items, ...otherProps });
//   });

//   await batch.commit();
// };

// export const convertCollectionsSnapshotToMap = (collectionSnapshot) => {
//   const transformedCollection = collectionSnapshot.docs.map((doc) => {
//     const { title, items } = doc.data();

//     return {
//       routeName: encodeURI(title),
//       id: doc.id,
//       title,
//       items,
//     };
//   });

//   return transformedCollection.reduce((acc, collection) => {
//     acc[collection.title.toLowerCase()] = collection;
//     return acc;
//   }, {});
// };

// export const getCurrentUser = () => {
//   return new Promise((resolve, reject) => {
//     const unsubcribe = auth.onAuthStateChanged((userAuth) => {
//       unsubcribe();
//       resolve(userAuth);
//     }, reject);
//   });
// };

// export const auth = firebase.auth();
// export const firestore = firebase.firestore();

// export const googleProvider = new firebase.auth.GoogleAuthProvider();
// googleProvider.setCustomParameters({ prompt: 'select_account' });
// export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

// export default firebase;
