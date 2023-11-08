const XLSX = require("xlsx")

exports.downloadExcel = async (data)=>{
    const writeSheet = XLSX.utils.json_to_sheet(data)
    const writeBook = XLSX.utils.book_new()

    await XLSX.utils.book_append_sheet(writeBook, writeSheet, "Sheet1")

    return excelData = await XLSX.write(writeBook, {bookType: "xlsx", type: "buffer"})

}

exports.drugExcel=async(mergedata)=>{
    if (mergedata.detailInfo && mergedata.detailInfo.length > 0) {
        try {
            const datas = {
                "วันที่": new Date(mergedata.detailInfo[0].createdAt).toLocaleDateString().slice(0,10),
                "เวลา": new Date(mergedata.detailInfo[0].createdAt).toTimeString().slice(0,8),
                "ยูสเซอร์เนม": mergedata.username,
                "ชื่อ-นามสกุล": mergedata.usernameInfo[0].name,
                "ชั้น": `${mergedata.usernameInfo[0].room[0]}/${mergedata.usernameInfo[0].room[2]}`,
                "เลขที่": mergedata.usernameInfo[0].number,
                "เพศ": mergedata.usernameInfo[0].gender,
                "อายุ": mergedata.drugInfo[0].age,
                "น้ำหนัก": mergedata.drugInfo[0].weight,
                "อาการ": mergedata.drugInfo[0].symptom,
                "ระดับความปวด": mergedata.drugInfo[0].painlv,
                "อาการที่เกิดร่วมนอกจากอาการปวด": mergedata.drugInfo[0].cosymptom,
                "มีประวัติการแพ้ยาพาราเซตามอลหรือไม่": mergedata.drugInfo[0].allergic,
                "เป็นโรคตับหรือโรคไตหรือไม่": mergedata.drugInfo[0].relevant,
                "ประวัติการรับประทานยาพาราเซตามอนหลังจากปวด": mergedata.drugInfo[0].eatenago,
                "สถานะการอนุมัติ": mergedata.detailInfo[0].acceptstatus,
                "สถานการรับยา": recive = mergedata.detailInfo[0].receivestatus === true ? "รับแล้ว":"ยังไม่ได้รับ",

            };
                return await datas
        } catch (err) {
            throw err;
        }
    }
}

exports.appointmentExcel = async (mergedata) =>{
    if (mergedata.appointmentInfo && mergedata.appointmentInfo.length > 0) {
        try{
            const datas = {
                "วันที่": new Date(mergedata.appointmentInfo[0].createdAt).toLocaleDateString().slice(0, 10),
                "เวลา": new Date(mergedata.appointmentInfo[0].createdAt).toTimeString().slice(0, 8),
                "ยูสเซอร์เนม": mergedata.username,
                "ชื่อ-นามสกุล": mergedata.usernameInfo[0].name,
                "ชั้น": `${mergedata.usernameInfo[0].room[0]}/${mergedata.usernameInfo[0].room[2]}`,
                "เลขที่": mergedata.usernameInfo[0].number,
                "เพศ": mergedata.usernameInfo[0].gender,
                "วันที่นัด": new Date(mergedata.appointmentInfo[0].date).toLocaleDateString(),
                "คาบที่นัด": mergedata.appointmentInfo[0].period
            };
            return await datas
        }catch(err){
            throw err
        }
    }
}

exports.reportExcel = async (mergedata) =>{
    if (mergedata.reportInfo && mergedata.reportInfo.length > 0) {
        try{
            const datas = {
                "วันที่": new Date(mergedata.reportInfo[0].createdAt).toLocaleDateString().slice(0, 10),
                "เวลา": new Date(mergedata.reportInfo[0].createdAt).toTimeString().slice(0, 8),
                "ยูสเซอร์เนม": mergedata.username,
                "ชื่อ-นามสกุล": mergedata.usernameInfo[0].name,
                "ชั้น": `${mergedata.usernameInfo[0].room[0]}/${mergedata.usernameInfo[0].room[2]}`,
                "เลขที่": mergedata.usernameInfo[0].number,
                "เพศ": mergedata.usernameInfo[0].gender,
                "เจอปัญหาส่วนไหน": mergedata.reportInfo[0].topic,
                "อาการของปัญหา": mergedata.reportInfo[0].content
            };
            return await datas
        }catch(err){
            throw err
        }
    }
}

exports.emergencyExcel = async (mergedata) =>{
    if (mergedata.emergencyInfo && mergedata.emergencyInfo.length > 0) {
        try{
            const datas = {
                "วันที่": new Date(mergedata.emergencyInfo[0].createdAt).toLocaleDateString().slice(0, 10),
                "เวลา": new Date(mergedata.emergencyInfo[0].createdAt).toTimeString().slice(0, 8),
                "ยูสเซอร์เนม": mergedata.username,
                "ชื่อ-นามสกุล": mergedata.usernameInfo[0].name,
                "ชั้น": `${mergedata.usernameInfo[0].room[0]}/${mergedata.usernameInfo[0].room[2]}`,
                "เลขที่": mergedata.usernameInfo[0].number,
                "เพศ": mergedata.usernameInfo[0].gender,
                "ชื่อ-นามสกุลผู้ประสบเหตุ": mergedata.emergencyInfo[0].victim_name,
                "เบอร์โทรติดต่อ": mergedata.emergencyInfo[0].tel,
                "สถานที่เกิดเหตุ": mergedata.emergencyInfo[0].location,
                "อาการของผู้ประสบเหตุ": mergedata.emergencyInfo[0].symptom,
            };
            return await datas
        }catch(err){
            throw err
        }
    }
}