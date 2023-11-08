const {findOneIdentity,findOneIdenAndUpdate} = require("../repository/identity.repository")
const line = require("@line/bot-sdk")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const config = {
    channelAccessToken:process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret:process.env.CHANNEL_SECRET
}

const client = new line.Client(config)


const checkRole = async(role,Luserid)=>{
    if(role === "13829" || role === "T029"){
        await client.linkRichMenuToUser(Luserid, process.env.ADMIN_MAIN_RICH)
        return await "Admin"
    }
    else if(role[0] === "T"){
        await client.linkRichMenuToUser(Luserid, process.env.MAIN_RICH)
        return await "Teacher"
    }else{
        await client.linkRichMenuToUser(Luserid, process.env.MAIN_RICH)
        return await "Student"
    }

}

exports.firstlogin=async(req,res)=>{
    const {username,password,Luserid,newpassword} = req.body
    try{
        const findiden = await findOneIdentity(username)
        if(findiden == null){
            res.status(200).json("username is not correct")
        }
        else if(findiden.password === password || await bcrypt.compare(password, findiden.password)){
            const hash = await bcrypt.hash(String(newpassword), Number(process.env.SALT))
            await findOneIdenAndUpdate({username, password:hash, Luserid})

            const token = jwt.sign({username, role: await checkRole(username,Luserid) }, process.env.JWT_SECRET, { expiresIn: '30 days' })

            res.status(200).json({
                username,noti:`password is correct`,
                token
            })
        }else{
            res.json({
                noti:"รหัสไม่ถูกต้อง"
            })
        }
    }catch(err){
        console.log(err)
    }
}

exports.login=async(req,res)=>{
    const {username,password,Luserid} = req.body
    try{
        const findiden = await findOneIdentity(username)
        if(findiden == null){
            return res.status(401).json("username is not correct")
        }
        
        const match = await bcrypt.compare(password, findiden.password)

        if(!match){ return res.status(401).json({noti:"password is not correct"})}

        const token = jwt.sign({username, role: await checkRole(username, Luserid) }, process.env.JWT_SECRET, { expiresIn: '30 days' })

        await findOneIdenAndUpdate({username, Luserid})

        res.status(200).json({
            username,noti:`password is correct`,
            token
        })

    }catch(err){
        console.log(err)
        res.status(401).json({noti:"password is not correct"})
    }
}

exports.logout=async(req, res)=>{
    try{
        const logout = await findOneIdentity(req.username)
        await client.linkRichMenuToUser(logout.Luserid, process.env.LOGIN_RICH)
        await findOneIdenAndUpdate({username:req.username})
        res.status(200).send({msg:"logout success"})
    }catch{
        res.status(404).send({msg:"Not found"})
    }
}

exports.sendMessageToUser=async(req,res)=>{
    const {msg } = req.body
    try{
        const result = await findOneIdentity(req.username)
        const Luserid = result.Luserid
        await client.pushMessage(to=Luserid,
            {
                type:"text",
                text:msg
            })
    }catch{
        res.status(401)
    }
    res.json({
        status:"success"
    })
}

exports.sendMessageToUserByAdmin=async(req,res)=>{
    const {msg, username} = req.body
    try{
        const result = await findOneIdentity(username)
        const Luserid = result.Luserid
        await client.pushMessage(to=Luserid,
            {
                type:"text",
                text:msg
            })
    }catch{
        res.status(401)
    }
    res.json({
        status:"success"
    })
}

exports.sendNotificationMessageToAdmin=async({msg})=>{
        await client.pushMessage(to=process.env.MAIN_ADMIN_LINE_ID,{
            type:"text",
            text:msg
        })
    }