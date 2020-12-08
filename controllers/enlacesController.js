const Enlaces = require('../models/Enlace');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator'); 

exports.nuevoEnlace = async (req, res, next) => {

      // mostrar mensajes de error de express validator
      const errores = validationResult(req);
      if(!errores.isEmpty()) {
           return res.status(400).json ({errores: errores.array()});
      }

    // almacenar en la bd
    const { nombre_original, password } = req.body;
    const enlace = new Enlaces();
    enlace.url = shortid.generate();
    enlace.nombre = shortid.generate();
    enlace.nombre_original = nombre_original;
    enlace.password = password;

    if(req.usuario) {
        const { password, descargas } = req.body;

        // Asignar a enlace el numero de descargas
        if(descargas) {
            enlace.descargas = descargas;
        }

        // Asignar un password
        if(password) {
            const salt = bcrypt.genSalt(10);
            enlace.password = await bcrypt.hash(password, salt);
        }

        enlace.autor = req.usuario.id;
    }

    try {
        await enlace.save();
        return res.status(200).json({ status: 'Ok', msg: `${enlace.url}` });
        next();
    } catch (error) {
        return res.status(500).json({msg: 'Error en el servicio'});
    }

}