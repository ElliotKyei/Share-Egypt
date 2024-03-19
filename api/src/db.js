const { initializeApp, cert, getApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const config = require('../config');

const key = config.serviceAccountKey;

let firebaseApp;
try{
  firebaseApp = getApp();
} catch (error) {
  initializeApp({
    credential: cert(key)
  });
  console.log("Database initialized!");
}

const db = getFirestore(firebaseApp, {});

module.exports = db;