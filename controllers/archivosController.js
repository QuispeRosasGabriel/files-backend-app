
// subida de archivos
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
const { json } = require('express');

exports.subirArchivo = async (req, res, next) => {

    const configMulter = {
        limits: { fileSize: !!req.usuario ? 1024 * 1024 * 10 : 1000000 },
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname + '/../uploads')
            },
            filename: (req, file, cb) => {
                //const extension = file.mimetype.split('/')[1];
                const extension = file.originalname
                    .substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, `${shortid.generate()}${extension}`);
            },
            // poner limite de archivos
            /* fileFilter: (req,file,cb) => {
                 if(file.mimetype === 'application/pdf') {
                     cb(null, true);
                 }
             }*/
        })
    }

    const upload = multer(configMulter).single('archivo');

    upload(req, res, async (error) => {
        if (!error) {
            res.json({ archivo: req.file.filename, msg: 'Archivo subido correctamente' })
        } else {
            res.status(500).json({ msg: 'Ocurrió un error al subir el archivo', error });
            return next();
        }
    });
}
exports.eliminarArchivo = async (req, res) => { 
    try {
        fs.unlinkSync(__dirname + `/../uploads/${req.archivo}`);
        res.status(200).json({msg: 'Archivo eliminado correctamente'});
    } catch (error) {
        res.status(500).json({msg: 'Ocurrió un error al eliminar el archivo'});
    }
}