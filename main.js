import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Add this import

const firebaseConfig = {
  apiKey: "AIzaSyCVH1WoPaFURzCyj0J-tK0uqUd0oJ_Llo4",
  authDomain: "teneofirstproject.firebaseapp.com",
  projectId: "teneofirstproject",
  storageBucket: "teneofirstproject.appspot.com",
  messagingSenderId: "818581085897",
  appId: "1:818581085897:web:c0a279758e78c17f4bb718",
  measurementId: "G-21M2PLE4J6"
}

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp); // Initialize Firestore

// Function to check if the current user is an admin
async function isAdmin() {
    const user = auth.currentUser;
    if (!user) return false; // User not logged in

    // Retrieve the user's role from Firestore
    const docRef = db.collection('userRoles').doc(user.uid);
    const doc = await docRef.get();
    if (doc.exists) {
        return doc.data().role === 'admin';
    } else {
        return false; // User role not found
    }
}

/*const functions = required('firebase-functions');
const admin = required('firebase-admin');

// Initialize Firebase Admin SDK with service account credentials or other configuration
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  // Add your Firebase project configuration here if necessary
});

exports.processSignUp = functions.auth.user().onCreate(async user => {
  if (user.email) {
    const adminUsers = admin.firestore().collection('roles');
    const snapshot = await adminUsers.where('email', '==', user.email).get();
    const customClaims = snapshot.empty ? { player: true } : { admin: true };
    return admin
      .auth()
      .setCustomUserClaims(user.uid, customClaims)
      .then(_ => {
        if (!snapshot.empty) {
          const userUpdate = admin.firestore().collection('roles');
          userUpdate.doc(user.uid).set({
            nickname: user.email,
            name: user.email,
            email: user.email,
            enable: true,
          });
          functions.logger.info(`User with email ${user.email} was added as admin and enabled!`);
        }
        const metadataRef = admin.database().ref('metadata/' + user.uid);
        return metadataRef.set({ refreshTime: new Date().getTime() });
      })
      .catch(error => {
        functions.logger.error(`There was an error whilst adding ${user.email} as admin`, error);
        return;
      });
  }
  functions.logger.warn(`There was no email supplied for user, no role added.`);
  return;
});*/



createApp(App).use(router).provide('auth', auth).provide('db', db).mount('#app');