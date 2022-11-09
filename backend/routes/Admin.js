const express = require('express')
const router = express.Router()
const {Admin} = require("../models")

router.get("/", async (req, res) => {
    const allreport = await Admin.findAll()
    res.json(allreport)
})

router.get("/findtype/:type", async (req, res) => {
    const allreport = await Admin.findAll({where: {Type: req.params.type}})
    res.json(allreport)
})

module.exports = router