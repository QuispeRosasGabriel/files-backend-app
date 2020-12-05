const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'global.env' })

module.exports = (req,res, next) => {
    const authHeader = req.get('Authorization');

    if (authHeader) {
        // Obtener el token        
        const token = authHeader.split(' ')[1];

        try {
            // Comprobar el jwt
            const usuario = jwt.verify(token, process.env.SECRET_KEY);
            req.usuario = usuario;
            // res.json({ usuario });
        } catch (error) {
            res.status(401).json({ msg: 'Token no valido', error })
        }
    }

    return next();
}