require("dotenv").config()
const jwt = require("jsonwebtoken")

module.exports.superLoginService = (data) => {
    return {
        accessToken: jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: Number(process.env.TOKEN_AGE)
        })
    }
}