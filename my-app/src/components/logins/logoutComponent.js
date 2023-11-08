import {useEffect} from "react"
import axios from "axios"
import { authToken } from "../../services/authorize"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { closeWindows } from "../../services/liffService"


const LogoutComponent = () =>{
    const navigate = useNavigate()
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                await axios.post(`${process.env.REACT_APP_API}/logout`,{},{
                    headers:{
                        'authorization':`Bearer ${await authToken()}`
                    }
                })
                await localStorage.removeItem('token')
                closeWindows()
            }catch(err){
                const send = await Swal.fire("แจ้งเตือน","คุณไม่มีสิทธิ์เข้าถึงข้อมูลส่วนนี้","error")
                if (send.isConfirmed) return navigate("/login")
            }
        }
        fetchData()
      // eslint-disable-next-line
    })

}

export default LogoutComponent