const mongoose = require("mongoose")

const detailSchema = new mongoose.Schema({
    acceptstatus:{
        type:String,
        require:true,
        default:"รออนุมัติ"
    },
    receivestatus:{
        type:Boolean,
        require:true,
        default:false,
    },
    serialnumber:{
        type:String,
        require:true
    }
},{timestamps:true})

module.exports = mongoose.model("detail",detailSchema)
