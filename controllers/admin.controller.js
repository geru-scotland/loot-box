const { resultIds } = require("../constants/shared")

const addItemController = (req, res) => {
    const resultId = req.params.rid;
    let feedback = null;

    if (resultId === resultIds.R_OK) {
        feedback = {
            type: "success",
            message: "Item created successfully!",
        };
    } else if (resultId === resultIds.R_ERROR) {
        feedback = {
            type: "error",
            message: "Item with this name already exists!",
        };
    }

    console.log(feedback);
    res.render("admin/add-items", { feedback });
}

module.exports = { addItemController };