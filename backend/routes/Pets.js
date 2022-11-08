const express = require('express')
const router = express.Router()
const {Pets} = require("../models")


router.get("/", async (req, res) => {
    const listOfPets = await Pets.findAll()
    res.json(listOfPets)
})
router.post("/", async (req, res) => {
    console.log(req.body)
    const newPet = req.body
    console.log(newPet)
    Pets.create(newPet)
    res.json(newPet)
})
module.exports = router