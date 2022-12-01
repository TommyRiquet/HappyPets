const express = require('express')
const router = express.Router()
const {Admin,Users} = require("../models")

router.get("/", async (req, res) => {
    let offset = req.query.offset || 0
    let limit = req.query.limit ? ((req.query.limit>0 && !isNaN(req.query.limit)) ? req.query.limit : 0): 20

    const allreport = await Admin.findAll({
        limit:parseInt(limit),
        offset:parseInt(offset),
        include : [{
            model:Users,
            attributes:['id','FirstName'],}]
    })
    res.json(allreport)
})

router.get("/findtype", async (req, res) => {
    let offset = req.query.offset || 0
    let limit = req.query.limit ? ((req.query.limit>0 && !isNaN(req.query.limit)) ? req.query.limit : 0): 20
    const allreport = await Admin.findAll({
        limit:parseInt(limit),
        offset:parseInt(offset), 
        where: {Type: req.query.type},
        include : [{
        model:Users,
        attributes:['id','FirstName'],}]
})
    res.json(allreport)
})

module.exports = router