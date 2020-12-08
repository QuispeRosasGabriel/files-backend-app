const express = require('express');
const archivosController = require('../controllers/archivosController');
const router = express.Router();
const auth = require('../middleware/auth');

// subida de archivos
const multer = require('multer');
const upload = multer({dest: './uploads/'});

router.post('/',
            upload.single('archivo'), 
            archivosController.subirArchivo);

            
router.delete('/:id', archivosController.eliminarArchivo);

module.exports = router;