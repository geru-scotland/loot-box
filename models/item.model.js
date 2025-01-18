const mongoose = require("mongoose");

const { allowedQualities } = require("../constants/shared")
// itemType, itemDescription, itemQuality
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "Name "]
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quality: {
        type: String,
        required: true,
        validate: {
            validator: function(v){
                return allowedQualities.includes(v);
            },
            message: props => `${props.value} is not a valid quality!`
        }
    },
    icon: {
        type: String,
        required: true,
    }
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;