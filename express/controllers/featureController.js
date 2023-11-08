const {createAppointment} = require("../repository/appointment.repository")
const {createEmergency} = require("../repository/emergency.repositoy")
const {createReport} = require("../repository/report.repository")
const {craetePersonnel} = require("../repository/personnel.repository")
const {mergePersonnelsAppointment, mergePersonnelsEmergency, mergePersonnelsReport} = require("../repository/personnel.repository")
const { sendNotificationMessageToAdmin } = require("./lineController")

exports.appointment = async(req,res)=>{
    const {date, period} = req.body
    const appointment_field = await createAppointment({date,period})
    await craetePersonnel({username:req.username, about:"appointment", appointment_id:appointment_field})
    await sendNotificationMessageToAdmin({msg:"มีการขอเข้านัดพบ"})
    
    res.json({
        msg : "นัดหมายสำเร็จ"
    })
}

exports.emergency = async(req,res)=>{
    const {victim_name, tel, symptom, location} = req.body
    const emergency_field = await createEmergency({victim_name, tel, symptom, location})
    await craetePersonnel({username:req.username, about:"emergency", emergency_id:emergency_field})
    await sendNotificationMessageToAdmin({msg:"มีการแจ้งเหตุด่วนเข้ามา"})
    res.json({
        msg : "แจ้งเหตุด่วยสำเร็จ"
    })
}

exports.report = async(req,res)=>{
    const {topic, content} = req.body
    const report_field = await createReport({topic, content})
    await craetePersonnel({username:req.username, about:"report", report_id:report_field})
    await sendNotificationMessageToAdmin({msg:"มีการรายงานปัญหาเข้ามา"})
    res.json({
        msg : "รายงานสำเร็จ"
    })
}

exports.mergePersonnelAppointmentApi = async (req,res)=>{
    try{
        const merge = await mergePersonnelsAppointment()
        res.json(merge)
    }catch(err){
        console.log(err)
    }

}

exports.mergePersonnelEmergencyApi = async (req,res)=>{
    try{
        const merge = await mergePersonnelsEmergency()
        res.json(merge)
    }catch(err){
        console.log(err)
    }

}

exports.mergePersonnelReportApi = async (req,res)=>{
    try{
        const merge = await mergePersonnelsReport()
        res.json(merge)
    }catch(err){
        console.log(err)
    }

}