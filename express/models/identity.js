const mongoose = require('mongoose')

const indentitySchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    room:{
        type:String,
        require:true
    },
    number:{
        type:Number,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    Luserid:{
        type:String,
        require:true,
        default:''
    }
})

module.exports = mongoose.model("Identity",indentitySchema)
