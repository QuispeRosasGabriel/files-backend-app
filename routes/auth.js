const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const { check } = require('express-validator');

router.post('/',
    [
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password es invalido').not().isEmpty()
    ],
    authController.autenticarUsuario);

router.get('/', authController.usuarioAutenticado);

module.exports = router;