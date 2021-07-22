const express = require('express');
const router = express.Router();

const strategies = require('../controllers/strategies');
const { strategySchema } = require('../schemas.js');
const catchAsync = require('../utils/catchAsync');
const { validateStrategy } = require('../middleware');


//Index route
router.route('/')
  .get(catchAsync(strategies.index))
  .post(validateStrategy, catchAsync(strategies.createStrategy));

//Strategy new route
router.get('/new', strategies.renderNewForm);

//Strategy /:id route
router.route('/:id')
  .get(catchAsync(strategies.showStrategy))
  .put(validateStrategy, catchAsync(strategies.updateStrategy))
  .delete(catchAsync(strategies.deleteStrategy));

//Edit Strategy route
router.get('/:id/edit', catchAsync(strategies.renderEditForm))

//Strategy edit route for updating
router.put('/:id', validateStrategy, catchAsync())

//Strategy delete route
router.delete('/:id', catchAsync());

module.exports = router;