const Enlaces = require('../models/Enlace');
const shortid = require('shortid');

exports.nuevoEnlace = async (req,res, next) => {

    // revisar si hay errores

    // almacenar en la bd
    const { nombre_original, password } = req.body;
    const enlace = new Enlaces();
    enlace.url = shortid.generate();
    enlace.nombre = shortid.generate();
    enlace.nombre_original = nombre_original;
    enlace.password = password;

    try {
        await enlace.save();
        return res.status(200).json({msg: `${enlace.url}`});
        next();
    } catch (error) {
        
    }

}