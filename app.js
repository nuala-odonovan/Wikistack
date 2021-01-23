const express = require('express');
const morgan = require('morgan');
const { db, Page, User } = require('./models');
const {
  addPage,
  editPage,
  main,
  userList,
  userPages,
  wikiPage,
} = require('./views/index'); // requiring in views folder with a bunch of js file functions
const PORT = 1337;

const app = express();

// MIDDLEWARE

app.use(morgan('dev'));

// serve up public folder files middleware
app.use(express.static(__dirname + '/public'));

// body parsers
app.use(express.json()); // converts JSON data
app.use(express.urlencoded({ extended: false })); // converts URL encoded data

// routers
app.use('/wiki', require('./routes/wiki'));
app.use('/users', require('./routes/users'));

app.get('/', (req, res) => {
  res.redirect('/wiki');
});

db.authenticate().then(() => {
  console.log('connected to the database');
});

// integrating sync
async function sync() {
  await db.sync();
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
}

sync();
