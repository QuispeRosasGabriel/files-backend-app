const Usuario = require('../models/Usuario');

exports.nuevoUsuario = async (req,res) => {

    // verificar si el usuario ya estuvo registrado
    const {email} = req.body;
    let usuario = await Usuario.findOne({email});

    if(!!usuario) {
        return res.status(400).json({msg: 'Error, este usuario ya está registrado'});
    }

    usuario = await new Usuario(req.body);
    usuario.save();

    res.json({msg: 'Usuario creado correctamente'});
}