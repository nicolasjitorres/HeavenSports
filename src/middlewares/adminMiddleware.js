let adminMiddleware = (req, res, next) => {
    if(!req.session.userLogged || req.session.userLogged.Categoria != "Administrador"){
    res.status(404).render("info/error")
    }
    next();
}

module.exports = adminMiddleware;