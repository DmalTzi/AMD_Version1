const mongoose = require('mongoose')

const emergencySchema = new mongoose.Schema({
    victim_name:{
        type: String,
        require:true,
    },
    tel:{
        type: String,
        require:true,
    },
    location:{
        type: String,
        require:true,
    },
    symptom:{
        type: String,
        require:true,
    }
},{timestamps:true})

module.exports = mongoose.model("emergency",emergencySchema)