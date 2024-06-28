const Users = require("../models/userModel")

module.exports.getAllUsersDAO = async () => {
    try {
        const users = await Users.getAllUsers();
        // console.log(users)
        return users
    } catch (error) {
        // console.log(error)
        throw Error("Failed to get users", error)
    }
}

module.exports.getUserByIdDAO = async (id) => {
    try {
        const user = await Users.getUserById(id)

        return user
    } catch (error) {
        throw("Failed to get user details", error)
    }
}

module.exports.putUpdateUserByIdDAO = async (data) => {
    try {
        const user = await Users.getUserById(data.id)
        var newUser = {...user._doc}
        if (user.name !== data.name) {
            newUser.name = data.name
        }

        if (user.email !== data.email) {
            newUser.email = data.email
        }

        if (user.age !== data.age) {
            newUser.age = data.age
        }

        if (user.city !== data.city) {
            newUser.city = data.city
        }

        if (user.zipCode !== data.zipCode) {
            newUser.zipCode = data.zipCode
        }

        return await Users.replaceUserById(newUser)
    } catch (error) {
        throw("Failed to get user details", error)
    }
}

module.exports.patchUpdateUserDAO = async function (id, data) {
    try {
        const user = await Users.getUserById(id)
        var newUser = {...user._doc}
        if (user.name !== data.name && data.name !== "") {
            newUser.name = data.name
        }

        if (user.email !== data.email && data.email !== "") {
            newUser.email = data.email
        }

        if (user.age !== data.age && data.age !== 0) {
            newUser.age = data.age
        }

        if (user.city !== data.city && data.city !== "") {
            newUser.city = data.city
        }

        if (user.zipCode !== data.zipCode && data.zipCode !== 0) {
            newUser.zipCode = data.zipCode
        }

        return await Users.updateUserById(newUser)

    } catch (error) {
        console.log(error)
        throw("Failed to get user details", error)
    }
}

module.exports.softDeleteUser = async (id) => {
    try {
        return await Users.softDeleteUser(id)
    } catch (error) {
        throw("Cannot delete User", error)
    }
}