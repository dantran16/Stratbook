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
  const player = await Player.findById(id).populate('utility');
  if (!player) {
    req.flash('error', 'Cannot find that player');
    return res.redirect(`/strategies/${strategyId}`);
  }
  player['strategyId'] = strategyId;
  res.render('players/edit', { player, roles, nades });
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
  const { id, strategyId } = req.params;
  const util = req.body.nade.name;
  const player = await Player.findById(id).populate('utility');
  const nade = new Nade({
    name: req.body.nade.name,
    description: req.body.nade.description
  });
  // A player can't have more than 4 nades
  if (player.utility.length >= 4) {
    req.flash('error', `You can't add more than four nades`);
    return res.redirect(`/strategies/${strategyId}/edit`);
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
    req.flash('error', `You can't add more than ${max} ${util}`)
  }
  else {
    await nade.save();
    await Player.findByIdAndUpdate(id, {
      $push: { utility: nade }
    })
    req.flash('success', `You successfully added a ${util} grenade`)
  }
  return res.redirect(`/strategies/${strategyId}/player/${id}/edit`)
}

//Deleting a nade
module.exports.deleteNade = async (req, res) => {
  const { id, nadeId, strategyId } = req.params;
  await Player.findByIdAndUpdate(id, {
    $pull: { utility: { $in: nadeId } } },
  );
  await Nade.findByIdAndDelete(nadeId);
  req.flash('success', 'Successfully deleted a nade');
  res.redirect(`/strategies/${strategyId}/player/${id}/edit`);
};

//Updating nade description
module.exports.updateNadeDescription = async (req, res) => {
  const { id, nadeId, strategyId } = req.params;
  const { description } = Object.entries(req.body)[0][1];
  const nade = await Nade.findByIdAndUpdate(nadeId, {
    $set: { description: description }
  })
  req.flash('success', 'Successfully updated nade description');
  res.redirect(`/strategies/${strategyId}/player/${id}/edit`);
}

