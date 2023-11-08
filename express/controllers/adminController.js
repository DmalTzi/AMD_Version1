const {mergeOnePersonnelDrug, mergePersonnelsDrugs, mergePersonnelsAppointment, mergePersonnelsEmergency, mergePersonnelsReport} = require("../repository/personnel.repository")
const {update} = require("../repository/detail.repository")
const { drugExcel, downloadExcel, appointmentExcel ,reportExcel, emergencyExcel} = require("./excelController")

exports.detailPersonnel=async(req,res)=>{
    const {username} = req.params
    try{
        const findoneandmerge = await mergeOnePersonnelDrug(username)
        res.json(findoneandmerge)
    }catch(err){
        throw err
    }
}

exports.accept=async(req, res)=>{
    try{
        const {acceptstatus, detail_id} = req.body
        const detailUpdate = await update({detail_id,acceptstatus})
        res.json(detailUpdate)
    }catch(err){
        console.log(err)
    }
}

exports.unaccept=async(req, res)=>{
    try{
        const {acceptstatus, detail_id} = req.body
        const detailUpdate = await update({detail_id,acceptstatus})
        res.json(detailUpdate)
    }catch(err){
        console.log(err)
    }
}

exports.toExcel=async(req,res)=>{
    let dataTables = []
        if (req.query.msg === "drug"){
                const merge = await mergePersonnelsDrugs()
                for (let data of merge){
                    if(await drugExcel(data) !== undefined){
                        await dataTables.push(await drugExcel(data))
                    }
                }
        }
        else if (req.query.msg === "appointment"){
            const merge = await mergePersonnelsAppointment()
                for (let data of merge){
                    if(await appointmentExcel(data) !== undefined){
                        await dataTables.push(await appointmentExcel(data))
                    }
                }
        }
        else if (req.query.msg === "emergency"){
            const merge = await mergePersonnelsEmergency()
                for (let data of merge){
                    if(await emergencyExcel(data) !== undefined){
                        await dataTables.push(await emergencyExcel(data))
                    }
                }
        }
        else if (req.query.msg === "report"){
            const merge = await mergePersonnelsReport()
                for (let data of merge){
                    if(await reportExcel(data) !== undefined){
                        await dataTables.push(await reportExcel(data))
                    }
                }
        }

    res.end(await downloadExcel(dataTables))
}