
const getHomePage = (req, res) => {
    res.render("index", {title: "Inventory Manager"})
}

module.exports = getHomePage;