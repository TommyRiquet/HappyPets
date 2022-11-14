const express = require('express')
const router = express.Router()


router.get("/:image", async (req, res) => {
    res.sendFile(req.params.image, {root: "./Images/"})
})

module.exports = router