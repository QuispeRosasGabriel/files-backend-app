const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

exports.nuevoUsuario = async (req,res) => {

    // verificar si el usuario ya estuvo registrado
    const {email, password} = req.body;
    let usuario = await Usuario.findOne({email});

    if(!!usuario) {
        return res.status(400).json({msg: 'Error, este usuario ya está registrado'});
    }


    // Crear un nuevo usuario
    usuario = new Usuario(req.body);
    console.log('ver usuario', usuario);
    // Encriptar el password
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);

    try {
        await usuario.save();
        res.json({msg: 'Usuario creado correctamente'});
    } catch (error) {
        return res.status(500).json({msg: 'Error en el servicio', error});
        
    }

  
}