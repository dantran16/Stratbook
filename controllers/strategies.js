const Strategy = require('../models/strategy');
const Player = require('../models/player');

//Map list
const maps = ["de_inferno", "de_dust2", "de_mirage", "de_overpass", "de_ancient", "de_vertigo", "de_nuke"];
const roles = ['Entry', 'Support', '2nd', 'IGL', 'AWP', 'Lurk', 'Fill'];

//Renders index page (page filled with strategies)
module.exports.index = async (req, res) => {
  const strategies = await Strategy.find({});
  res.render('strategies/index', { strategies });
};

//Creates strategy
module.exports.createStrategy = async (req, res) => {
  const strategy = new Strategy(req.body.strategy);
  const number = req.body.number;
  if ( !(number <= 5 && number >= 0) ) {
    req.flash('error', 'There can only be 1 - 5 people in a strategy');
    return res.redirect('/strategies');
  }
  for (let i = 0; i < number; i++){
    const key = `player${i}`
    const player = new Player({
      name: req.body[key].name,
      role: req.body[key].role,
      utility: [],
      position: req.body[key].position,
      description: req.body[key].description
    });
    strategy.players.push(player);
    await player.save();
  }

  // for (let object in req.body) {
  //   console.log(object);
  //   const player = new Player({
  //     name: req.body[object].name,
  //     role: req.body[object].role,
  //     utility: [],
  //     position: req.body[object].position,
  //     description: req.body[object].description
  //   });
  //   strategy.players.push(player);
  //   await player.save();
  // }
  await strategy.save();
  req.flash('success', 'Successfully added a new strategy');
  res.redirect(`/strategies/${strategy._id}`)
};

//Renders new strategy page
module.exports.renderNewForm = (req, res) => {
  res.render('strategies/new', { maps, roles });
};

//renders specific strategy page (depending on what strategy you pick)
module.exports.showStrategy = async (req, res) => {
  const strategy = await Strategy.findById(req.params.id).populate({
    path: 'players',
    populate: {
      path: 'utility',
      model: 'Nade'
    }
  });
  if (!strategy) {
    req.flash('error', 'Cannot find that strategy');
    return res.redirect('/strategies');
  }
  res.render('strategies/show', { strategy, roles });
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

//Add a player
module.exports.addPlayer = async (req, res) => {
  const { id } = req.params;
  const strategy = await Strategy.findById(id);
  const number = strategy.players.length;
  // Make sure someone can't add more than 5 players
  if (!(number < 5 && number >= 0)) {
    req.flash('error', 'Cannot add more than 5 players');
    return res.redirect(`/strategies/${strategy._id}`);
  }
  const player = new Player({
    name: req.body.player.name,
    role: req.body.player.role,
    description: req.body.player.description,
    utility: [],
    position: req.body.player.position
  });
  await Strategy.findByIdAndUpdate(id, {
    $push: { "players": player }
  });
  await player.save();
  await strategy.save();
  req.flash('success', 'Successfully added player');
  res.redirect(`/strategies/${strategy._id}`);
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