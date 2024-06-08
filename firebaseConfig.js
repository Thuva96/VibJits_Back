const admin = require('firebase-admin');
const serviceAccount = require('./vijibits-f402f-firebase-adminsdk-9zl3m-f8ceec1e5c.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://vijibits-f402f.appspot.com' // Replace with your Firebase Storage bucket
});

const bucket = admin.storage().bucket();

module.exports = { bucket };
