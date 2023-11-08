const Identity = require('../models/identity')

exports.findOneIdentity=async(data)=>{
    try{
        return await Identity.findOne({"username":data})
    }catch(err){
        console.log(err)
    }
}

exports.findOneIdenAndUpdate=async({username,password,Luserid})=>{
    try{
        return await Identity.findOneAndUpdate({username},{password,Luserid},{new:true})
    }catch(err){
        console.log(err)
    }
}