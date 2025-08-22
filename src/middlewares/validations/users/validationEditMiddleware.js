import {
    body,
    validationResult
} from 'express-validator';
import userService from '../../../services/userService.js';

const validationEditMiddleware = {
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
        .custom(async (email, { req }) => {
            const user = await userService.findByField('email', email);
            if (user && email != req.body.emailAnt) {
                throw new Error('El correo ya se encuentra registrado.')
            }
            return true;
        })
    ],
    result: (req, res, next) => {
        const errors = validationResult(req);
        if (errors.array().length) {
            return res.render('users/userEdit', {
                errors: errors.array(),
                usuario: req.body
            });
        }
        next();
    }
}
export default validationEditMiddleware;