const dotenv = require("dotenv");

dotenv.config();

// Mergeo configs
const env = process.env.NODE_ENV || "development";
const baseConfig = require("./base");
const envConfig = require(`./${env}.js`) || {}

module.exports = {...baseConfig, ...envConfig}
