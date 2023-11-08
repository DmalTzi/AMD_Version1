const Personnel = require("../models/personnel")

exports.craetePersonnel = async(data) =>{
    try{
        return await Personnel.create(data)
    }catch(err){
        throw err
    }
}

exports.findOnePerson = async(data)=>{
    try{
        return await Personnel.findOne({"detail_id":data})
    }catch(err){
        console.log(err)
    }
    
}

exports.mergeOnePersonnelDrug=async(data)=>{
    try{
       const merge = await Personnel.aggregate([
            {
                $match: {
                username: data,
                },
            },
            {
                $lookup:{
                    from:"identities",
                    localField: "username",
                    foreignField: "username",
                    as: "usernameInfo"
                },
                
            },
            {
                $lookup:{
                    from:"drugs",
                    localField: "drug_id",
                    foreignField: "_id",
                    as: "drugInfo"
                },
                
            },
            {
                $lookup:{
                    from:"details",
                    localField: "detail_id",
                    foreignField: "_id",
                    as: "detailInfo"
                },
                
            },
        ])
        return await merge
    }catch(err){
        console.log(err)
    }
}

exports.mergePersonnelsDrugs=async()=>{
    try{
       const merge = await Personnel.aggregate([
            {
                $lookup:{
                    from:"identities",
                    localField: "username",
                    foreignField: "username",
                    as: "usernameInfo"
                },
                
            },
            {
                $lookup:{
                    from:"drugs",
                    localField: "drug_id",
                    foreignField: "_id",
                    as: "drugInfo"
                },
                
            },
            {
                $lookup:{
                    from:"details",
                    localField: "detail_id",
                    foreignField: "_id",
                    as: "detailInfo"
                },
                
            },
        ])
        return await merge
    }catch(err){
        console.log(err)
    }
}

exports.mergePersonnelsEmergency=async()=>{
    try{
        const merge = await Personnel.aggregate([
             {
                 $lookup:{
                     from:"identities",
                     localField: "username",
                     foreignField: "username",
                     as: "usernameInfo"
                 },
                 
             },
             {
                 $lookup:{
                     from:"emergencies",
                     localField: "emergency_id",
                     foreignField: "_id",
                     as: "emergencyInfo"
                 },
                 
             },
         ])
         return await merge
     }catch(err){
         console.log(err)
     }
}

exports.mergePersonnelsAppointment=async()=>{
    try{
        const merge = await Personnel.aggregate([
             {
                 $lookup:{
                     from:"identities",
                     localField: "username",
                     foreignField: "username",
                     as: "usernameInfo"
                 },
                 
             },
             {
                 $lookup:{
                     from:"appointments",
                     localField: "appointment_id",
                     foreignField: "_id",
                     as: "appointmentInfo"
                 },
                 
             },
         ])
         return await merge
     }catch(err){
         console.log(err)
     }
}

exports.mergePersonnelsReport=async()=>{
    try{
        const merge = await Personnel.aggregate([
             {
                 $lookup:{
                     from:"identities",
                     localField: "username",
                     foreignField: "username",
                     as: "usernameInfo"
                 },
                 
             },
             {
                 $lookup:{
                     from:"reports",
                     localField: "report_id",
                     foreignField: "_id",
                     as: "reportInfo"
                 },
                 
             },
         ])
         return await merge
     }catch(err){
         console.log(err)
     }
}