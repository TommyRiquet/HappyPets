const express = require('express')
const router = express.Router()
const {Users} = require("../models")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const {myError} = require("../middleware/Error")
const {verifyToken} = require("../middleware/verifyToken")

router.get("/", async (req, res) => {
    const listOfUsers = await Users.findAll()
    res.json(listOfUsers)
})

router.post("/", async (req, res) => {
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


router.post('/login', async (req, res) => {
    try {
        //find and verify the match email/password
        const user = await Users.findOne({where: {Email: req.body.Email}})
        if (!user) throw new myError("L'utilisateur n'existe pas", 404);

        const match = await bcrypt.compare(req.body.Password, user.Password);
        if (!match) throw new myError("Mauvais mot de passe", 401);

        //create session
        req.session.user = user.dataValues;
        //create token
        const id = user.dataValues.id
        const token = jwt.sign({id}, "secret", {
            expiresIn: 60 * 60 * 24
        });

        res.json({loggedIn: true, token: token, user: user.dataValues});
    } catch (e) {
        const status = e.status || 500;
        res.status(status).json({error: e.message});
    }
});


router.get('/login', async (req, res) => {
    console.log(req.session)
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user})
    } else {
        res.send({loggedIn: false})
    }
})

router.get('/isAuth', verifyToken, (req, res) => {
    res.send("User is authenticated")
})

module.exports = router