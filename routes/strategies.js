const express = require('express');
const router = express.Router();

const strategies = require('../controllers/strategies');
const catchAsync = require('../utils/catchAsync');
const { validateStrategy } = require('../middleware');
const { isLoggedIn } = require('../middleware')


//Index route
router.route('/')
  .get(catchAsync(strategies.index))
  .post(validateStrategy, catchAsync(strategies.createStrategy));

//Strategy new route
router.get('/new', isLoggedIn, strategies.renderNewForm);

//Strategy /:id route
router.route('/:id')
  .get(isLoggedIn, catchAsync(strategies.showStrategy))
  .put(isLoggedIn, validateStrategy, catchAsync(strategies.updateStrategy))
  .delete(isLoggedIn, catchAsync(strategies.deleteStrategy));

//Strategy /:id/addPlayer route
router.put('/:id/addPlayer', isLoggedIn, catchAsync(strategies.addPlayer));

//Edit Strategy route
router.get('/:id/edit', isLoggedIn, catchAsync(strategies.renderEditForm))

module.exports = router;