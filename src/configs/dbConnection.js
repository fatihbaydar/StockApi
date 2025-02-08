"use strict"

const mongoose = require("mongoose")

const dbConnection = function() {
    mongoose.connect(process.env.MONGODB)
    .then(() => console.log("Connected to Database"))
    .catch((err)=> console.log("Failed to Connect to Database"))
}

module.exports = {
    mongoose,
    dbConnection
}