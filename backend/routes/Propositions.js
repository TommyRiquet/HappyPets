const express = require('express')
const { Model } = require('sequelize')
const router = express.Router()
const {Propositions,Users} = require("../models")

router.get("/", async (req, res) => {
    if(req.query.id===undefined){
        req.query.id = 0
    }
    if(req.query.offset===undefined || req.query.offset===0){
        const ListPropositions = await Propositions.findAll({
            limit : 20, 
            attributes : [],
            where : {
                AnnonceId : req.query.id
            },
                include : [{
                    model : Users,
                    attributes : ['FirstName', 'Age', 'Adress'],
                }],

        })
        res.json(ListPropositions)
    }else{
        const ListPropositions = await Propositions.findAll({
            limit : 6, 
            offset : parseInt(req.query.offset),
            attributes : [],
            where : {
                AnnonceId : req.query.id
            },
                include : [{
                    model : Users,
                    attributes : ['FirstName', 'Age', 'Adress'],
                }],
        })
        res.json(ListPropositions)
    }
})

module.exports = router