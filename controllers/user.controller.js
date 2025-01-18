const User = require("../models/user.model");
const {errors} = require("../constants/error");
const Inventory = require("../models/inventory.model");


const createUserController = async (req, res) => {

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

        res.status(200).redirect("/dashboard");

    } catch(e) {
        console.error("Error al crear la cuenta:", e);
        res.status(500).render("error", { error: { status: 500, message: "Internal server error" } });
    }
}

module.exports = { createUserController };