"use strict"

const router = require("express").Router()

const { list, create, read, update, deletee } = require("../controllers/token")
const { isAdmin } = require("../middlewares/permissions")

router.use(isAdmin)

router.route("/")
    .get(list)
    .post(read)

router.route("/:id")
    .get(read)
    .put(update)
    .patch(update)
    .delete(deletee)

module.exports = router

