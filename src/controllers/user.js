"use strict"

const User = require("../models/user")
const passwordEncrypt = require("../helpers/passwordEncrypt")
const token = require("../models/token")
const jwt = require("jsonwebtoken")
const sendMail = require("../helpers/sendMail")

module.exports = {
    list: async (req, res) => {
        /* 
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
        const data = await res.getModelList(User)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(User),
            data
        })
    },

    create: async (req, res) => {
        /* 
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in:'body',
                required:true,
                schema:{
                    $ref"#/definitions/User"
                }
            }
        */
        const data = await User.create(req.body)

        /* Auth Login */
        // Simple Token
        const tokenData = await token.create({
            userId: data._id,
            token: passwordEncrypt(data._id + Date.now())
        })

        //JWT
        const accessToken = jwt.sign(data.toJSON(), process.env.ACCESS_KEY, { expiresIn: "15m" })
        const refreshToken = jwt.sign({ _id: data._id, password: data.password }, process.env.REFRESH_KEY, { expiresIn: "3d" })

        sendMail(
            data.email,
            "Welcome",
            ` <h1>Welcome</h1>
            <h2>${data.username}</h2>
            <p>"Welcome to our stock management system</p>`
        )

        res.status(200).send({
            error: false,
            token: tokenData.token,
            bearer: { accessToken, refreshToken },
            data
        })
    },

    read: async (req, res) => {
        /* 
           #swagger.tags = ["Users"]
           #swagger.summary = "Get Single User"
           
        */
        const data = await User.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        /* 
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
            #swagger.parameters['body'] = {
                in:'body',
                required:true,
                schema:{
                    $ref"#/definitions/User"
                }
            }
        */
        const data = await User.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await await User.findOne({ _id: req.params.id })
        })
    },

    deletee: async (req, res) => {
        /* 
            #swagger.tags = ["Sales"]
            #swagger.summary = "Delete Single Sale"
        */
        const data = await User.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: true,
            message: "Data might has already been deleted"
        })
    },

}