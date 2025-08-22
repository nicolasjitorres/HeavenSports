let adminMiddleware = (req, res, next) => {
    if(!req.session.userLogged || req.session.userLogged.id_rol != 2){
    return res.status(404).redirect("/info/error")
    }
    
    next();
}

export default adminMiddleware;