import {
    body,
    validationResult
} from 'express-validator';
import userService from '../../../services/userService.js';
import bcryptjs from 'bcryptjs';

const validationChangePassMiddleware = {
    validation: [
        body('contrasenaActual')
        .notEmpty().withMessage('El campo contraseña actual es obligatorio.').bail()
        .custom(async (contrasenaActual, { req }) => {
            const user = await userService.getByPk(req.body.id)
            console.log(req.body.id);
            if (!bcryptjs.compareSync(contrasenaActual, user.contrasena)) {
                throw new Error('La contraseña ingresada es incorrecta');
            }
            return true;
        }),
        body('contrasena')
        .notEmpty().withMessage('El campo contraseña es obligatorio.').bail()
        .isLength({
            min: 8
        }).withMessage('Debe tener como mínimo 8 caracteres.').bail()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/).withMessage('La contraseña debe incluir al menos una letra minúscula, una letra mayúscula, un número y un carácter especial.').bail()
        .custom((contrasena, { req }) => {
            if (contrasena != req.body.reContrasena) {
                throw new Error('Las contraseñas no coinciden.')
            }
            return true;
        })
    ],
    result: (req, res, next) => {
        const errors = validationResult(req);
        if (errors.array().length) {
            return res.render('users/changePass', {
                errors: errors.array(),
                idUsuario: req.body.id
            });
        }
        next();
    }
}

export default validationChangePassMiddleware;