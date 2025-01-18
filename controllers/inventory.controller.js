const Item = require("../models/item.model");
const Inventory = require("../models/inventory.model");
const User = require("../models/user.model");

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

    inventory.items.push(item._id);
    await inventory.save();
    res.status(200).json({message: "Item added to inventory"});
}

module.exports = { addItemInventoryController };