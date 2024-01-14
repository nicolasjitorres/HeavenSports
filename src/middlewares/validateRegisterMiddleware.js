const path = require('path');
const { body } = require('express-validator');

module.exports = [
    body('Nombre').notEmpty().withMessage('Debes completar con tu nombre y apellido').bail(),
	body('Telefono')
		.notEmpty().withMessage('Se requiere un numero de telefono de contacto').bail()
		.isEmail().withMessage('Formato de correo no valido'),
	body('Email').notEmpty().withMessage('Ingresa un email de contacto').bail(),
	body('Contrasena').notEmpty().withMessage('Escribe una contraseña').bail(),
	body('ReContrasena').notEmpty().withMessage('Debes re-ingresar la contraseña').bail(),
	body('Imagen').custom((value , { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpeg'];
		let fileExtension = path.extname(file.originalname)
		if (!file) {
			throw new Error('Se debe subir una imagen')
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Solo se permite la extension ${acceptedExtensions}`)
			}
		};
		
		return true;
	})
]