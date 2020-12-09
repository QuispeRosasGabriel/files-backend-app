
// subida de archivos
const multer = require('multer');
const shortid = require('shortid');

const configMulter = {
    limits: {fileSize: 1000000},
    storage: fileStorage = multer.diskStorage({
        destination: (req,file, cb) => {
            cb(null, __dirname+'/../uploads')
        },
        filename: (req,file,cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
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

exports.subirArchivo = async (req,res, next) => {
    upload(req,res, async (error) => {
        if(!error) {
            res.json({archivo: req.file.filename, msg: 'Archivo subido correctamente'})
        } else {
            res.status(500).json({msg: 'Ocurrió un error al subir el archivo', error});
            return next();
        }
    });
}
exports.eliminarArchivo = async (req,res) => {}