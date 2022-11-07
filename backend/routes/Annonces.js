const express = require('express')
const {Op} = require('sequelize')
const router = express.Router()
const {Annonces,Pets,Users,PetsAnnonces} = require("../models")


router.get("/", async (req, res) => {
    /*
    *   Route initial qui retourne les 20 premières annonces
    */
    let offset = req.query.offset || 0
    let limit = req.query.limit || 20
    let typePet = req.query.typePet || ["Chien","Chat","Rongeur","Oiseau","Poisson","NAC"]
    let typeAnnonce = req.query.typeAnnonce || ["Promenade","Logement","Garde à domicile","Soins à domicile"]
    let isDogFriendly = req.query.DogFriendly==="true" || [true,false]
    let isCatFriendly = req.query.CatFriendly==="true" || [true,false]
    let isKidFriendly = req.query.KidFriendly==="true" || [true,false]


            const listOfAnnonces = await Annonces.findAll(
                {
                    limit: parseInt(limit),
                    offset: parseInt(offset),
                    where: { // Where type of annonce is in the list of type of annonce
                        Type: {
                            [Op.or]: [typeAnnonce]
                        }
                    },
                    attributes: ['Type','DateBegin','DateEnd'],
                        include: [ {
                            model:Pets,
                            attributes: ['Name','Type','Race','Sexe','Sterile','Weight','Height','DogFriendly','CatFriendly','KidFriendly'],
                            where : { //Where type of pet is in the list of typePet and isDogFriendly, isCatFriendly and isKidFriendly are equal to the value in the request
                                [Op.and]: [
                                {Type :{
                                        [Op.or]:[typePet]
                                    }
                                },
                                {
                                    [Op.and]: [
                                        {DogFriendly: isDogFriendly},
                                        {CatFriendly: isCatFriendly},
                                        {KidFriendly: isKidFriendly}
                                    ]
                                }
                                ]             
                                },
                            include: [ {
                                model:Users,
                                attributes: ['City'],
                            }]
                        }]
                }
            )
        res.json(listOfAnnonces)

  
})

router.get("/amount", async (req, res) => {
    const listOfAnnonces = await Annonces.findAll()
    res.json(listOfAnnonces.length)
})

router.get("/detailAnimal", async (req, res) => {
    const detailOfAnnonce = await Annonces.findOne(
        {   where: {id: req.query.id},
            attributes: ['Comment','Type','DateBegin','DateEnd'],
                include: [ {
                    model:Pets,
                    attributes: ['Name','Type','Race','Age','Sexe','Weight','Height'],
                    include: [ {
                        model:Users,
                        attributes: ['Firstname','City'],
                    }]
                }]
        }
    )
    res.json(detailOfAnnonce)
})

router.post("/",async (req, res) => {
    Annonces.create({
        Type: req.body.Type,
        Comment: req.body.Comment,
        DateBegin: req.body.DateBegin,
        DateEnd: req.body.DateEnd,
    }).then(annonce => {
        PetsAnnonces.create({
            PetId: req.body.PetId,
            AnnonceId: annonce.dataValues.id
        })
    })

    res.json(200)
});

router.get("/me", async(req,res) =>{
    if(req.query.offset === "0"){
        const listOfAnnonces = await Annonces.findAll(
            {
                limit: 20,
                attributes: ['DateBegin','DateEnd'],
                    include: [ {
                        model:Pets,
                        attributes: ['Name',"Type","Race","Age","Sexe","Sterile","Weight","Height"],
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
                        attributes: ['Name',"Type","Race","Age","Sexe","Sterile","Weight","Height"],
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