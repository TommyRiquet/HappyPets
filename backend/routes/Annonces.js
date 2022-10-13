const express = require('express')
const { query } = require('express')
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
                    attributes: ['DateBegin','DateEnd'],
                        include: [ {
                            model:Pets,
                            attributes: ['Name',"Type","Race","Age"],
                            include: [ {
                                model:Users,
                                attributes: ['Firstname'],
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
                attributes: ['DateBegin','DateEnd'],
                    include: [ {
                        model:Pets,
                        attributes: ['Name',"Type","Race","Age"],
                        include: [ {
                            model:Users,
                            attributes: ['Firstname'],
                        }]
                    }]
            }
        )
        res.json(listOfAnnonces)
    }

  
})
router.get("/me", async(req,res) =>{
    if(req.query.offset === "0"){
        const listOfAnnonces = await Annonces.findAll(
            {
                limit: 20,
                attributes: ['DateBegin','DateEnd'],
                    include: [ {
                        model:Pets,
                        attributes: ['Name',"Type","Race","Age"],
                        include: [ {
                            model:Users,
                            attributes: [],
                                where : {id: req.query.id},
                        }]
                    }]
            }
        )
        res.json(listOfAnnonces)
    }else{
        const listOfAnnonces = await Annonces.findAll(
            {
                limit: 6,
                offset: parseInt(req.query.offset),
                attributes: ['DateBegin','DateEnd'],
                    include: [ {
                        model:Pets,
                        attributes: ['Name',"Type","Race","Age"],
                        include: [ {
                            model:Users,
                            attributes: [],
                                where : {id: req.query.id},
                        }]
                    }]
            }
        )
        res.json(listOfAnnonces)
    }
})
module.exports = router