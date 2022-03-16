
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
    apiKey: "AIzaSyAzN538O3htCPmet1s4PmYvq5v_rVsxViY",
    authDomain: "manage-land-blockchain.firebaseapp.com",
    projectId: "manage-land-blockchain",
    storageBucket: "manage-land-blockchain.appspot.com",
    messagingSenderId: "23686906618",
    appId: "1:23686906618:web:9414105782b9fbf05d3f43",
    measurementId: "G-Y27127TGF2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const db = getFirestore(app)


module.exports = { app, storage, db };
