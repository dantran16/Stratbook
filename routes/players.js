const express = require('express');
const router = express.Router();

const players = require('../controllers/players');
const catchAsync = require('../utils/catchAsync');

//Player /:strategyId/:id route
router.route('/:strategyId/:id')
  .get(catchAsync(players.showPlayer))
  .put(catchAsync(players.updatePlayer))
  .delete(catchAsync(players.deletePlayer))

//Route for rendering player edit form
router.get('/:strategyId/:id/edit', catchAsync(players.renderEditForm))

module.exports = router;