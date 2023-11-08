const mongoose = require('mongoose')

const drugSchema = new mongoose.Schema({
    age:{
        type:Number,
        require:true
    },
    weight:{
        type:Number,
        require:true
    },
    symptom:{
        type:String,
        require:true
    },
    painlv:{
        type:String,
        require:true
    },
    cosymptom:{
        type:String,
        require:true
    },
    allergic:{
        type:String,
        require:true
    },
    relevant:{
        type:String,
        require:true
    },
    eatenago:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("drug",drugSchema)