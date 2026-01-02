const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next)=>{
    const authToken = req.headers.authorization
    console.log("what i will see",authToken)
    if (!authToken ) {
        return res.status(401).json({message: "Need to login"})
    }
    const token = authToken.split(" ")[1]
    const decode = jwt.verify(token, process.env.SECRET_KEY)
    console.log("this is decode",decode)
    req.user = decode
    next()
}

module.exports = verifyToken