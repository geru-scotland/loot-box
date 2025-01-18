const { roles } = require("../constants/shared");
const User = require("../models/user.model");
const Inventory = require("../models/inventory.model");

const dashboardController = async (req, res) => {
    const username = req.session.user.username;

    const user = await User.findOne({username: username}, "inventory_guid");
    console.log(username);
    if(!user){
        return res.status(404).json({error: "User not foundo"});
    }

    const inventory = await Inventory.findOne({_id: user.inventory_guid}).populate("items");

    const userData = {
        isAdmin: req.session.user.role === roles.ADMIN,
        username: username,
        inventory: inventory
    }

    res.render("dashboard", { user: userData });
}

module.exports = {
    dashboardController
}