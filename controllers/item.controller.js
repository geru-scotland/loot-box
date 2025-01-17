
const rngItemController = () => {

}

const createItemController = (req, res) => {

    const { itemName, itemType, itemDescription, itemQuality } = req.body;

    try{
        const image = req.file;
        const iconName = image.filename;
        console.log("IconName:", iconName);
        console.log("Item Name:", itemName);
        console.log("Item Type:", itemType);
        console.log("Item Description:", itemDescription);
        console.log("Item Quality:", itemQuality);


        res.send(`Item received: ${itemName}, ${itemType}, ${itemDescription}, ${itemQuality}`);
    } catch(e){
        console.log(e);
    }
};

module.exports = { rngItemController, createItemController};
