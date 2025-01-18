const Item = require("../models/item.model");

const createItemController = async (req, res) => {

    const { itemName, itemType, itemDescription, itemQuality } = req.body;

    try {
        const image = req.file;
        const iconName = image.filename;

        // Debería de comprobar que sea único, pero como es de juguete esto,
        // dejo items con mismo nombre.

        const item = new Item()

    } catch(e){
        console.log(e);
    }
};

const rngItemController = () => {

}

module.exports = { rngItemController, createItemController};
