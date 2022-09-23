const express = require('express')
const router = express.Router()
const {Users} = require("../models")


router.get("/", async (req, res) => {
    const listOfUsers = await Users.findAll()
    res.json(listOfUsers)
})

module.exports = router