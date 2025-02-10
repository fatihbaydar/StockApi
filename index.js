"use strict"

const express = require("express")
const app = express()

/* ------------------------------------------------------- */
//? REQUIRED MODULES

// envVariables to process.env:
require("dotenv").config()
const HOST = process.env?.HOST || "127.0.0.1"
const PORT = process.env?.PORT || 8000

// asyncErrors to errorHandler
require("express-async-errors")

/* ------------------------------------------------------- */
//? CONFIGURATION

// Connect to DB
const { dbConnection } = require("./src/configs/dbConnection")
dbConnection()

/* ------------------------------------------------------- */
//? MIDDLEWARES

// Accept to JSON
app.use(express.json())

//res.getModelList
app.use(require("./src/middlewares/queryHandler"))

/* ------------------------------------------------------- */
//? ROUTES

// Home Path
app.all("/", (req, res) => {
    res.send({
        error: false,
        message: "Welcome to Stock Management API",
        documents: {
            swagger: "/documents/swagger",
            redoc: "/documents/redoc",
            json: "/documents/json",
        },
        user: req.user
    })
})

//Routes
app.use(require("./src/routes/index"))
/* ------------------------------------------------------- */

//* errorHndler:
app.use(require("./src/middlewares/errorHandler"))

//* RUN SERVER
app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`))

