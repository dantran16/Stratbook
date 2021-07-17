const express = require('express');
const router = express.Router();

const { strategySchema } = require('../schemas.js');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Strategy = require('../models/strategy');
const Player = require('../models/player');

//Map list
const maps = ["de_inferno", "de_dust2", "de_mirage", "de_overpass", "de_ancient", "de_vertigo", "de_nuke"];

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

//Strategy home route / dashboard
router.get('/', catchAsync(async (req, res) =>{
  const strategies = await Strategy.find({});
  res.render('strategies/index', { strategies });
}))

//Strategy new route
router.get('/new', (req, res) => {
  console.log(maps)
  res.render('strategies/new', { maps });
})

//Strategy new route to update the strategies home page
router.post('/', validateStrategy, catchAsync(async (req,res) => {
  const strategy = new Strategy(req.body.strategy);
  for (let i = 0; i < strategy.number; i++){
    const player = new Player({
      name: "",
      role: "",
      molotov: 0,
      smoke: 0,
      flashes: 0,
      position: ""
    });
    console.log(player);
  }
  await strategy.save();
  req.flash('success', 'Successfully added a new strategy');
  res.redirect(`/strategies/${strategy._id}`)
}));

//Strategy show route
router.get('/:id', catchAsync(async (req, res) =>{
  const strategy = await Strategy.findById(req.params.id);
  if (!strategy) {
    req.flash('error', 'Cannot find that strategy');
    return res.redirect('/strategies');
  }
  res.render('strategies/show', { strategy });
}));

//Edit Strategy route
router.get('/:id/edit', catchAsync(async (req, res) =>{
  const strategy = await Strategy.findById(req.params.id);
  if (!strategy) {
    req.flash('error', 'Cannot find that strategy');
    return res.redirect('/strategies');
  }
  res.render('strategies/edit', { strategy });
}))

//Strategy edit route for updating
router.put('/:id', validateStrategy, catchAsync(async (req, res) => {
  const { id } = req.params;
  const strategy = await Strategy.findByIdAndUpdate(id, {...req.body.strategy});
  req.flash('success', 'Successfully editted a strategy');
  res.redirect(`/strategies/${strategy._id}`);
}))

//Strategy delete route
router.delete('/:id', catchAsync(async (req, res) =>{
  const { id } = req.params;
  await Strategy.findByIdAndDelete(id);
  req.flash('success', 'Successfully deleted a strategy');
  res.redirect('/strategies');
}));

module.exports = router;