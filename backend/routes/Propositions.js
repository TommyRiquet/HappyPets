const express = require('express')
const { query } = require('express')
const router = express.Router()
const {Propositions,Users} = require("../models")

router.get("/", async (req, res) => {
    if(req.query.id!=undefined){
        const ListPropositions = await Propositions.findAll({
            limit : 20, 
            attributes : [],
            where : {AnnonceId : req.query.id},
                include : [{
                    model : Users,
                    attributes : ['FirstName', 'Age', 'Ville', 'Postal'],
                }],

        })
        res.json(ListPropositions)
    }else if(req.query.offset===undefined || req.query.offset===0){
        const ListPropositions = await Propositions.findAll({
            limit : 20, 
            attributes : [],
                include : [{
                    model : Users,
                    attributes : ['FirstName', 'Age', 'Ville', 'Postal'],
                }],

        })
        res.json(ListPropositions)
    }else{
        const ListPropositions = await Propositions.findAll({
            limit : 6, 
            offset : parseInt(req.query.offset),
            attributes : [],
                include : [{
                    model : Users,
                    attributes : ['FirstName', 'Age', 'Ville', 'postal'],
                }],
        })
        res.json(ListPropositions)
    }
})

module.exports = router