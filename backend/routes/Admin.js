const express = require('express')
const { QueryTypes } = require('sequelize');
const router = express.Router()
const {Admin,Users, sequelize} = require("../models")

router.get("/", async (req, res) => {
    let offset = req.query.offset || 0
    let limit = req.query.limit ? ((req.query.limit>0 && !isNaN(req.query.limit)) ? req.query.limit : 0): 20

    const allreport = await sequelize.query(
        "SELECT A.*, US.FirstName 'NomSus', U.FirstName 'NomUser'\
        FROM `Admins` A \
        JOIN `Users` US ON US.id = A.SuspectId \
        JOIN `Users` U ON U.id = A.UserId \
        LIMIT "+limit+" OFFSET "+offset
    , { type: QueryTypes.SELECT });
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
        attributes:['id','FirstName']}]
})
    res.json(allreport)
})

module.exports = router