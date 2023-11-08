const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    date:{
        type: String,
        require:true,
    },
    period:{
        type: String,
        require:true,
    }
},{timestamps:true})

module.exports = mongoose.model("appointment",appointmentSchema)