const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const path = require('path');

const serviceAccount = require('./devi.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('signup');
});

app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  // Implement signup logic and save user to Firestore
  // Example:
  db.collection('users').add({
    email: email,
    password: password
  })
  .then(() => {
    res.redirect('/dashboard');
  })
  .catch(error => {
    console.error('Error adding user: ', error);
    res.redirect('/');
  });
});

app.get('/dashboard', (req, res) => {
  // Fetch user data and render dashboard
  // Example:
  res.render('dashboard');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
