export const appointment_line_msg_user=async()=>{
    return await "คุณครูได้ทราบเรื่องแล้ว\nกรุณาไปให้ตรงตามเวลานัดด้วยนะคะ ^3^"
}

export const appointment_line_msg_admin=async()=>{
    return await " "
}

export const emergency_line_msg_user=async()=>{
    return await "คุณครูได้รับแจ้งเหตุด่วนแล้ว\nจะรีบติดต่อกลับโดยเร็วที่สุดนะคะ!!!" 
}

export const painform_line_msg_user=async()=>{
    return await "คุณครูได้ทราบเรื่องการขอรับยาเรียบร้อยแล้ว\nกรุณารอการยืนยันจากคุณครูสักครู่นะคะ..."
}

export const report_line_msg_user=async()=>{
    return await "ทางผู้พัฒนาได้รับข้อความแล้ว\nขอบคุณสำหรับการรายงานปัญหานะคะ\nจะรีบแก้ไขให้เร็วที่สุดเลย >< <3"
}

export const pain_unaccept_line_msg_user=async()=>{
    return await `การขอรับยา"ไม่ถูกอนุมัติ"\nให้เลือกเมนู\n>>>ขอพบครู<<<\nเพื่อเข้ามารับยาภายในวันนี้`
}

export const pain_accept_line_msg_user=async(name, serial, Typesymptom, Capsymptom)=>{
    console.log( Typesymptom,  Capsymptom)
    return await ``
}