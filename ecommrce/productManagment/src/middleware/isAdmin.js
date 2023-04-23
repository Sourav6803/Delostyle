const userModel = require("../models/userModel")


const isAdmin = async(req,res,next)=>{
    const {email} = req.userId
    const adminUser = await userModel.findOne({email : email})
    if(adminUser.role !== "admin") {
        return  res.send(400).send({msg: 'Yor r not a dmin'})
    }else{
        next()
    }
} 

module.exports.isAdmin = isAdmin