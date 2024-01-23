let adminMiddleware = (req, res, next) => {
    if(!req.session.userLogged || req.session.userLogged.Categoria != "Administrador"){
    return res.status(404).redirect("/info/error")
    }
    
    next();
}

module.exports = adminMiddleware;