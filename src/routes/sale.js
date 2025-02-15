"use strict"

const router = require("express").Router()

const { list, create, read, update, deletee } = require("../controllers/sale")
const { isLogin, isStaff } = require("../middlewares/permissions")

router.route("/")
    .get(isLogin, list)
    .post(isLogin, create)

router.route("/:id")
    .get(isLogin, read)
    .put(isStaff, update)
    .patch(isStaff, update)
    .delete(isStaff, deletee)

module.exports = router