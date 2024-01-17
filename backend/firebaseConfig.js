import React, { useState } from 'react';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { get, getDatabase, ref, set } from "firebase/database";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD6ZNeQ6_Z6ejine6cNU50Qjryd37LRvME",
  authDomain: "solar-98875.firebaseapp.com",
  databaseURL: "https://solar-98875-default-rtdb.firebaseio.com",
  projectId: "solar-98875",
  storageBucket: "solar-98875.appspot.com",
  messagingSenderId: "421776051618",
  appId: "1:421776051618:web:6099a6e97565911f6ab6fb",
  measurementId: "G-DLM8TEFQ1Y"
};
const app = initializeApp(firebaseConfig);


// Constante pour realtime Database 
export const db = getDatabase(app);
//Constante pour authentification
export  const auth = getAuth(app);
export const  storage  = getStorage(app);









