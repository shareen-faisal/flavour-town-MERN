const jwt = require('jsonwebtoken')

const AuthenticateUser = (req,res,next)=>{
    try{

    const authheader = req.header('Authorization')
    if(!authheader){
        return res.status(401).json({message: 'No token!'})
    }
    const token  = authheader.split(' ')[1]
    if(!token){
        return res.status(401).json({message: 'Invalid token!'})
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.userId = decoded.id
    next()
    }catch(error){
        return res.status(401).json({ message: "Invalid or expired token." });
    }
}

module.exports = AuthenticateUser