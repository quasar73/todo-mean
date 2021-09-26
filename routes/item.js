const express = require('express');
const controller = require('../controllers/item');
const passport = require('passport');
const router = express.Router();

// POST api/item/
router.post('/', passport.authenticate('jwt', { session: false }), controller.add);

// DELETE api/item/
router.delete('/', passport.authenticate('jwt', { session: false }), controller.delete);

// GET api/item/
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getByListId);


module.exports = router;