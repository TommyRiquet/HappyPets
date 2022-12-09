const express = require('express')
const { Op } = require('sequelize')
const router = express.Router()
const {Propositions,Users,Pets} = require("../models")


router.get("/", async (req, res) => {

    let offset = req.query.offset || 0
    let limit = req.query.limit ? ((req.query.limit>0 && !isNaN(req.query.limit)) ? req.query.limit : 0): 10
    let typeProposition = req.query.typeProposition || ["Promenade","Logement","Garde à domicile","Soins à domicile"]
    let frequencyProposition = req.query.frequencyProposition || ["Régulière","Occasionnelle"]
    let animalProposition = req.query.animalProposition || ["Chien","Chat","Rongeur","Oiseau","Poisson","NAC"]

        const ListPropositions = await Propositions.findAll({
            limit : parseInt(limit), 
            offset: parseInt(offset),
            where: {
                Type : {[Op.or] : [typeProposition]},
                Frequency : {[Op.or] : [frequencyProposition]},
                Animal : {[Op.or] : [animalProposition]},
                isActive:true
            },
            attributes : ['Type','Frequency','Animal'],
                include : [{
                    model : Users,
                    attributes : ['FirstName', 'City', 'PhotoLink'],
                    include : [{
                        model: Pets,
                        attributes : ['Type', 'Name'],
                        }],
                    }],
        })
        res.json(ListPropositions)
})

router.post("/", async (req, res) => {
    try {
        const newProposition = await Propositions.create(req.body)
        res.json(newProposition)
    }
    catch (error) {
        res.status(400).send(error);
    }
})


module.exports = router