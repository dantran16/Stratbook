//importing packages modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');

//importing local packages
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError.js');
const { strategySchema } = require('./schemas.js');
const Strategy = require('./models/strategy');
const Player = require('./models/player')

//Mongoose setup
mongoose.connect('mongodb://localhost:27017/stratbook', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
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
app.use(express.urlencoded({extended: true}));
//to allow us to use other HTTP verbs besides just POST and GET
app.use(methodOverride('_method'));

// Error handling for strategies
const validateStrategy = (req, res, next) => {
  const { error } = strategySchema.validate(req.body);
  if (error) {
      const msg = error.details.map(el => el.message).join(',')
      throw new ExpressError(msg, 400)
  } else {
      next();
  }
}

//Home page
app.get('/', (req, res) =>{
  res.render('home');
})

//Strategy home route / dashboard
app.get('/strategies', catchAsync(async (req, res) =>{
  const strategies = await Strategy.find({});
  res.render('strategies/index', { strategies });
}))

//Strategy new route
app.get('/strategies/new', (req, res) => {
  res.render('strategies/new');
})

//Strategy new route to update the strategies home page
app.post('/strategies', validateStrategy, catchAsync(async (req,res) => {
  const strategy = new Strategy(req.body.strategy);
  await strategy.save();
  res.redirect(`/strategies/${strategy._id}`)
}));

//Strategy show route
app.get('/strategies/:id', catchAsync(async (req, res) =>{
  const strategy = await Strategy.findById(req.params.id);
  console.log(strategy);
  res.render('strategies/show', { strategy });
}));

//Edit Strategy route
app.get('/strategies/:id/edit', catchAsync(async (req, res) =>{
  const strategy = await Strategy.findById(req.params.id);
  res.render('strategies/edit', { strategy });
}))

//Strategy edit route for updating
app.put('/strategies/:id', validateStrategy, catchAsync(async (req, res) => {
  const { id } = req.params;
  const strategy = await Strategy.findByIdAndUpdate(id, {...req.body.strategy});
  res.redirect(`/strategies/${strategy._id}`);
}))

//Strategy delete route
app.delete('/strategies/:id', catchAsync(async (req, res) =>{
  const { id } = req.params;
  await Strategy.findByIdAndDelete(id);
  res.redirect('/strategies');
}));

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