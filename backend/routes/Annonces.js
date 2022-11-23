const express = require('express')
const {Op} = require('sequelize')
const router = express.Router()
const {Annonces,Pets,Users,PetsAnnonces} = require("../models")


router.get("/", async (req, res) => {
    /*
    *   Route initial qui retourne les 20 premières annonces
    *  @return {Array} - Tableau d'annonces
    *  
    * @query {Number} limit - Nombre d'annonces à retourner
    * @query {Number} offset - Nombre d'annonces à sauter
    * @query {String} typePet - Recherche par type d'animal
    * @query {String} typeAnnonce - Recherche par type d'annonce
    * @query {String} DogFriendly - Recherche par appréciation de l'animal pour les autres chiens
    * @query {String} CatFriendly - Recherche par appréciation de l'animal pour les autres chats
    * @query {String} KidFriendly - Recherche par appréciation de l'animal pour les enfants
    */
   
    let offset = req.query.offset || 0
    let limit = req.query.limit ? ((req.query.limit>0 && !isNaN(req.query.limit)) ? req.query.limit : 0): 20
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
                    attributes: ['id','Type','DateBegin','DateEnd'],
                        include: [ {
                            model:Pets,
                            attributes: ['Name','Type','Race','Sex','Sterile','Weight','Height','DogFriendly','CatFriendly','KidFriendly'],
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

router.get("/detailAnnonce", async (req, res) => {
    const id = req.query.id<=0 || isNaN(parseInt(req.query.id)) ? 1 : req.query.id

    const detailOfAnnonce = await Annonces.findOne(
        {   where: {id: id},
            attributes: ['id','Comment','Type','DateBegin','DateEnd'],
                include: [ {
                    model:Pets,
                    attributes: ['id','Name','Type','Race','Age','Sex','Weight','Height','Comment','DogFriendly','CatFriendly','KidFriendly'],
                    include: [ {
                        model:Users,
                        attributes: ['id','Firstname','City'],
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
    let id = (req.query.id>0 && !isNaN(req.query.id)) ? req.query.id: 0

    const listOfAnnonces = await Annonces.findAll(
        {
            attributes: ['id','Type','DateBegin','DateEnd'],
                include: [ {
                    model:Pets,
                    attributes: ['Name','Type','Race','Sex','Sterile','Weight','Height','DogFriendly','CatFriendly','KidFriendly'],
                    where : { 
                        UserId: id
                    }
                }]
        }
    )

    res.json(listOfAnnonces)
    
})



router.put('/updateAnnonce', async (req, res) => {
    Annonces.update({
        Type: req.body.Type,
        Comment: req.body.Comment,
        DateBegin: req.body.DateBegin,
        DateEnd: req.body.DateEnd,
    }, {
        where: {
            id: req.body.id
        }
    })

    PetsAnnonces.destroy({
        where: {
            AnnonceId: req.body.id
        }
    }).then(() => {
        req.body.Pets.forEach(pet => {
        PetsAnnonces.create({
            PetId: pet.id,
            AnnonceId: req.body.id
            })
        })
    })  

    res.json(200)
})


module.exports = router