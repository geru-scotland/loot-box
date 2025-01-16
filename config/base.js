
const baseConfig = {
    port: process.env.PORT || 3000,
    mongoURI: `${process.env.MONGO_URI}/${process.env.DB_COLLECTION}`,
}

module.exports = baseConfig;