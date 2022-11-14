const express = require('express')
const router = express.Router()
const {Admin} = require("../models")

router.get("/", async (req, res) => {
    let offset = req.query.offset || 0
    let limit = req.query.limit ? ((req.query.limit>0 && !isNaN(req.query.limit)) ? req.query.limit : 0): 20

    const allreport = await Admin.findAll({limit:parseInt(limit),offset:parseInt(offset)})
    res.json(allreport)
})

router.get("/findtype/:type", async (req, res) => {
    const allreport = await Admin.findAll({ where: {Type: req.params.type}})
    res.json(allreport)
})

module.exports = router