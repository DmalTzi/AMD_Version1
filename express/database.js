require("dotenv").config()
const mongoose = require('mongoose')

exports.connect = async() =>{
    let config = {
        useNewUrlParser:true,
        useUnifiedTopology:false,   
    }
    try{
        return await mongoose.connect(process.env.DB_URL,{dbName:"amd_database"}, config)
    }catch(err){
        console.log(err)
    }
}

exports.disconnect = () =>{
    return mongoose.disconnect()
}
