const express = require('express')
const router = express.Router()
const {Admin} = require("../models")

router.get("/", async (req, res) => {
    const listOfreq = await Admin.findAll()
    res.json(listOfreq)
})

module.exports = router