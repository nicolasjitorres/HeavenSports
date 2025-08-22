import {
    body,
    validationResult
} from 'express-validator';
import userService from '../../../services/userService.js';

const validationRegisterMiddleware = {
    validation: [
        body('nombre')
        .notEmpty().withMessage('El campo nombre es obligatorio.').bail()
        .isLength({
            min: 2
        }).withMessage('Debe tener como mínimo 2 caracteres.'),

        body('apellido')
        .notEmpty().withMessage('El campo apellido es obligatorio.').bail()
        .isLength({
            min: 2
        }).withMessage('Debe tener como mínimo 2 caracteres.'),

        body('email')
        .notEmpty().withMessage('El campo email es obligatorio.').bail()
        .isEmail().withMessage('Debe ser un email valido.').bail()
        .custom(async (email) => {
            const user = await userService.findByField('email', email);
            if (user) {
                throw new Error('El correo ya se encuentra registrado.')
            }
            return true;
        }),

        // PUEDO USAR isStrongPassword que superfunciona, se puede personalizar mas intuitivamente que matches. por ahora dejaremos ese
        body('contrasena')
        .notEmpty().withMessage('El campo contraseña es obligatorio.').bail()
        .isLength({
            min: 8
        }).withMessage('Debe tener como mínimo 8 caracteres.').bail()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/).withMessage('La contraseña debe incluir al menos una letra minúscula, una letra mayúscula, un número y un carácter especial.').bail()
        .custom((contrasena, { req }) => {
            if(contrasena != req.body.reContrasena){
                throw new Error('Las contraseñas no coinciden.')
            }
            return true;
        })
    ],
    result: (req, res, next) => {
        const errors = validationResult(req);
        if (errors.array().length) {
            return res.render('users/register', {
                errors: errors.array(),
                usuario: req.body
            });
        }
        next();
    }
}

export default validationRegisterMiddleware;