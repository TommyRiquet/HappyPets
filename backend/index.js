const express = require("express")
const app = express()

const cors = require('cors')
require("dotenv").config();
const PORT = process.env.PORT || 3001

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
//date d'expiration de la session et du token
const expireTime = 60 * 60 * 24

app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true //permet d'activer les cookies
}))

app.use(session({
    key: "userId",
    secret: "foo",
    resave: false,
    saveUninitialised: true,
    cookie: {
        expires: expireTime
    },
}))
const db = require('./models')

// Routers
const UserRouter = require('./routes/Users')
app.use("/users", UserRouter)

const PetsRouter = require('./routes/Pets')
app.use("/pets", PetsRouter)

const AnnoncesRouter = require('./routes/Annonces')
app.use("/annonces", AnnoncesRouter)

const propositionRouter = require('./routes/Propositions')
app.use("/propositions", propositionRouter)

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });
}).catch((err) => {
    console.log(err)
})