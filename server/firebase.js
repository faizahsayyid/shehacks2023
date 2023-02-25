const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./pro-fess-0424327dd851.json");

const firebaseConfig = {
  apiKey: "AIzaSyBTplOkCTltHRQSS_JljFnJqLHii8QnrrU",
  authDomain: "pro-fess.firebaseapp.com",
  projectId: "pro-fess",
  storageBucket: "pro-fess.appspot.com",
  messagingSenderId: "411786254500",
  appId: "1:411786254500:web:f071ae3da8b4a4833b6e31",
  measurementId: "G-3L6R5WEMBH",
};

const firebaseUrls = {
  login: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,
  refresh: `https://securetoken.googleapis.com/v1/token?key=${firebaseConfig.apiKey}`,
};

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

module.exports = { 
  db,
  firebaseConfig, 
  firebaseUrls
};
