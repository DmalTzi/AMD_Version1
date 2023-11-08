import { useState,useEffect } from "react";
import NavbarComponent from "./../layouts/NavbarComponent.js"
import FooterComponent from "./../layouts/FooterComponent.js"
import {useLocation, Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2"
import axios from "axios"
import { authToken } from "../../services/authorize.js";
import { pain_unaccept_line_msg_user } from "../../services/linemsg.js";

const SingleDrugDetailComponent = () =>{
    document.title = "ข้อมูลการขอยารายบุคล"
    const propsData = useLocation().state
    const navigate = useNavigate()
    const [datas, setDatas] = useState([])

    const checkDrugBySymptom =async(symptom)=>{
      try{
        if (symptom === "ปวดหัว"){return "พาราเซตามอล"}
        else if (symptom === "มีไข้"){return "ยา1"}
        else if (symptom === "ท้องเสีย"){return "ยา2"}
        else if (symptom === "ลมพิษ/แพ้"){return "ยา3"}
        else if (symptom === "ปวดประจำเดือน"){return "ยา4"}
      }catch(err){
        throw err
      }
    }

    const checkDrugTypeBySymptom = async(symptom)=>{
      try{
        if (symptom === "ปวดหัว"){return " 1"}
        else if (symptom === "มีไข้"){return " 1"}
        else if (symptom === "ท้องเสีย"){return " 2"}
        else if (symptom === "ลมพิษ/แพ้"){return " 3"}
        else if (symptom === "ปวดประจำเดือน"){return " 4"}
      }catch(err){
        throw err
      }
    }

    const unaccept = async(detail_id,username) =>{
      try{
        const alert_accpet = await Swal.fire({title:'คุณต้องการที่จะกด \n"ไม่อนุมัติ" \nใช่หรือไม่', icon:"warning", showCancelButton:true})
        if (alert_accpet.isConfirmed){
          await axios.put(`${process.env.REACT_APP_API}/detail/unaccept/${detail_id}`,{acceptstatus:"ไม่อนุมัติ",detail_id},{
            headers:{
              'authorization':`Bearer ${await authToken()}`
          }
          })
          const send = await Swal.fire("แจ้งเตือน","ไม่อนุมัติเรียบร้อย","success")
          if (send.isConfirmed){
            navigate('/admin/drug', { replace: true })
            await axios.post(`${process.env.REACT_APP_API}/send/line/msg/admin`,
            {
              msg: await pain_unaccept_line_msg_user() ,
              username
            },
            {
              headers:{
                'authorization':`Bearer ${await authToken()}`
              }
            })
          }
        }
      }catch(err){
        throw err
      }
    }

    const accept = async(detail_id,serial,name,username,symptom) =>{
      try{
        const alert_accpet = await Swal.fire({title:'คุณต้องการที่จะกด \n"อนุมัติ" \nใช่หรือไม่', icon:"warning", showCancelButton:true})
        if (alert_accpet.isConfirmed){
          await axios.put(`${process.env.REACT_APP_API}/detail/accept/${detail_id}`,{acceptstatus:"อนุมัติ",detail_id},{
            headers:{
              'authorization':`Bearer ${await authToken()}`
          }
          })
          const send = await Swal.fire("แจ้งเตือน","อนุมัติเรียบร้อย","success")
          if (send.isConfirmed){
            navigate('/admin/drug', { replace: true })
            await axios.post(`${process.env.REACT_APP_API}/send/line/msg/admin`,{
              msg: `${name} \nรหัสของคุณคือ : ${serial} \nชนิดของยาคือ : ${await checkDrugBySymptom(symptom)} \nตลับยาหมายเลข : ${ await checkDrugTypeBySymptom(symptom) } \nสามารถนำรหัสไปกดยาได้ที่ \nตู้กดยาอัจฉริยะหน้าห้องพยาบาล \nเมื่อกดเสร็จแล้วกรุณาคืนตลับยา`,
              username
            },
            {
              headers:{
                'authorization':`Bearer ${await authToken()}`
            }
            }
            )
          }
        }
      }catch(err){
        throw err
      }
    }

    const roleCheck =(role) =>{
      return role[0] === "T" ? true : false
    }

    const checkStatus = (statue) => {
      return statue === "รออนุมัติ"
    }

    const aboutCheck =  (about)=>{
      return about === "drug" ? true : false
  }

    useEffect(()=>{
      const FindOneData=async()=>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API}/detail/${propsData}`,{
              headers:{
                'authorization':`Bearer ${await authToken()}`
            }
            })
            setDatas(response.data)
        }catch(err){
          const send = await Swal.fire("แจ้งเตือน","คุณไม่มีสิทธิ์เข้าถึงข้อมูลส่วนนี้","error")
          if (send.isConfirmed) return navigate("/login")
        }
    }
      FindOneData()
      // eslint-disable-next-line
    },[])

  return (
    <div>

      <NavbarComponent/>
      <div className="mycontainer flex-column-reverse p-2 mt-5 pb-5">
      {datas.map((data)=>(
        <div className="row w-75 card-info">
        {aboutCheck(data.about)?
        <div className="p-3">
          <div>
            {roleCheck(data.username) ?
            <h5 style={{borderBottom:"1px solid silver", color:"black"}}>{data.usernameInfo[0].username}, {data.usernameInfo[0].name}</h5>
            :
            <h5 style={{borderBottom:"1px solid silver", color:"black"}}>{data.usernameInfo[0].username}, {data.usernameInfo[0].name}, ชั้น {data.usernameInfo[0].room[0]}/{data.usernameInfo[0].room[2]}, เลขที่ {data.usernameInfo[0].number}</h5>
          }
            <div className="sub-info">
              <p className="m-0">อายุ : {data.drugInfo[0].age}</p>
              <p className="m-0">น้ำหนัก : {data.drugInfo[0].weight}</p>
              <p className="m-0">อาการ : {data.drugInfo[0].symptom}</p>
              <p className="m-0">ระดับความปวด : {data.drugInfo[0].painlv}</p>
              <p className="m-0">อาการที่เกิดร่วมนอกจากอาการปวด : {data.drugInfo[0].cosymptom}</p>
              <p className="m-0">มีประวัติการแพ้ยาพาราเซตามอลหรือไม่ : {data.drugInfo[0].allergic}</p>
              <p className="m-0">เป็นโรคตับหรือโรคไต หรือไม่ : {data.drugInfo[0].relevant}</p>
              <p className="m-0">ก่อนหน้านี้ได้ทานยาพาราเซตามอลมาแล้วกี่ชั่วโมง : {data.drugInfo[0].eatenago}</p>
              <p className="m-0">สถานการรับยา : {`${data.detailInfo[0].receivestatus}`}</p>
              <p className="m-0">สถานะการอนุมัติ : {data.detailInfo[0].acceptstatus}</p>
              <p className="m-0">Serial Number : {data.detailInfo[0].serialnumber}</p>
            </div>
            <p className="sub-info-time">{new Date(data.detailInfo[0].createdAt).toLocaleString()}</p>
           </div>
          {checkStatus(data.detailInfo[0].acceptstatus) && 
            <div className="d-flex justify-content-center flex-column">
              <Link className="btn btn-outline-success " onClick={()=>accept(data.detail_id, data.detailInfo[0].serialnumber, data.usernameInfo[0].name,data.username, data.drugInfo[0].symptom)}>อนุมัติ</Link>
              <Link className="btn btn-outline-danger mt-3" onClick={()=>unaccept(data.detail_id,data.username)}>ไม่อนุมัติ</Link>
            </div>}
        </div>
        :null}
        </div>
      ))}
      <FooterComponent/>
      </div>

    </div>
  );
}

export default SingleDrugDetailComponent