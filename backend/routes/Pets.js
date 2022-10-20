const express = require('express')
const router = express.Router()
const {Pets} = require("../models")
const multer = require("../middleware/ImagesMiddleware")


router.get("/", async (req, res) => {
    const listOfPets = await Pets.findAll()
    res.json(listOfPets)
})

router.post("/",multer.single('Image'), async (req, res) => {
    console.log(req.body)
    const newPet = req.body
    await Pets.create(newPet)
    res.json(newPet)
})
module.exports = router