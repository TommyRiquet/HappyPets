const express = require("express");
const router = express.Router();
const { Pets, PetsAnnonces } = require("../models");

router.get("/", async (req, res) => {
    const listOfPets = await Pets.findAll()
    res.json(listOfPets)
})

router.get("/info/:id", async (req, res) => {
    let id = req.params.id || 0

    const pets = await Pets.findAll(
        { where: { UserId: req.params.id } }
    )
    res.json(pets)
})

router.get("/hasAnnonce", async (req, res) => {
    let id = req.query.id

    const pets = await PetsAnnonces.findAll(
        { where: { PetId: id } }
    )
    if (pets.length == 0) {
        res.json(false)
    }
    else {
        res.json(true)
    }
})

router.get("/deleteAnimal", async (req, res) => {

    const pets = await Pets.destroy(
        { where: { id: req.query.id } }
    )
    res.send(200);

})

router.post("/", async (req, res) => {
    console.log(req.body);
    const newPet = req.body;
    console.log(newPet);
    Pets.create(newPet);
    res.json(newPet);
});
module.exports = router;
