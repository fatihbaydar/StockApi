"use strict"

const router = require("express").Router()

router.use("/user", require("./user"))
router.use("/token", require("./token"))
router.use("/firm", require("./firm"))
router.use("/category", require("./category"))
router.use("/brand", require("./brand"))
router.use("/product", require("./product"))
router.use("/purchase", require("./purchase"))
router.use("/sale", require("./sale"))

module.exports = router