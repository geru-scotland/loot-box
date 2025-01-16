const { homepage } = require("../constants/strings");

const getHomePage = (req, res) => {
    return res.render("index", { textData: homepage });
}

module.exports = getHomePage;