const { roles } = require("../constants/shared")

const requiresAuth = (req, res, next) => {
    if(req.session.user){
        return next();
    }
    return res.redirect("/");
}

const requiresAdmin = (req, res, next) => {
    if(req.session.user && req.session.user.role === roles.ADMIN){
        console.log("ADMIN OK")
        return next();
    }
    //TODO: Mejor que redireccione a página de privilege error.
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
    requiresAdmin,
    strictNoAuth
}