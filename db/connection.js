// MongoDB setup
const mongoose = require("mongoose");
const config = require("../config");

const connection = async () => {
    try {
        await mongoose.connect(config.mongoURI);
        console.log(`[MONGODB] Conectado a: ${config.mongoURI}`)
    } catch (error) {
        console.error('Error en la conexión a MongoDB:', error);
        process.exit(1);
    }
}

module.exports = connection;