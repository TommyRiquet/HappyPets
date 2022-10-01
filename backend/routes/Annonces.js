const express = require('express')
const router = express.Router()
const {Annonces,Pets,Users} = require("../models")


router.get("/", async (req, res) => {

    const listOfAnnonces = await Annonces.findAll(
        {
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
})

module.exports = router