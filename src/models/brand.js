"use strict"

const { mongoose } = require("../configs/dbConnection")

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    images: {
        type: Array,
        default: []
    },
}, { collection: "brands", timestamps: true })

module.exports = mongoose.model("Brand", BrandSchema)