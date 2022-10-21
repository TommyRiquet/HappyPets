const express = require('express')
const router = express.Router()
const {Users} = require("../models")
const bcrypt = require("bcryptjs")


router.get("/", async (req, res) => {
    const listOfUsers = await Users.findAll()
    res.json(listOfUsers)
})

router.get("/:email", async(req, res) => {
    let existingUser = await Users.findOne({ where: { Email: req.params.email } });
    if (existingUser === null) {
        res.json(true)
    }
    else{
        res.json(false)
    }
    
})

router.post("/",async (req, res) => {
    if (UserExisting(req.body.Email)){
        bcrypt.hash(req.body.Password, 10).then((hash) => {
            Users.create({
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Age: req.body.Age,
                City: req.body.City,
                Postal: req.body.Postal,
                Email: req.body.Email,
                Phone: req.body.Phone,
                Role: req.body.Role,
                Password: hash,
                PhotoLink: req.body.PhotoLink,
            })
            res.json('Succes')
        }) 
    }
});

module.exports = router