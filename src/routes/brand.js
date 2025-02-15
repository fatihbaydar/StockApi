"use strict"

const router = require("express").Router()

const { list, create, read, update, deletee } = require("../controllers/brand")
const { isAdmin } = require("../middlewares/permissions")
const upload = require("../middlewares/upload")


router.use(isAdmin)

router.route("/")
    .get(list)
    .post(upload.array("image"), create)

router.route("/:id")
    .get(read)
    .put(upload.array("image"), update)
    .patch(upload.array("image"), update)
    .delete(deletee)

module.exports = router