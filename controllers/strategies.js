const Strategy = require('../models/strategy');
const Player = require('../models/player');

//Map list
const maps = ["de_inferno", "de_dust2", "de_mirage", "de_overpass", "de_ancient", "de_vertigo", "de_nuke"];

//Renders index page (page filled with strategies)
module.exports.index = async (req, res) => {
  const strategies = await Strategy.find({});
  res.render('strategies/index', { strategies });
};

//Creates strategy
module.exports.createStrategy = async (req, res) => {
  const strategy = new Strategy(req.body.strategy);
  for (let i = 0; i < strategy.number; i++) {
    const player = new Player({
      name: "",
      role: "fill",
      utility: [],
      position: ""
    });
    strategy.players.push(player);
    await player.save();
  }
  await strategy.save();
  req.flash('success', 'Successfully added a new strategy');
  res.redirect(`/strategies/${strategy._id}`)
};

//Renders new strategy page
module.exports.renderNewForm = (req, res) => {
  res.render('strategies/new', { maps });
};

//renders specific strategy page (depending on what strategy you pick)
module.exports.showStrategy = async (req, res) => {
  const strategy = await Strategy.findById(req.params.id).populate('players');
  if (!strategy) {
    req.flash('error', 'Cannot find that strategy');
    return res.redirect('/strategies');
  }
  console.log(strategy);
  res.render('strategies/show', { strategy });
};

//Renders edit strategy form
module.exports.renderEditForm = async (req, res) => {
  const strategy = await Strategy.findById(req.params.id);
  if (!strategy) {
    req.flash('error', 'Cannot find that strategy');
    return res.redirect('/strategies');
  }
  res.render('strategies/edit', { strategy, maps });
};

//Updates strategy based on what we put in edit strategy
module.exports.updateStrategy = async (req, res) => {
  const { id } = req.params;
  const strategy = await Strategy.findByIdAndUpdate(id, { ...req.body.strategy });
  req.flash('success', 'Successfully editted a strategy');
  res.redirect(`/strategies/${strategy._id}`);
};

//Deletes strategy 
module.exports.deleteStrategy = async (req, res) => {
  const { id } = req.params;
  const strategy = await Strategy.findById(id);
  for (let i = 0; i < strategy.players.length; i++){
    await Player.findByIdAndDelete(strategy.players[i])
  }
  await Strategy.findByIdAndDelete(id);
  req.flash('success', 'Successfully deleted a strategy');
  res.redirect('/strategies');
};