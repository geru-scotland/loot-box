
const baseConfig = {
    port: process.env.PORT || 3000,
    mongoURI: `${process.env.MONGO_URI}/${process.env.DB_COLLECTION}`,
    sessionsCollection: process.env.DB_SESSIONS,
}

module.exports = baseConfig;