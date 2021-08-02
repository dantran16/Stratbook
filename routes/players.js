const express = require('express');
const router = express.Router({ mergeParams: true } );

const players = require('../controllers/players');
const catchAsync = require('../utils/catchAsync');

//Player :id route
router.route('/')
  .get(catchAsync(players.showPlayer))
  .put(catchAsync(players.updatePlayer))
  .delete(catchAsync(players.deletePlayer))

//Route for rendering player edit form
router.get('/edit', catchAsync(players.renderEditForm))

//Player route for adding nade
router.post('/add/:util', catchAsync(players.addNade));

//Player route nade/:nadeId
router.route('/nade/:nadeId')
  .delete(catchAsync(players.deleteNade))
  .put(catchAsync(players.updateNadeDescription));

module.exports = router;