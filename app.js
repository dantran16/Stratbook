//importing packages modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');

//importing local packages
const ExpressError = require('./utils/ExpressError.js');

//Routes
const strategies = require('./routes/strategies');
const players = require('./routes/players');

//Mongoose setup
mongoose.connect('mongodb://localhost:27017/stratbook', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected")
})

const app = express();

//Express app settings
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Express middleware functions
app.use(express.urlencoded({extended: true}));  //Allows us to parse JSON files
app.use(methodOverride('_method')); //to allow us to use other HTTP verbs besides just POST and GET
app.use(express.static(path.join(__dirname, 'public')));  //Allows us to use public directory on our templates

//Setting up cookies
const sessionConfig = {
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}
app.use(session(sessionConfig));
app.use(flash());

// Cookie/session variables
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

//Routes
app.use('/strategies', strategies);
app.use('/strategies/:strategyId/player/:id', players);

//Home page
app.get('/', (req, res) =>{
  res.redirect('/strategies');
})

app.all('*', (req, res, next) => {
  next(new ExpressError('Page not found!', 404));
})

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Something went wrong';
  res.status(statusCode).render('error', { err });
})

app.listen(3000, ()=>{
  console.log("App is listening on port 3000!");
})