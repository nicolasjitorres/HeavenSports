const { body } = require('express-validator');

const path = require('path');

let ValProductAddImage = [
    body('imagenes').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = [".jpg, .png"];

        if (!file) {
            throw new Error('Se debe subir al menos una imagen')
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Los formatos aceptados son ${acceptedExtensions.join(', ')}`)
            }
        }
        
        return true
    })
]

module.exports = ValProductAddImage;