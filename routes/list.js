const express = require('express');
const controller = require('../controllers/list');
const router = express.Router();

// POST api/list/
router.post('/', controller.add);

// DELETE api/list/
router.delete('/', controller.delete);

// GET api/list/
router.get('/:id', controller.getByUserId);


module.exports = router;