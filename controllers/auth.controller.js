const User = require("../models/user.model");
const { errors } = require("../constants/error")

const loginController = async (req, res) => {

    const { username, password } = req.body;

    try{
        const user = await User.findOne({username: username.toLowerCase()});

        if(!user){
            return res.status(409).render("login", {error: errors.auth.USERNAME_NOTFOUND});
        }

        const passwordOk = await user.checkPassword(password);

        if(!passwordOk){
            return res.status(409).render("login", {error: errors.auth.WRONG_CREDENTIALS});
        }

        req.session.user = { id: user._id, username: user.username, role: user.role };
        return res.status(200).redirect("/dashboard");

    } catch (e) {

        const error = {
            status: 500,
            message: "An unexpected error occurred. Please try again later.",
        };
        return res.status(500).render("login", { error: error });
    }
}

const logoutController = (req, res) => {
    req.session.destroy();
    res.clearCookie("connect.sid");
    return res.redirect("/");
}

module.exports = {
    loginController,
    logoutController
}