const express = require('express');
const controller = require('../controllers/list');
const passport = require('passport');
const router = express.Router();

// POST api/list/
router.post('/', passport.authenticate('jwt', { session: false }), controller.add);

// DELETE api/list/
router.delete('/', passport.authenticate('jwt', { session: false }), controller.delete);

// GET api/list/
router.get('/', passport.authenticate('jwt', { session: false }), controller.getByUserId);


module.exports = router;