"use strict"

const { mongoose } = require("../configs/dbConnection")
const passwordEncrypt = require("../helpers/passwordEncrypt")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isStaff: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    collection: "users", timestamps: true
})

UserSchema.pre(["save", "updateOne"], function (next) {
    // console.log("this is from pre middleware")
    // console.log(this)

    const data = this?._update ?? this

    // Email validation
    const isEmailValidated = data.email ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) : true

    if (!isEmailValidated) {
        // throw new Error("Email is not validated")
        next(new Error("Email is not validated"))
    }

    // Password validation
    const isPasswordValidated = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.]).{8,}$/.test(data.password)

    if (!isPasswordValidated) next(new Error("password must be at least 8 characters including a number and an uppercase letter."))

    data.password = passwordEncrypt(data.password)

    next()
})

module.exports = mongoose.model("User", UserSchema)