require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const {MongoStore} = require('connect-mongo');
const multer = require('multer');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRouter');
const dashboardRouter = require('./routes/dashboardRouter');
const adminRouter = require('./routes/adminRouter');
const addMovieRouter = require('./routes/addMovieRouter');
const seatRouter = require('./routes/seatRouter');

app.set('view engine', 'ejs');

const fileFilter = (req,file,cb)=>{
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
    cb(null, true)
  }
  else{
    cb(null, false)
  }
}

const multerOptions = {
  dest: 'uploads/', fileFilter
}

const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collectionName: 'sessions'
});

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  store: store
}));

app.use((req, res, next) => {
  res.locals.isLoggedin = req.session.isLoggedin || false;
  next();
});

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer(multerOptions).single('photo'));
app.use(bodyParser.json());

app.use(authRouter);
app.use(dashboardRouter);
app.use(adminRouter);
app.use(addMovieRouter);
app.use(seatRouter);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB connected');
  app.listen(3001);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });