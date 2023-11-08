import React, { useState } from "react";
import { closeWindows} from "../../services/liffService.js";
import axios from "axios"
import "react-dropdown/style.css";
import NavbarComponent from "./../layouts/NavbarComponent.js"
import FooterComponent from "./../layouts/FooterComponent.js"
import Swal from "sweetalert2"
import { authToken } from "../../services/authorize.js";
import { useNavigate } from "react-router-dom";
import { emergency_line_msg_user } from "../../services/linemsg.js";

const EmergencyComponent = () => {
    document.title = "การแจ้งเหตุด่วน"
    const navigate = useNavigate()
    const [state, setState] = useState({
    victim_name: "",
    tel: "",
    location : "",
    symptom : ""
    });

    const { victim_name, tel, location, symptom } = state;

    const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
    };

    const submitForm=async(e)=>{
        e.preventDefault()
        try{
            const update =  await axios.post(`${process.env.REACT_APP_API}/emergency`,{victim_name, tel, location, symptom},{
                headers:{
                    'authorization':`Bearer ${await authToken()}`
                }
            })
            if (update.status === 200){
                const check = await Swal.fire("แจ้งเตือน","ทำการแจ้งเหตุเรียบร้อยแล้ว","success")
                if (check.isConfirmed){
                    await axios.post(`${process.env.REACT_APP_API}/send/line/msg`,{
                        msg: await emergency_line_msg_user(),
                        }
                        ,{
                            headers:{
                                'authorization':`Bearer ${await authToken()}`
                            }
                        })
                        closeWindows()
                }
            }
        }catch(err){
            const send = await Swal.fire("แจ้งเตือน","คุณไม่มีสิทธิ์เข้าถึงข้อมูลส่วนนี้","error")
            if (send.isConfirmed) return navigate("/login")
        }
    }

    return (
    <div>
        <NavbarComponent />
        <div className="mycontainer ">
        <form onSubmit={submitForm}>
            <div className="container-form mb-5">
            <div className="form-group">
                <h1>การแจ้งเหตุด่วน</h1>
            </div>
            <div className="one-form">
                <label htmlFor="">ชื่อ - นามสกุลผู้ประสบเหตุ</label>
                <input
                    type="text"
                    className="form-control"
                    value={victim_name} //change
                    onChange={inputValue("victim_name")} //change
                    placeholder="ตัวอย่าง : นาย สมพงษ์ ใจดี"
                    required
                />
            </div>
            <div className="one-form">
                <label htmlFor="">เบอร์โทรติดต่อ</label>
                <input
                    type="text"
                    className="form-control w-100"
                    value={tel} //change
                    onChange={inputValue("tel")} //change
                    placeholder="ตัวอย่าง : 0923334444"
                    minLength={10}
                    maxLength={10}
                    required
                />
            </div>
            <div className="one-form">
                <label htmlFor="">สถานที่เกิดเหตุ</label>
                <input
                    type="text"
                    className="form-control w-100"
                    value={location} //change
                    onChange={inputValue("location")} //change
                    placeholder="ตัวอย่าง : หน้าห้อง 124"
                    required
                />
            </div>
            <div className="one-form ">
                <label htmlFor="">อาการของผู้ประสบเหตุ</label>
                <textarea
                    className="form-control w-100"
                    value={symptom} //change
                    onChange={inputValue("symptom")} //change
                    placeholder="ตัวอย่าง : ลื่นล้มหัวหัวแตก"
                    required
                />
            </div>
            <br />
            <input type="submit" className="btn btn-primary w-50" value={"ยืนยัน"}/>
            </div>
        </form>
        <FooterComponent/>
        </div>
    </div>
    );
    };

    export default EmergencyComponent;