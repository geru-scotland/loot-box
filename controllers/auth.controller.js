const User = require("../models/user.model");
const Inventory = require("../models/inventory.model");
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

const registerController = async (req, res) => {

    const { username, password, email } = req.body;

    if(!username || !password || !email){
        return res.status(400).render("error", { error: { status: 400, message: "Missing fields" } });
    }

    try{
        const exists = await User.findOne({username: username.toLowerCase()});

        if(exists){
            return res.status(409).render("register", {error: errors.auth.USERNAME_ALREADY_EXISTS})
        }

        // TODO: crear nuevo inventario y obtener su _id primero
        const inventory = new Inventory();
        await inventory.save();
        // ahora, crear el nuevo usuario agregando la referencia al inventario
        const user = new User({
            username: username.toLowerCase(),
            password: password,
            email: email,
            inventory_guid: inventory._id
        })

        await user.save();

        req.session.user = {
            id: user._id,
            usernme: user.username,
            role: user.role
        }

        res.status(200).redirect("dashboard");

    } catch(e) {
        console.error("Error al crear la cuenta:", e);
        res.status(500).render("error", { error: { status: 500, message: "Internal server error" } });
    }
}

module.exports = {
    loginController,
    registerController,
    logoutController
}