const express = require('express');
const controller = require('../controllers/list');
const passport = require('passport');
const router = express.Router();

// POST api/list/
router.post('/', passport.authenticate('jwt', { session: false }), controller.add);

// DELETE api/list/
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.delete);

// GET api/list/
router.get('/', passport.authenticate('jwt', { session: false }), controller.getByUserId);

// GET api/list/
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById);

// PUT api/list/
router.put('/:id', passport.authenticate('jwt', { session: false }), controller.updateTitle);


module.exports = router;