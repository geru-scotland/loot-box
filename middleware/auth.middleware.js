

const requiresAuth = (req, res, next) => {
    if(req.session.user){
        return next();
    }
    return res.redirect("/");
}

const strictNoAuth = (req, res, next) => {
    if(req.session.user){
        return res.redirect("/dashboard")
    }
    next();
}

module.exports = {
    requiresAuth,
    strictNoAuth
}