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
        { where: { UserId: req.params.id} }
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
    try {      
        Pets.update({
            isActive: false
        }, {
            where: {
                id: req.query.id
            }
        })
        res.send(200);
    } catch (error) { // en cas d'erreur
        res.status(500).send(error);
    }
  });

router.post("/", async (req, res) => {
  const newPet = req.body;
  try {
    const pet = await Pets.create(newPet);
    res.json(pet);
  } catch (error){
        res.status(500).send
    }
});

router.post("/image/upload", async (req,res ) => {
    let petID = req.body.petID
    console.log(req.body);
    console.log(petID)
    try { // si y a pas de fichier
        if(!req.files) {
            res.send(404);
        } else {// si y a un fichier
            let image = req.files.petPicture;
            image.mv('./Images/pet-' + petID +'.'+ image.mimetype.split('/')[1]);
            //si l'image a bien été téléchargé, on va stocker le lien vers l'image dans la DB
            const pet=await Pets.update({PhotoLink: 'pet-' + petID +'.'+ image.mimetype.split('/')[1]}, {
                where: {
                    id: petID
                }
            });
            //si tout s'est bien passé -> renvoi 200
            res.send(200);
        }
    } catch (error) { // en cas d'erreur
        res.status(500).send(error);
    }
});

module.exports = router;
