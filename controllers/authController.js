const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'global.env' })
const { validationResult } = require('express-validator');

exports.autenticarUsuario = async (req, res, next) => {

    // mostrar mensajes de error de express validator
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    // Verificar el usuario para ver si esta registrado
    const { email, password } = req.body
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        res.status(401).json({ msg: 'El usuario no existe' });
        return next();
    }

    if (bcrypt.compareSync(password, usuario.password)) {

        // Generando JWT
        const token = jwt.sign({
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email
        }, process.env.SECRET_KEY, {
            expiresIn: '8h'
        });

        res.status(200).json({ token })

    } else {
        res.status(401).json({ msg: 'Password incorrecto' });
        return next();
    }

    // Verificar el password y autenticar el usuario


}

exports.usuarioAutenticado = (req, res, next) => res.json({usuario: req.usuario});
