const Strategy = require('../models/strategy');
const Player = require('../models/player');
const Utility = require('../models/utility')

const roles = ['entry', 'support', '2nd', 'IGL', 'AWP', 'lurk', 'fill']

//renders specific player page (depending on what player you pick)
module.exports.showPlayer = async (req, res) => {
  const player = await Player.findById(req.params.id).populate('utility');
  if (!player) {
    req.flash('error', 'Cannot find the player!');
    return res.redirect(`/strategies/${req.params.strategyId}`);
  }
  player['strategyId'] = req.params.strategyId;
  res.render('players/show', { player });
}

//Renders edit Player form
module.exports.renderEditForm = async (req, res) => {
  const { id, strategyId } = req.params;
  const player = await Player.findById(id);
  if (!player) {
    req.flash('error', 'Cannot find that player');
    return res.redirect(`/strategies/${strategyId}`);
  }
  player['strategyId'] = strategyId;
  res.render('players/edit', { player, roles });
};

//Updates player based on what we put in edit player
module.exports.updatePlayer = async (req, res) => {
  const { id, strategyId } = req.params;
  const player = await Player.findByIdAndUpdate(id, { ...req.body.player });
  req.flash('success', 'Successfully editted a player');
  res.redirect(`/strategies/${strategyId}`);
};

//Deletes strategy 
module.exports.deletePlayer = async (req, res) => {
  const { id, strategyId } = req.params;
  await Strategy.findByIdAndUpdate(strategyId, {
    $pull: { "players": { _id: req.params.strategyId } },
    $inc: { "number": -1 }
    }, { safe: true, upsert: true} 
  );
  await Player.findByIdAndDelete(id);

  req.flash('success', 'Successfully deleted a player');
  res.redirect(`/strategies/${strategyId}`);
};