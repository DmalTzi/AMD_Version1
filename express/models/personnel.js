const mongoose = require('mongoose')

const personnelSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    about:{
        type: String,
        require:true
    },
    drug_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'drug',
    },
    detail_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"detail",
    },
    appointment_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"appointment"
    },
    emergency_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"emergency"
    },
    report_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"report"
    }
})

module.exports = mongoose.model("Personnel",personnelSchema)