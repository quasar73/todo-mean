module.exports = {
    mongoURI: process.env.MONGO_URI,
    jwt: process.env.JWT,
    jwtExpire: 60 * 60 * 24 * 365
};