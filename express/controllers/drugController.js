const {createDrug} = require("../repository/drug.repository")
const {createDetail, getSerial, findOneDetail, usedSerialUpdate} = require("../repository/detail.repository")
const {craetePersonnel, mergePersonnelsDrugs, findOnePerson, mergeOnePersonnelDrug} = require("../repository/personnel.repository")
const { sendNotificationMessageToAdmin } = require("./lineController")

const check_symptom = async (id,serialnumber)=>{
        let symptom
        const find_person = await findOnePerson(id) // find main field to aggregate
        const merge = await mergeOnePersonnelDrug(find_person.username) //aggregate field
        let i = 0;
        while( i< merge.length){
            if (merge[i].about === "drug"){
                if (merge[i].detailInfo[0].serialnumber == serialnumber){  //check serial in merge is same serialnumber
                    symptom = merge[i].drugInfo[0].symptom
                    break
                }
            }
            i++
        }
        return await symptom
}


exports.update_drug_para = async (req,res)=>{
    const {age, weight, symptom, painlv, cosymptom, allergic, relevant, eatenago} = req.body
    try{
        const drug = await createDrug({age, weight, symptom, painlv, cosymptom, allergic, relevant, eatenago})
        const detail = await createDetail({serialnumber:await getSerial()})
        await sendNotificationMessageToAdmin({msg:"มีการขอรับยาเข้ามา"})
        await craetePersonnel({username:req.username,about:"drug",drug_id:drug._id,detail_id:detail._id})
        res.json({
            message:"ทำการขอยาเรียบร้อย"
        })
    }catch(err){
        res.json({
            err:err
        })
    }
}

exports.mergePersonnelApi = async (req,res)=>{
    try{
        const merge = await mergePersonnelsDrugs()
        res.json(merge)
    }catch(err){
        console.log(err)
    }

}


exports.findSerial = async (req,res)=>{
    try{
        let acc_sta
        let recv_sta
        let sym

        const find_serial = await findOneDetail('serialnumber',req.body.serial) //find detail by serial
        if(find_serial){
            const {acceptstatus, receivestatus, _id} = find_serial // deconstruction
            const symptom = await check_symptom(_id,req.body.serial) // check symptom in function
    
            if (acceptstatus === "ไม่อนุมัติ") {acc_sta = 0}
            else if (acceptstatus === "รออนุมัติ") {acc_sta = 2}
            else if (acceptstatus === "อนุมัติ") {acc_sta = 1}
    
            if (receivestatus === false) {recv_sta = 0}
            else if (receivestatus === true) {recv_sta = 2}
    
            if (symptom === "ปวดหัว"){sym = 0}
    
            res.json({
                sendby : acc_sta,
                sendstatus : recv_sta,
                symptom : sym
            })
        }else{
            res.status(400).json({Error : "notfound"})
        }
    }catch(err){
        throw err
    }
}


exports.usedSerial = async (req,res)=>{
    try{
        const used_serial = await usedSerialUpdate(req.body.serial)
        res.json(used_serial)
    }catch(err){
        console.log(err)
    }
}

