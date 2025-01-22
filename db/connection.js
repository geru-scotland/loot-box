// MongoDB setup
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const config = require("../config");
const Item = require("../models/item.model")

const importItems = async () => {
    try {
        const db = mongoose.connection.db;

        const itemCount = await Item.countDocuments();

        if (itemCount === 0) {
            console.log("[MONGODB] Item colection does not exist, importing data...");

            const filePath = path.join(__dirname, "loot-box.items.json");
            // Ignoro el id
            const data = JSON.parse(fs.readFileSync(filePath, "utf8")).map(({ _id, ...rest }) => rest);

            await db.collection("items").insertMany(data);
            console.log("[MONGODB] Data imported successfully!");
        }
    } catch (error) {
        console.error("Error importing data", error);
    }
};

const connection = async () => {
    try {
        await mongoose.connect(config.mongoURI);
        console.log(`[MONGODB] Connected: ${config.mongoURI}`);

        await importItems();
    } catch (error) {
        console.error("Error connecting to DB:", error);
        process.exit(1);
    }
};

module.exports = connection;
