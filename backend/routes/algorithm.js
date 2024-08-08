const express = require('express');

const algoController = require('../controllers/algorithm')

const router = express.Router();

router.get('/', algoController.getAlgorithm)
router.get('/get-all-algos', algoController.getAllAlgorithms)

module.exports = router;