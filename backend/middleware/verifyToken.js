const jwt = require("jsonwebtoken");
const myError = require("../middleware/Error")
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers["access-token"];
        if (!token) throw new myError("No token provided", 400);
        jwt.verify(token, "secret", (err, decoded) => {
            if (err) throw new myError("Wrong token", 400);
            req.userId = decoded.id;
            next();
        })
    } catch (e) {
        const status = e.status || 500;
        res.status(status).json({error: e.message});
    }
}

module.exports = {verifyToken}