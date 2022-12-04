const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const {myError} = require("../middleware/Error")
const {verifyToken} = require("../middleware/verifyToken")
const {Users,Pets} = require("../models")

router.put("/updateUser", async (req, res) => {
    const user=await Users.update({ LastName: req.body.LastName, FirstName: req.body.FirstName, City: req.body.City, Postal:req.body.Postal, Email: req.body.Email, PhotoLink: req.body.PhotoLink, ColorPhoto: req.body.ColorPhoto}, {
        where: {
            id: req.body.id
        }
      });
      res.json(200)
})



router.get("/info", async (req, res) => {
    const user = await Users.findOne({
        attributes: ['FirstName','LastName','City','Postal','Email', 'PhotoLink'],
        where: {
            id: req.query.id
        },
        include: [{
            model: Pets,
            attributes: ['Name','Type'],
        }]
    }
    )
    res.json(user)
})

router.get("/checkemail/:email", async (req, res) => {
    let existingUser = await Users.findOne({where: {Email: req.params.email}});
    if (existingUser === null) {
        res.json(true)
    } else {
        res.json(false)
    }

})

router.post("/", async (req, res) => {
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
            ConsentPolicy: req.body.ConsentPolicy
        })
        .then((user) => {
            res.json(user.id)
        })
    })
});
router.post('/login', async (req, res) => {
    try {
        //find and verify the match email/password
        const user = await Users.findOne({
            where: {Email: req.body.Email},
            attributes: ['id', 'FirstName', 'LastName','Password', 'Email','City','Postal','Phone','Role','PhotoLink', 'ColorPhoto'],
            include: [{
                model: Pets,
                attributes: ['id','Name','Type','Race','Age','Sex','Height','Weight','Behaviour','Comment','DogFriendly','CatFriendly','KidFriendly'],
            }]
        })
        if (!user) throw new myError("L'utilisateur n'existe pas", 404);

        
        const match = await bcrypt.compare(req.body.Password, user.Password);
        if (!match) throw new myError("Mauvais mot de passe", 401);

        //create token
        const token = jwt.sign({id: user.dataValues.id, Role: user.dataValues.Role}, "secret", {
            expiresIn: 60 * 60 * 24
        });
        res.json({token: token, user: user.dataValues});
    } catch (e) {
        const status = e.status || 500;
        res.status(status).json({error: e.message});
    }
});

router.get('/auth', verifyToken, async (req, res) => {
    res.json({id: req.id, Role: req.Role})
})


router.post("/image/upload", async (req,res ) => {
    let userId = req.body.userid
    try { // si y a pas de fichier
        if(!req.files) {
            res.send(404);
        } else {// si y a un fichier
            let image = req.files.profilePicture;
            image.mv('./Images/user-' + userId +'.'+ image.mimetype.split('/')[1]);
            //si l'image a bien été téléchargé, on va stocker le lien vers l'image dans la DB
            const user=await Users.update({PhotoLink: 'user-' + userId +'.'+ image.mimetype.split('/')[1]}, {
                where: {
                    id: userId
                }
              });
            //si tout s'est bien passé -> renvoi 200
            res.send(200);
        }
    } catch (error) { // en cas d'erreur
        res.status(500).send(error);
    }
  });


            
module.exports = router