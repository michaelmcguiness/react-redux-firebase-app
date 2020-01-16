const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://socialape-e5b71.firebaseio.com"
});

const db = admin.firestore();

module.exports = { admin, db };
