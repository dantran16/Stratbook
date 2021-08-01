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

//Player route for deleting a nade
router.delete('/nade/:nadeId', catchAsync(players.deleteNade));

module.exports = router;