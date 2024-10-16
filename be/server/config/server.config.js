require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    MONGODB_URL: process.env.MONGODB_URL,
    // JWT_KEY: process.env.JWT_KEY,
}