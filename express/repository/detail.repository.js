const Detail = require("../models/detail")

exports.createDetail=async(data)=>{
    try{
        return await Detail.create(data)
    }catch(err){
        throw err
    }
}

exports.update=async({detail_id,acceptstatus})=>{
    try{
        return await Detail.findByIdAndUpdate(detail_id, {acceptstatus}, {new:true})
    }catch(err){
        console.log(err)
    }
}

exports.usedSerialUpdate=async(serial)=>{
    try{
        return await Detail.findOneAndUpdate({serialnumber:serial}, {receivestatus:true}, {new:true})
    }catch(err){
        throw err
    }
}

exports.getSerial=async()=> {
    serial = ''
    for (let i=0;i<5;i++){
        serial += String(Math.floor(Math.random() * 10));
    }
    return await serial
}

exports.findOneDetail = async (key,data) =>{
    return await Detail.findOne({serialnumber:data})
}