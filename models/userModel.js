const mongoose = require("mongoose");
const { isEmail, isPostalCode } = require("validator");
// const bcrypt = require("bcrypt");

const validateZipCode = (code) => {
    return isPostalCode(code.toString(), "IN")
}

const userSchema = mongoose.Schema({
    id: {
        type: String,
        required: [true, "Please provide a userId."],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide a email."],
        unique: true,
        validate: [isEmail, "Please enter a valid email address!"]
    },
    name: {
        type: String,
        required: [true, "Please provide a name."]
    },
    age: {
        type: Number,
        required: [true, "Please provide your age."]
    },
    city: {
        type: String,
        required: [true, "Please provide a city."]
    },
    zipCode: {
        type: Number,
        validate: [validateZipCode, "Please Enter a valid Zip Code"],
        required: [true, "Please provide a zip-code."]
    },
    isDeleted: {
        type: Boolean,
        required: [true, "Please provide isDeleted"]
    }
});

userSchema.post('save', function(doc, next){
    console.log("user created successfully", doc)
    next()
})

userSchema.statics.getAllUsers = async function () {
    const users = await this.find({isDeleted: false})
    // console.log(users)
    return users;
}

userSchema.statics.getUserById = async function (id) {
    const user = await this.findOne({id: id, isDeleted: false})
    if (!user) {
        throw Error("User with id = "+id+" not found!")
    }

    return user
}

userSchema.statics.replaceUserById = async function (data) {
    // console.log(data, 65)
    const user = await this.findOne({id: data.id, isDeleted: false})
    if (!user) {
        throw Error("User with id = "+id+" not found!")
    }

    const result = await this.replaceOne({id: data.id}, {...data})
    if (!result) {
        throw Error("Failed to update user!")
    }

    return
}

userSchema.statics.updateUserById = async function (data) {
    // console.log(data)
    const user = await this.findOne({id: data.id, isDeleted: false})
    if (!user) {
        throw Error("User with id = "+id+" not found!")
    }

    const result = await this.updateOne({id: data.id}, {name: data.name, email: data.email, age: data.age, city: data.city, zipCode: data.zipCode})
    if (!result) {
        throw Error("Failed to update user!")
    }

    return
}

userSchema.statics.softDeleteUser = async function (id) {
    const result = await this.updateOne({id: id}, {isDeleted: true})
    if (!result) {
        throw Error("Failed to delete user!")
    }
    return
}

const user = mongoose.model("Users", userSchema);

module.exports = user;