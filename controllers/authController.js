const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

exports.autenticarUsuario = async(req,res,next) => {

    // Revisar si hay errores

    // Verificar el usuario para ver si esta registrado
    const {email, password} = req.body
    const usuario = await Usuario.findOne({email});
    if(!usuario) {
        res.status(401).json({msg: 'El usuario no existe'});
        return next();
    }

    if(bcrypt.compareSync(password, usuario.password)) {

        // Generando JWT

    } else {
        res.status(401).json({msg: 'Password incorrecto'});
        return next();
    }

    // Verificar el password y autenticar el usuario


}

exports.usuarioAutenticado = (req,res) => {}