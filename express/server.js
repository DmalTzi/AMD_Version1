require("dotenv").config()
PORT = process.env.PORT || 8080
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const path = require('path');
const database = require('./database')
const drugRoute = require("./routes/drug")
const userRoute = require("./routes/user")
const adminRoute = require("./routes/admin")

app = express()
app.use(express.static(path.join(__dirname,'build')));
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api', drugRoute)
app.use('/api', userRoute)
app.use('/api', adminRoute)

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const startServer=async()=>{
    try{
        await database.connect()
        app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`)})
    }catch(err){
        console.log(err)
    }
    
}

startServer()