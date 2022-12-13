const express = require('express')
const { Op } = require('sequelize')
const router = express.Router()
const { Propositions, Users, Pets } = require("../models")


router.get("/", async (req, res) => {

    let offset = req.query.offset || 0
    let limit = req.query.limit ? ((req.query.limit > 0 && !isNaN(req.query.limit)) ? req.query.limit : 0) : 10
    let typeProposition = req.query.typeProposition || ["Promenade", "Logement", "Garde à domicile", "Soins à domicile"]
    let frequenceProposition = req.query.frequenceProposition || ["Régulière", "Occasionnelle"]
    let animalProposition = req.query.animalProposition || ["Chien", "Chat", "Rongeur", "Oiseau", "Poisson", "NAC"]

    const ListPropositions = await Propositions.findAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
        where: {
            Type: { [Op.or]: [typeProposition] },
            Frequency: { [Op.or]: [frequenceProposition] },
            Animal: { [Op.or]: [animalProposition] },
            isActive:true
        },
        attributes: ['id','Type', 'Frequency', 'Animal'],
        include: [{
            model: Users,
            attributes: ['FirstName', 'City', 'PhotoLink'],
            include: [{
                model: Pets,
                attributes: ['Type', 'Name'],
            }],
        }],
    })
    res.json(ListPropositions)
})

router.get("/detailProposition", async (req, res) => {
    const id = req.query.id <= 0 || isNaN(parseInt(req.query.id)) ? 1 : req.query.id

    const detailOfProposition = await Propositions.findOne(
        {
            where: { id: id, isActive: true },
            attributes: ['id', 'Type', 'Frequency', 'Animal', 'Number'],
            include: [{
                model: Users,
                attributes: ['id', 'Firstname', 'Age', 'City', 'Postal'],
                include: [{
                    model: Pets,
                    attributes: ['Type', 'Name', 'Age', 'Race', 'DogFriendly','CatFriendly', 'KidFriendly', 'Comment'],
                    where:{isActive:true}
                }],
            }]
        }
    )
    res.json(detailOfProposition)
})

router.put('/updateProposition', async (req, res) => {
    try {
        Propositions.update({
            Type: req.body.Type,
            Frequency: req.body.Frequency,
            Animal: req.body.Animal,
            Number: req.body.Number,
        }, {
            where: {
                id: req.body.id
            }
        })

        res.json(200)
    } catch (error) { // en cas d'erreur
        res.status(500).json(error);
    }
})


router.put("/deleteProposition", async (req, res) => {
    try {
        Propositions.update({
            isActive: false
        }, {
            where: {
                id: req.body.id
            }
        })
        res.json(200);
    } catch (error) { // en cas d'erreur
        res.status(500).json(error);
    }
});

router.get("/me", async (req, res) => {

    let id = (req.query.id>0 && !isNaN(req.query.id)) ? req.query.id: 0
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
                Animal : {[Op.or] : [animalProposition]},
                isActive:true
            },
            attributes : ['Type','Frequence','Animal'],
                include : [{
                    model : Users,
                    attributes : ['PhotoLink'],
                    include : [{
                        model: Pets,
                        attributes : ['Type', 'Name'],
                        where : { 
                            UserId: id, 
                        },
                        }],
                    }],
        })
        res.json(ListPropositions)

})

module.exports = router