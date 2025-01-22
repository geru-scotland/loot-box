const mongoose = require("mongoose");
const { shared } = require("../constants/shared")

const inventorySchema = new mongoose.Schema({
    items: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item"}],
        default: [],

    }
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;