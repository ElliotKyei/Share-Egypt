// refer to this: https://firebase.google.com/docs/firestore/quickstart
const { initializeApp } = require('firebase-admin/app');
const admin = require('firebase-admin')
let db;

const key = { 
        
}

function initializeDatabase() {
    admin.initializeApp({
        credential: admin.credential.cert(key)
    })
    db = admin.firestore()
    console.log("Database initialized!");
    return db;
}

module.exports = {
    initializeDatabase
}
