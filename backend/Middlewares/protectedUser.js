const AdminProtect = async(req, res, next)=>{
    if(!req.user){
        return res.status(401).json({message: "No valid token for Authorization"})
    }
    if(!req.user.isAdmin){
        return res.status(403).json({message: "Forbidden access, access denied"})
    }
    next()
}

module.exports = AdminProtect