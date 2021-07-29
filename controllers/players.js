const Strategy = require('../models/strategy');
const Player = require('../models/player');
const Nade = require('../models/nade')

const roles = ['Entry', 'Support', '2nd', 'IGL', 'AWP', 'Lurk', 'Fill'];
const nades = ['molotov', 'grenade', 'smoke', 'flash', 'decoy'];

//renders specific player page (depending on what player you pick)
module.exports.showPlayer = async (req, res) => {
  const player = await Player.findById(req.params.id).populate('utility');
  if (!player) {
    req.flash('error', 'Cannot find the player!');
    return res.redirect(`/strategies/${req.params.strategyId}`);
  }
  player['strategyId'] = req.params.strategyId;
  res.render('players/show', { player, nades });
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
  const { strategyId, id } = req.params;
  await Strategy.findByIdAndUpdate(strategyId, {
    $pull: { players: { $in: id } } },
  );
  await Player.findByIdAndDelete(id);

  req.flash('success', 'Successfully deleted a player');
  res.redirect(`/strategies/${strategyId}`);
};

//Add nade to player's utility
module.exports.addNade = async (req, res) => {
  const { id, util, strategyId } = req.params;
  const player = await Player.findById(id).populate('utility');
  const nade = new Nade({
    name: util,
    description: ""
  });
  // A player can't have more than 4 nades
  if (player.utility.length >= 4) {
    req.flash('error', `You can't add more than four nades`);
    return res.redirect(`/strategies/${strategyId}`);
  }
  //Function to see if the specific grenade type has surpassed maximum capacity 
  isTooManyCheck = (nadeType, max) => {
    const reducer = (accumulator, currentValue) => {
      return accumulator + (currentValue.name == nadeType);
    };
    if (player.utility.reduce(reducer, 0) >= max) {
      return true;
    }
  }

  let isTooMany = false, max = 1;
  //A player cannot hold more than 2 flashes
  if (util == 'flash') {
    max = 2
    isTooMany = isTooManyCheck(util, max);
  }
  //All the other nades a player can hold once
  else {
    isTooMany = isTooManyCheck(util, max);
  }

  if (isTooMany) {
    req.flash('error', `You can't add more than ${max} for ${util}`)
    return res.redirect(`/strategies/${strategyId}`)
  }
  else {
    await nade.save();
    await Player.findByIdAndUpdate(id, {
      $push: { utility: nade }
    })
    return res.redirect(`/strategies/${strategyId}`)
  }
  
}