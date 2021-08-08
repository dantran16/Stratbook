const express = require('express');
const router = express.Router({ mergeParams: true } );

const players = require('../controllers/players');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn } = require('../middleware')

//Player :id route
router.route('/')
  .get(isLoggedIn, catchAsync(players.showPlayer))
  .put(isLoggedIn, catchAsync(players.updatePlayer))
  .delete(isLoggedIn, catchAsync(players.deletePlayer))

//Route for rendering player edit form
router.get('/edit', isLoggedIn, catchAsync(players.renderEditForm))

//Player route for adding nade
router.post('/addNade', isLoggedIn, catchAsync(players.addNade));

//Player route nade/:nadeId
router.route('/nade/:nadeId')
  .delete(isLoggedIn, catchAsync(players.deleteNade))
  .put(isLoggedIn, catchAsync(players.updateNadeDescription));

module.exports = router;