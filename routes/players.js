const express = require('express');
const router = express.Router();

const players = require('../controllers/players');
const catchAsync = require('../utils/catchAsync');

//Player /:strategyId/:id route
router.route('/:strategyId/player/:id')
  .get(catchAsync(players.showPlayer))
  .put(catchAsync(players.updatePlayer))
  .delete(catchAsync(players.deletePlayer))

//Route for rendering player edit form
router.get('/:strategyId/player/:id/edit', catchAsync(players.renderEditForm))

//Player route for adding nade
router.post('/:strategyId/player/:id/add/:util', catchAsync(players.addNade));

//Player route for deleting a nade
router.delete('/:strategyId/player/:id/nade/:nadeId', catchAsync(players.deleteNade));

module.exports = router;