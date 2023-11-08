const  Drug = require("../models/drug")

exports.createDrug= async(data) =>{
    try{
        return await Drug.create(data)
    }catch(err){
        throw err
    }
}