const jwt = require('jsonwebtoken')

//middleware
const authed = (req,res,next) => {
    const tkn = req.header('auth-token')
    if(!tkn) return res.status(403).send("Acces denined")
    try {
        const verif = jwt.verify(tkn,process.env.PAYLOAD)
        verif ? next() : res.status(400).send("Verification failed")
    } catch (err) { 
        res.status(400).send("Invalid Token")
    }
}

module.exports = authed