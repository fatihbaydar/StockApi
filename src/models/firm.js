"use strict"

const { mongoose } = require("../configs/dbConnection")

const FirmSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        trim: true,
        required: true,
        unque: true
    },
    address: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true,
    }
}, {
    collection: "firms", timestamps: true
})

module.exports = mongoose.model("Firm", FirmSchema)