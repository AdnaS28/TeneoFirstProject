/*import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { createApp } from 'vue';
import App from './App.vue'
import router from './router'*/

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCVH1WoPaFURzCyj0J-tK0uqUd0oJ_Llo4",
  authDomain: "teneofirstproject.firebaseapp.com",
  projectId: "teneofirstproject",
  storageBucket: "teneofirstproject.appspot.com",
  messagingSenderId: "818581085897",
  appId: "1:818581085897:web:c0a279758e78c17f4bb718",
  measurementId: "G-21M2PLE4J6"
}

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

createApp(App).use(router).provide('auth', auth).mount('#app')