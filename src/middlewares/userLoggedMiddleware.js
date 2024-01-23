const userService = require('../data/userService');

const userLoggedMiddleware = (req, res, next)=>{

    let userEmailFromCookie = req.cookies.emailUserRemember;
    let userLogged = userService.findByField('Email', userEmailFromCookie);

    if (userLogged) {
        req.session.userLogged = {...userLogged};
        delete req.session.userLogged.Contrasena;
    }

    if(req.session.userLogged){
        res.locals.userLogged = true;
        if(req.session.userLogged.Categoria == "Administrador"){
            res.locals.admin = true
        }

    }else{
        res.locals.userLogged = false;
    }

    next();
}

module.exports = userLoggedMiddleware;