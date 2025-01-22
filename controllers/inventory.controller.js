const Item = require("../models/item.model");
const Inventory = require("../models/inventory.model");
const User = require("../models/user.model");
const routes = require("../routes/routes");

const addItemInventoryController = async (req, res) => {
    const itemId = req.params.itemid;

    const item = await Item.findOne({ _id: itemId }, {});
    if(!item){
        return res.status(404).json({error: "Item not found."});
    }

    const user = await User.findOne({ username: req.session.user.username }, { inventory_guid:1 });
    if(!user){
        return res.status(404).json({error: "User not found"});
    }

    const inventory = await Inventory.findOne({ _id: user.inventory_guid })
    if(!inventory){
        return res.status(404).json({error: "User not found"});
    }

    if (inventory.items.length >= 20) {
        return res.status(400).json({ error: "Inventory is full." });
    }

    const position = inventory.items.length;
    inventory.items.push(item._id);
    await inventory.save();

    res.status(200).json({
        message: "Item added to inventory",
        position,
        item: {
            id: item._id,
            type: item.type,
            name: item.name,
            description: item.description,
            icon: routes.images.icons + "/" + item.icon,
            quality: item.quality,
        },
    });
}

const resetInventoryController = async (req, res) => {
    console.log("reseting inv")
    const userId = req.session.user.id;
    const user = await User.findById(userId, {inventory_guid:1})

    if(!user){
        console.error("User not found");
        return res.status(409).json({ message: "User not found!"});
    }

    const inventory = await Inventory.findById(user.inventory_guid);
    if (!inventory) {
        console.error("Inventory not found");
        return res.status(404).json({ message: "Inventory not found!"});
    }

    inventory.items = [];
    await inventory.save();
    console.log("reseting inv - sending ok")
    res.status(200).json({ message: "Inventory reset!"});
}

module.exports = { addItemInventoryController, resetInventoryController };