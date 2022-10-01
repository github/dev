import {initializeApp} from 'firebase/app'

// import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';

import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBFPMaCKZmi4IqODTiCIlxFYnx0Mbci7cw",
  authDomain: "test-e95ea.firebaseapp.com",
  // databaseUrl:"https://test-e95ea-default-rtdb.firebaseio.com/",
  projectId: "test-e95ea",
  storageBucket: "test-e95ea.appspot.com",
  messagingSenderId: "677183882453",
  appId: "1:677183882453:web:b3994bad5151477090ce5c",
  measurementId: "G-8KGYM6DVQV"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getFirestore(app)