const authUserMiddleware = (req, res, next) => {
    if (!req.session.userLogged) {
        return res.redirect('/users/login');
    }

    next();
}

export default authUserMiddleware;