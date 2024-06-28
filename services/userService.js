const { isPostalCode } = require("validator")
const User = require("../models/userModel")
const {v4} = require("uuid")
const { getAllUsersDAO, getUserByIdDAO, putUpdateUserByIdDAO, patchUpdateUserDAO, softDeleteUser } = require("../dao/usersDAO")

module.exports.createUserService = async (data) => {
    
    const id = v4()

    try {
        // if(!isPostalCode())
        const user = await User.create({id, ...data, isDeleted: false})
        return user
    } catch (error) {
        // console.log("Went wrong", {...error})
        throw Error(error)
    }
}

module.exports.getUsersService = async () => {
    try {
        const users = await getAllUsersDAO()

        return users
    } catch (error) {
        // console.log(error)
        throw Error("Failed to get users", error)
    }
}

module.exports.getUserByIdService = async (id) => {
    try {
        const user = await getUserByIdDAO(id)

        return user
    } catch (error) {
        throw Error("Failed to get user details", error)
    }
}

module.exports.putUpdateUserByIdService = async (id, name, email, age, city, zipCode) => {
    try {
        const user = {id, name, email, age, city, zipCode}

        const data = await putUpdateUserByIdDAO(user)

        return data
    } catch (error) {
        throw Error("Failed to get user details", error)
    }
}

module.exports.patchUpdateService = async (id, data) => {
    try {
        
        const userData = {
            name: (data?.name) ? data?.name : "",
            email: (data?.email) ? data?.email : "",
            age: (data?.age) ? data?.age : 0,
            city: (data?.city) ? data?.city : "",
            zipCode: (data?.zipCode) ? data?.zipCode : 0,
        }

        return await patchUpdateUserDAO(id, userData)
    } catch (error) {
        throw Error("Failed to get user details", error)
    }
}

module.exports.softDeleteUserService = async (id) => {
    try {
        
        return await softDeleteUser(id)
    } catch (error) {
        throw Error("Failed to get user details", error)
    }
}