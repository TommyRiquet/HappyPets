const express = require('express')
const router = express.Router()
const {Users} = require("../models")
const bcrypt = require("bcryptjs")


router.get("/", async (req, res) => {
    const listOfUsers = await Users.findAll()
    res.json(listOfUsers)
})

router.post("/",async (req, res) => {
    bcrypt.hash(req.body.Password, 10).then((hash) => {
        Users.create({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Age: req.body.Age,
            Ville: req.body.Ville,
            Postal: req.body.Postal,
            Email: req.body.Email,
            Phone: req.body.Phone,
            Role: req.body.Role,
            Password: hash,
            PhotoLink: req.body.PhotoLink,
            createAt: req.body.createdAt,
            updatedAt: req.body.updatedAt
        })
        res.json('Succes')
    })
});

module.exports = router