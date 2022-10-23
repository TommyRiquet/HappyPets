const express = require('express')
const router = express.Router()
const {Annonces,Pets,Users} = require("../models")


router.get("/", async (req, res) => {
    /*
    *   Route initial qui retourne les 20 premières annonces
    */
    if(req.query.offset===undefined || req.query.offset === "0"){
            const listOfAnnonces = await Annonces.findAll(
                {
                    limit: 20,
                    attributes: ['Type','DateBegin','DateEnd'],
                        include: [ {
                            model:Pets,
                            attributes: ['Name','Type','Race','Age','Sexe','Weight','Height'],
                            include: [ {
                                model:Users,
                                attributes: ['Firstname','Ville'],
                            }]
                        }]
                }
            )
            res.json(listOfAnnonces)
        
    }else{
        /*
        *   Route secondaire qui retourne les 6 annonces suivantes
        */
        const listOfAnnonces = await Annonces.findAll(
            {
                limit: 6,
                offset: parseInt(req.query.offset),
                attributes: ['Type','DateBegin','DateEnd'],
                    include: [ {
                        model:Pets,
                        attributes: ['Name','Type','Race','Age','Sexe','Weight','Height'],
                        include: [ {
                            model:Users,
                            attributes: ['Firstname','Ville'],
                        }]
                    }]
            }
        )
        res.json(listOfAnnonces)
    }

  
})

router.get("/amount", async (req, res) => {
    const listOfAnnonces = await Annonces.findAll()
    res.json(listOfAnnonces.length)
})

module.exports = router