const { createUserService, getUsersService, getUserByIdService, putUpdateUserByIdService, patchUpdateService, softDeleteUserService } = require("../services/userService")


module.exports.createUserController = async (req, res) => {
    const { name, email, age, city, zipCode } = req?.body
    try {
        const user = await createUserService({name, email, age, city, zipCode})

        return res.status(201).send("USER CREATED!")
    } catch(e) {
        console.log("Something", e.message)
        res.status(400).json({
            error : e.message,
            data : {}
        })
    }
}

module.exports.getUsersController = async (req, res) => {
    try {
        const users = await getUsersService()

        return res.status(200).json({
            error: {},
            data: {
                users
            }
        })
    } catch (error) {
        res.status(400).json({
            error : error.message,
            data : {}
        })
    }
}

module.exports.getUserByIdController = async (req, res) => {
    const id = req?.params?.userId

    try {
        const user = await getUserByIdService(id)

        return res.status(200).json({
            error: {},
            data: {
                user
            }
        })
    } catch (error) {
        res.status(400).json({
            error : error.message,
            data : {}
        })
    }
}

module.exports.putUpdateUserByIdController = async (req, res) => {
    const id = req?.params?.userId
    const { name, email, age, city, zipCode } = req?.body;

    try {
        const user = await putUpdateUserByIdService(id, name, email, age, city, zipCode)

        return res.status(202).send("User updated")
    } catch (error) {
        res.status(400).json({
            error : error.message,
            data : {}
        })
    }
}

module.exports.patchUpdateUserController = async (req, res) => {
    const id = req?.params?.userId

    try {
        const user = await patchUpdateService(id, req?.body)
        return res.status(202).send("User updated")
    } catch (error) {
        res.status(400).json({
            error : error.message,
            data : {}
        })
    }
}

module.exports.softDeleteUserController = async (req, res) => {
    const id = req?.params?.userId

    try {
        const user = await softDeleteUserService(id)
        return res.status(204).send("User Delete")
    } catch (error) {
        res.status(400).json({
            error : error.message,
            data : {}
        })
    }
}