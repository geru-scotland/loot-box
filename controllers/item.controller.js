const Item = require("../models/item.model");

const createItemController = async (req, res) => {

    const { itemName, itemType, itemDescription, itemQuality } = req.body;

    try {
        const image = req.file;
        const iconName = image.filename;

        const exists = await Item.findOne({name: itemName});

        if(exists){
            return res.status(409).redirect("/admin/success");
        }

        const item = new Item({
            name: itemName,
            type: itemType,
            description: itemDescription,
            quality: itemQuality,
            icon: iconName
        });

        await item.save();

        return res.status(201).redirect("/admin/success");

    } catch(e){
        return res.status(500).redirect("/admin/error");
    }
};

const rngItemController = () => {

}

module.exports = { rngItemController, createItemController};
