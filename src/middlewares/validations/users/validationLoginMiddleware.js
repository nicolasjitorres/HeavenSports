import {
    body,
    validationResult
} from 'express-validator';
import userService from '../../../services/userService.js';
import bcryptjs from 'bcryptjs';

const validationLoginMiddleware = {
    validation: [
        body('email')
        .notEmpty().withMessage('El campo email es obligatorio.').bail()
        .isEmail().withMessage('Debe ser un email valido.').bail()
        .custom(async (email) => {
            const user = await userService.findByField('email', email);
            if (!user) {
                throw new Error('El correo no se encuentra registrado.')
            }
            return true;
        }),

        body('contrasena')
        .notEmpty().withMessage('El campo contraseña es obligatorio.').bail()
        .custom(async (contrasena, { req }) => {
            const user = await userService.findByField('email', req.body.email);
            if(!bcryptjs.compareSync(contrasena, user.contrasena)){
                throw new Error('La contraseña es incorrecta')
            }
            return true;
        })
    ],
    result: (req, res, next) => {
        const errors = validationResult(req);
        if (errors.array().length) {
            return res.render('users/login', {
                errors: errors.array(),
                email: req.body.email
            });
        }
        next();
    }
}

export default validationLoginMiddleware;