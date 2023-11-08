import { useState, useEffect } from "react"
import axios from "axios"
import NavbarComponent from "./../layouts/NavbarComponent.js"
import FooterComponent from "./../layouts/FooterComponent.js"
import { getUserId ,closeWindows, loginLIFF} from "./../../services/liffService.js"
import { authenticate } from "../../services/authorize.js"
import Swal from "sweetalert2"

const LoginComponent=(props)=>{
    document.title = "เข้าสู่ระบบ"
    const [state,setState] = useState({
        username:"",
        password:"",
    })

    const {username, password} = state

    const inputValue = name => event => {
        setState({...state,[name]:event.target.value})
   }

   const submitForm=async(e)=>{
    e.preventDefault()
    try{
        const loginstatus = await axios.post(`${process.env.REACT_APP_API}/login`,{username, password, Luserid:await getUserId()})
        if(loginstatus.status === 200){
            if(loginstatus.data === "username is not correct"){
                Swal.fire("แจ้งเตือน","Username หรือ Password \nไม่ถูกต้อง","error")
            }
            else if(loginstatus.data.noti === "password is correct"){
                const checkOk = await Swal.fire("แจ้งเตือน","เข้าสู่ระบบเรียบร้อย","success")
                if (checkOk.isConfirmed){
                    authenticate(loginstatus)
                    closeWindows()
                }
            }
        }
    }catch(err){
        Swal.fire("แจ้งเตือน","Username หรือ Password \nไม่ถูกต้อง","error")
    }
}

    useEffect(()=>{
        loginLIFF()
    },[])

    return(
        <div>
        <NavbarComponent/>
        <div className="container p-5 vh-80">
            <h1>เข้าสู่ระบบ</h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>เลขประจำตัว</label>
                    <input type="text" className="form-control" 
                        required 
                        value={username} 
                        maxLength={5}
                        onChange={inputValue("username")}/>
                </div>
                <div className="form-group">
                    <label>รหัสผ่าน</label>
                    <input type="password" className="form-control"
                        required 
                        value={password} 
                        onChange={inputValue("password")}/>
                </div>
                <br/>
                <input type="submit" value="เข้าสู่ระบบ" className="btn btn-primary"/>
            </form>
        </div>
        <FooterComponent/>
        </div>
             
    )
}

export default LoginComponent