const express = require('express');

const solutionController = require('../controllers/solution')

const router = express.Router();

router.get('/', solutionController.getSolution)
router.get('/stats', solutionController.getSolutionStats)

module.exports = router;