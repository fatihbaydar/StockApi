"use strict"

const { mongoose } = require("../configs/dbConnection")

const TokenSchema = new mongoose.Schema({

    userId: {
        type: String,
        ref: "User",
        required: true,
        unique: true, // default mongoDB relation is many to one by this one to one
        index: true
    },
    token: {
        type: String,
        trim: true,
        required: true,
        index: true,
        unique: true
    }
}, { collection: "tokens", timestamps: true })

module.exports = mongoose.model("Token", TokenSchema)