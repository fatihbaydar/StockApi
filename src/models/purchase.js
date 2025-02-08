"use strict"

const { mongoose } = require("../configs/dbConnection")

const PurchaseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    firmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Firm",
        required: true
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    priceTotal: {
        type: Number,
        default: function () { return this.quantity * this.price },
        set: function () { return this.quantity * this.price },
        transform: function () { return this.quantity * this.price }
    },
}, { collection: "purchases", timestamps: true })

module.exports = mongoose.model("Purchase", PurchaseSchema)