const express = require('express')
const router = express.Router()
const {Admin} = require("../models")

router.get("/", async (req, res) => {
    const allreport = await Admin.findAll()
    res.json(allreport)
})

module.exports = router