const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const {check} = require('express-validator');

router.post('/', authController.autenticarUsuario);

router.get('/', authController.usuarioAutenticado);

module.exports = router;