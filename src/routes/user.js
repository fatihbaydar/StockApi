"use strict"

const router = require("express").Router()

const { list, create, read, update, deletee } = require("../controllers/user")
const { isLogin, isAdmin } = require("../middlewares/permissions")

router.route("/")
    .get(isAdmin, list)
    .post(create)

router.route("/:id")
    .get(isLogin, read)
    .put(isLogin, update)
    .patch(isLogin, update)
    .delete(isAdmin, deletee)

module.exports = router