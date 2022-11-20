const express = require('express')
const { Op } = require('sequelize')
const router = express.Router()
const {Propositions,Users,Pets} = require("../models")


router.get("/", async (req, res) => {

    let offset = req.query.offset || 0
    let limit = req.query.limit ? ((req.query.limit>0 && !isNaN(req.query.limit)) ? req.query.limit : 0): 10
    let typeProposition = req.query.typeProposition || ["Promenade","Logement","Garde à domicile","Soins à domicile"]
    let frequenceProposition = req.query.frequenceProposition || ["Régulière","Occasionnelle"]
    let animalProposition = req.query.animalProposition || ["Chien","Chat","Rongeur","Oiseau","Poisson","NAC"]

        const ListPropositions = await Propositions.findAll({
            limit : parseInt(limit), 
            offset: parseInt(offset),
            where: {
                Type : {[Op.or] : [typeProposition]},
                Frequence : {[Op.or] : [frequenceProposition]},
                Animal : {[Op.or] : [animalProposition]}
            },
            attributes : ['Type','Frequence','Animal'],
                include : [{
                    model : Users,
                    attributes : ['FirstName', 'City'],
                    include : [{
                        model: Pets,
                        attributes : ['Type', 'Name'],
                        }],
                    }],
        })
        res.json(ListPropositions)
})

router.get("/annonce", async (req, res) => {
    if(req.query.offset === "0"){
        const ListPropositions = await Propositions.findAll({
            limit : 20, 
            attributes : [],
            where : {AnnonceId : req.query.id},
                include : [{
                    model : Users,
                    attributes : ['FirstName', 'Age', 'City'],
                }],
            
        })
        res.json(ListPropositions)
    }else{
        const ListPropositions = await Propositions.findAll({
            limit : 6, 
            attributes : [],
            where : {AnnonceId : req.query.id},
                include : [{
                    model : Users,
                    attributes : ['FirstName', 'Age', 'City'],
                }],
            

        })
        res.json(ListPropositions)
    }
})

module.exports = router