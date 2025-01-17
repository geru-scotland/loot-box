const mongoose = require("mongoose");
const shared = require("../constants/shared")

const inventorySchema = new mongoose.Schema({
    items: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "items"}],
        default: [],
        validate: {
            validator: function (items) {
                return items.length <= shared.INVENTORY_CAPACITY;
            },
            message: `Inventory exceeds its maximum capacity of ${shared.INVENTORY_CAPACITY} items`
        }
    }
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;