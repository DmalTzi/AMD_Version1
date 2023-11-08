const Emergency = require("../models/emergency")

exports.createEmergency= async(data) =>{
    try{
        return await Emergency.create(data)
    }catch(err){
        throw err
    }
}