const express = require('express');
const enlacesController = require('../controllers/enlacesController');
const router = express.Router();
const { check } = require('express-validator');
const auth = require ('../middleware/auth');

router.post('/', auth, enlacesController.nuevoEnlace);

module.exports = router;