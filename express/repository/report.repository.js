const Report = require("../models/report")

exports.createReport= async(data) =>{
    try{
        return await Report.create(data)
    }catch(err){
        throw err
    }
}