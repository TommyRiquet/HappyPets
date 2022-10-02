const express = require('express')
const router = express.Router()
const {Pets} = require("../models")


router.get("/", async (req, res) => {
    const listOfPets = await Pets.findAll()
    res.json(listOfPets)
})

module.exports = router