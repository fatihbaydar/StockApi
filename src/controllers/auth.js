"use strict"

const User = require("../models/user")
const Token = require("../models/token")
const passwordEncrypt = require("../helpers/passwordEncrypt")
const jwt = require("jsonwebtoken")

module.exports = {
    login: async (req, res) => {
        /*
           #swagger.tags = ["Authentication"]
           #swagger.summary = "Login"
           #swagger.description = 'Login with username (or email) and password for get Token and JWT.'
           #swagger.parameters["body"] = {
               in: "body",
               required: true,
               schema: {
                   "username": "test",
                   "password": "1234",
               }
           }
       */
        const { username, email, password } = req.body

        if (!((username || email) && password)) {
            res.errorStatusCode = 401
            throw new Error("Please enter username/email and password")
        }

        const user = await User.findOne({ $or: [{ email }, { username }] })

        if ((!user & user.password !== passwordEncrypt(password))) {
            res.errorStatusCode = 401
            throw new Error("Wrong username/email or password")
        }

        if (!user.isActive) {
            res.errorStatusCode = 401
            throw new Error("Inactive account")
        }

        /* Simple Token*/
        let tokenData = await Token.findOne({ userId: user._id })
        if (!tokenData) {
            tokenData = await Token.create({
                userId: user._id,
                token: passwordEncrypt(user._id + Date.now())
            })
        }

        /* JWT */
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, { expiresIn: "15m" })
        const refreshToken = jwt.sign({ _id: user._id, password: user.password }, process.env.REFRESH_KEY, { expiresIn: "3d" })

        res.status(200).send({
            error: false,
            token: tokenData.token,
            bearer: { accessToken, refreshToken }
        })
    },

}