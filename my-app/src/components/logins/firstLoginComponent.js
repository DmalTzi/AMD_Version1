import { useState, useEffect } from "react"
import axios from "axios"
import NavbarComponent from "./../layouts/NavbarComponent.js"
import FooterComponent from "./../layouts/FooterComponent.js"
import { closeWindows, fist_login_LIFF, getUserId } from "./../../services/liffService.js"
import { authenticate } from "../../services/authorize.js"
import Swal from "sweetalert2"

const FristLoginComponent=(props)=>{
    document.title = "เข้าสู่ระบบครั้งแรก"
    const [state,setState] = useState({
        username:"",
        password:"",
        newpassword:""
    })

    const {username, password, newpassword} = state

    const inputValue = name => event => {
        setState({...state,[name]:event.target.value})
   }

   const submitForm=async(e)=>{
    e.preventDefault()
    try{
        const loginstatus = await axios.post(`${process.env.REACT_APP_API}/first/login`,{username, password, newpassword, Luserid:await getUserId()})
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
            }else{
                Swal.fire("แจ้งเตือน","Username หรือ Password \nไม่ถูกต้อง","error")
            }
        }
    }catch(err){
        Swal.fire("Oops..",`Have Some thing worng at server side, please report this error to admin`,"error")
        console.log("err",err)
    }
}

    useEffect(()=>{
        fist_login_LIFF()
    },[])

    return(
        <div>
        <NavbarComponent/>
        <div className="container p-5 vh-80">
            <h1>เข้าสู่ระบบครั้งแรก</h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>เลขประจำตัว</label>
                    <input type="text" className="form-control" 
                        required 
                        value={username} 
                        onChange={inputValue("username")}
                        maxLength={5}
                        />
                </div>
                <div className="form-group">
                    <label>รหัสผ่านปัจุบัน</label>
                    <input type="password" className="form-control"
                        required 
                        value={password} 
                        onChange={inputValue("password")}
                        />
                </div>
                <div className="form-group">
                    <label>รหัสผ่านใหม่</label>
                    <input type="password" className="form-control"
                        required 
                        value={newpassword} 
                        onChange={inputValue("newpassword")}
                        minLength={3}
                        />
                </div>
                <br/>
                <input type="submit" value="เข้าสู่ระบบ" className="btn btn-primary"/>
            </form>
        </div>
        <FooterComponent/>
        </div>
             
    )
}

export default FristLoginComponent