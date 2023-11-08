import { useState,useEffect } from "react";
import NavbarComponent from "./../layouts/NavbarComponent.js"
import FooterComponent from "./../layouts/FooterComponent.js"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"
import { authToken } from "./../../services/authorize.js";

const AdminAppointmentComponent = () =>{

    document.title = "ข้อมูลการขอนัดหมาย"
    const navigate = useNavigate()

    const [datas, setDatas] = useState([])

    const fetchData=async()=>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API}/merge/appointment`,{
                headers:{
                    'authorization':`Bearer ${await authToken()}`
                }
            })
            console.log(response)
            if (response.status === 200) await setDatas(response.data);
        }catch(err){
          const send = await Swal.fire("แจ้งเตือน","คุณไม่มีสิทธิ์เข้าถึงข้อมูลส่วนนี้","error")
          if (send.isConfirmed) return navigate("/login")
        }
    }

    const roleCheck =  (role) =>{
        if(role !== undefined){
            return  role[0] === "T" ? true : false
        }
    }

    const aboutCheck =  (about)=>{
        return  about === "appointment" ? true : false
    }

    useEffect(()=>{
        fetchData()
    },[])

    return (
        <div>
        <NavbarComponent/>
          <div className="mycontainer p-2 flex-column-reverse mt-5 pb-5">
          {datas.map((data,index)=>(
              <Link  className="mycontainer-select w-75" to={`#`} style={{ textDecoration: 'none' }}  state={`${data.username}`}>
              {aboutCheck(data.about)?
                <div className="row card-info" >
                    <div className="col pt-3 pb-2">
                    {roleCheck(data.username) 
                    ?<h5 style={{borderBottom:"1px solid silver", color:"black"}}>{data.username}, {data.usernameInfo[0].name}</h5>
                    :<h5 style={{borderBottom:"1px solid silver", color:"black"}}>{data.username}, {data.usernameInfo[0].name}, ชั้น {data.usernameInfo[0].room[0]}/{data.usernameInfo[0].room[2]}, เลขที่ {data.usernameInfo[0].number}</h5>
                    }
                    <p className="sub-info">นัดคาบที่ : {data.appointmentInfo[0].period} | วันที่ : {String(new Date(data.appointmentInfo[0].date).toLocaleString()).slice(0,10)}</p>
                    <p className="sub-info-time">{new Date(data.appointmentInfo[0].createdAt).toLocaleString()}</p>
                    </div>
                    </div>
                :null
            }
                </Link>
          ))}
          <FooterComponent/>
          </div>
        </div>
      );
}

export default AdminAppointmentComponent