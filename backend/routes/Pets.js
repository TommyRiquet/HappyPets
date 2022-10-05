const express = require('express')
const router = express.Router()
const {Pets} = require("../models")


router.get("/", async (req, res) => {
    const listOfPets = await Pets.findAll()
    res.json(listOfPets)
})

router.post("/", async (req, res) => {
    const newPet = req.body
    await Pets.create(newPet)
    res.json(newPet)
})
module.exports = router