const jwt = require("jsonwebtoken")

exports.student=async(req,res, next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.sendStatus(403)

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        if(decode.role === "Student" || decode.role === "Teacher" || decode.role === "Admin"){
            req.username = decode.username
            return next()
        }
    }catch(err){
        res.sendStatus(403)
    }
}

exports.admin=async(req,res, next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token){
        return res.status(403).json({msg : "authentication fail"})
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if(decode.role === "Admin"){
            req.username = decode.username
            return next()
        }
    }catch(err){
        res.sendStatus(403)
    }
}