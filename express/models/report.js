const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    topic:{
        type: String,
        require:true,
    },
    content:{
        type: String,
        require:true,
    }
},{timestamps:true})

module.exports = mongoose.model("report",reportSchema)