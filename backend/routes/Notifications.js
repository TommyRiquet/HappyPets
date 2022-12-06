const express = require('express')
const router = express.Router()

const {Users,UsersAnnonces, UsersPropositions, PetsAnnonces, Pets, Propositions} = require("../models")


router.get("/annonces", async (req, res) => {
    
    let userid = req.query.userid ? ((req.query.userid>0 && !isNaN(req.query.userid)) ? req.query.userid : 0): 0

    await Pets.findAll({
        attributes : ["id"],
        where : {
            UserId : userid
        }
    })
    .then(async (allPetsId) => {
        await PetsAnnonces.findAll(
            {
                where : {
                    PetId : allPetsId.map((element)=>{return element.dataValues.id})
                }
            }
        )
        .then(async (allAnnoncesId) =>{
            const reponse = await UsersAnnonces.findAll(
                {
                    attributes: ['AnnonceId'],
                    where: {
                        AnnonceId: allAnnoncesId.map((element)=>{return element.dataValues.AnnonceId})
                    },
                    include: [
                        {
                            model: Users,
                            attributes: ['id','FirstName','Email','PhotoLink']
                        }
                    ]
        
                }
            )
            res.send(reponse)
        })
    })

})

router.get("/propositions", async (req, res) => {
    
    let userid = req.query.userid ? ((req.query.userid>0 && !isNaN(req.query.userid)) ? req.query.userid : 0): 0

    await Propositions.findAll({
        attributes : ["id"],
        where : {
            UserId : userid
        }
    })
    .then(async (allPropositionsId) =>{
        const reponse = await UsersPropositions.findAll(
            {
                attributes : ['PropositionId'],
                where: {
                    PropositionId: allPropositionsId.map((element)=>{return element.dataValues.id})
                },
                include: [
                    {
                        model: Users,
                        attributes: ['id','FirstName','Email','PhotoLink']
                    }
                ]
    
            }
        )
        res.send(reponse)
    })

})




router.delete("/annonces", async (req, res) => {
    let annonceid = req.query.id ? ((req.query.id>0 && !isNaN(req.query.id)) ? req.query.id : null): 0
    let userid = req.query.userid ? ((req.query.userid>0 && !isNaN(req.query.userid)) ? req.query.userid : null): 0

    console.log(annonceid, userid)
    try{
        if(annonceid !== null && userid !== null){
            await UsersAnnonces.destroy({
                where : {
                    AnnonceId : annonceid,
                    UserId : userid
                }
            })
            .then((reponse) => {
                res.sendStatus(reponse)
            })
        }
    }catch(err){console.log(err)}

})

router.delete("/propositions", async (req, res) => {
    let propositionid = req.query.id ? ((req.query.id>0 && !isNaN(req.query.id)) ? req.query.id : null): 0
    let userid = req.query.userid ? ((req.query.userid>0 && !isNaN(req.query.userid)) ? req.query.userid : null): 0

    try{
        if(propositionid !== null && userid !== null){
            await UsersPropositions.destroy({
                where : {
                    PropositionId : propositionid,
                    UserId : userid
                }
            })
            .then((reponse) => {
                res.sendStatus(reponse)
            })
        }
    }catch(err){console.log(err)}
})


module.exports = router