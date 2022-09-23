const express = require("express")
const app = express()
const cors = require('cors')
require("dotenv").config();
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors())

const db = require('./models')

// Routers
const userRouter = require('./routes/Users')
app.use("/users", userRouter)

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });
}).catch((err) => {
    console.log(err)
})