const express = require('express');
const router = express.Router();
const {
  addPage,
  editPage,
  main,
  userList,
  userPages,
  wikiPage,
} = require('../views/index');

router.get('/', (req, res) => {
  res.send('retrieved all wiki pages');
});

router.post('/', (req, res) => {
  res.send('retrieved all wiki pages');
});

router.get('/add', (req, res) => {
  res.send(addPage());
});

module.exports = router;
