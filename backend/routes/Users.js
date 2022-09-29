const express = require('express')
const router = express.Router()
const {Users} = require("../models")


router.get("/", async (req, res) => {
    const listOfUsers = await Users.findAll()
    res.json(listOfUsers)
})

router.post("/",async (req, res) => {
    Users.create({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Age: req.body.Age,
        Adresse: req.body.Adresse,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Role: req.body.Role,
        Password: req.body.Password,
        PhotoLink: req.body.PhotoLink,
        createAt: req.body.createdAt,
        updatedAt: req.body.updatedAt});

    res.json('Succes')
})

module.exports = router