// MongoDB setup
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const config = require("../config");

const importItems = async () => {
    try {
        const db = mongoose.connection.db;

        const collections = await db.listCollections({ name: "items" }).toArray();
        if (collections.length === 0) {
            console.log("[MONGODB] La colección items no existe. Importando datos...");

            const filePath = path.join(__dirname, "loot-box.items.json");
            const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

            await db.collection("items").insertMany(data);
            console.log("[MONGODB] Datos importados correctamente.");
        }
    } catch (error) {
        console.error("Error al importar datos:", error);
    }
};

const connection = async () => {
    try {
        await mongoose.connect(config.mongoURI);
        console.log(`[MONGODB] Conectado a: ${config.mongoURI}`);

        await importItems();
    } catch (error) {
        console.error("Error en la conexión a MongoDB:", error);
        process.exit(1);
    }
};

module.exports = connection;
