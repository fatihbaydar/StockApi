"use strict"

const router = require("express").Router()

router.use("/user", require("./user"))
router.use("/token", require("./token"))
router.use("/firm", require("./firm"))

module.exports = router