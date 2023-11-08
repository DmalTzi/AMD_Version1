const  Appointment = require("../models/appointment")

exports.createAppointment= async(data) =>{
    try{
        return await Appointment.create(data)
    }catch(err){
        throw err
    }
}