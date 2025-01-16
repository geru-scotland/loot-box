const routes = require("../routes/routes");
const User = require("../models/user.model");

const loginController = (req, res) => {
    res.status(200).render("login", { routes: routes });
}

const registerController = (req, res) => {
    res.status(200).render("register", { routes: routes });
}

const logoutController = (req, res) => {
    req.session.destroy();
    res.clearCookie("connect.sid");
    return res.redirect("/");
}

const createAccountController = async (req, res) => {

    const { username, password, email } = req.body;

    if(!username || !password || !email){
        return res.status(400).render("error", { error: { status: 400, message: "Missing fields" } });
    }

    try{
        const exists = await User.findOne({username: username});

        if(exists){
            const error = {
                status: 500,
                message: "Username already exists"
            }
            return res.status(409).render({error: error})
        }

        const user = new User({
            username: username,
            password: password,
            email: email,
        })

        await user.save();

        req.session.user = {
            id: user._id,
            usernme: user.username
        }

        res.status(200).render("dashboard");

    } catch(e) {
        console.error("Error al crear la cuenta:", e);
        res.status(500).render("error", { error: { status: 500, message: "Error interno del servidor" } });
    }
}

module.exports = {
    loginController,
    registerController,
    createAccountController,
    logoutController
}