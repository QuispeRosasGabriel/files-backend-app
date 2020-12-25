const Enlaces = require('../models/Enlace');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.nuevoEnlace = async (req, res, next) => {

    // mostrar mensajes de error de express validator
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    // almacenar en la bd
    const { nombre_original, password, nombre } = req.body;
    const enlace = new Enlaces();
    enlace.url = shortid.generate();
    enlace.nombre = nombre;
    enlace.nombre_original = nombre_original;
    enlace.password = password;

    if (req.usuario) {
        const { password, descargas } = req.body;

        // Asignar a enlace el numero de descargas
        if (descargas) {
            enlace.descargas = descargas;
        }

        // Asignar un password
        if (password) {
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
        return res.status(500).json({ msg: 'Error en el servicio' });
    }

}

// Obtener el enlace 
exports.obtenerEnlace = async (req, res, next) => {

    const { url } = req.params;

    // Verificar si existe ese archivo
    const enlace = await Enlaces.findOne({ url });

    if (!enlace) {
        res.status(404).json({ msg: 'Enlace no existe en la base de datos' });
        return next();
    }

    // Si el enlace existe
    res.json({ archivo: enlace.nombre })

    // Si las descargas son iguales 1, borrar archivo
    const { descargas, nombre } = enlace;
    if (descargas === 1) {
        req.archivo = nombre;
        next();
    } else {
        enlace.descargas--;
        await enlace.save();
    }

}