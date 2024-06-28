const { v4 } = require("uuid")
const { superLoginService } = require("../services/authService")

module.exports.superLoginController = async (req, res) => {
    try {
        const admin = {adminId: v4(), createdAt: new Date().getTime()}
        const data = superLoginService(admin)

        return res.status(200).json({
            error: {},
            data
        })
    } catch (error) {
        return res.status(400).json({
            error: "Could not login admin. Error fetching token!"
        })
    }
}