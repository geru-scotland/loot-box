const { homepage } = require("../constants/strings");

const getHomePage = (req, res) => {
    console.log(homepage);
    res.render("index", {textData: homepage});
}

module.exports = getHomePage;