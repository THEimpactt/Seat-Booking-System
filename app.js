require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const {MongoStore} = require('connect-mongo');
const authRouter = require('./routes/authRouter');
const dashboardRouter = require('./routes/dashboardRouter');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collectionName: 'sessions'
});

app.use(session({
  secret: 'book1',
  resave: false,
  saveUninitialized: true,
  store: store
}));

app.use((req, res, next) => {
  res.locals.isLoggedin = req.session.isLoggedin || false;
  next();
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.use(authRouter);
app.use(dashboardRouter);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB connected');
  app.listen(3001);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });