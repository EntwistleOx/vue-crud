const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

admin.initializeApp(functions.config().firebase);
const app = express();

app.use(cors({ origin: true }));

app.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  const user = await admin.firestore().collection('users').doc(id).get();
  res.send(user);
});

app.get('/users', async (req, res) => {
  const users = await admin.firestore().collection('users').get();
  let list = [];
  users.docs.forEach((doc) => {
    list.push({ id: doc.id, data: doc.data() });
  });
  res.send(list);
});

app.post('/users', async (req, res) => {
  const { body } = req;
  const user = await admin.firestore().collection('users').add(body);
  res.send(user);
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const user = await admin.firestore().collection('users').doc(id).update(body);
  res.send(user);
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await admin.firestore().collection('users').doc(id).delete();
  res.send(user);
});

exports.users = functions.https.onRequest(app);

// https://us-central1-vuecrud-jd.cloudfunctions.net/users
