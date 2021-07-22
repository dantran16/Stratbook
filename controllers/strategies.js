const Strategy = require('../models/strategy');

//Map list
const maps = ["de_inferno", "de_dust2", "de_mirage", "de_overpass", "de_ancient", "de_vertigo", "de_nuke"];

//Renders index page
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
    console.log(player);
  }
  await strategy.save();
  req.flash('success', 'Successfully added a new strategy');
  res.redirect(`/strategies/${strategy._id}`)
};

module.exports.renderNewForm = (req, res) => {
  res.render('strategies/new', { maps });
};

module.exports.showStrategy = async (req, res) => {
  const strategy = await Strategy.findById(req.params.id);
  if (!strategy) {
    req.flash('error', 'Cannot find that strategy');
    return res.redirect('/strategies');
  }
  res.render('strategies/show', { strategy });
};

module.exports.renderEditForm = async (req, res) => {
  const strategy = await Strategy.findById(req.params.id);
  if (!strategy) {
    req.flash('error', 'Cannot find that strategy');
    return res.redirect('/strategies');
  }
  res.render('strategies/edit', { strategy });
};

module.exports.updateStrategy = async (req, res) => {
  const { id } = req.params;
  const strategy = await Strategy.findByIdAndUpdate(id, { ...req.body.strategy });
  req.flash('success', 'Successfully editted a strategy');
  res.redirect(`/strategies/${strategy._id}`);
};

module.exports.deleteStrategy = async (req, res) => {
  const { id } = req.params;
  await Strategy.findByIdAndDelete(id);
  req.flash('success', 'Successfully deleted a strategy');
  res.redirect('/strategies');
};