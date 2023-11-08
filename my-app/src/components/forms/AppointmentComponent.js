import React, { useState } from "react";
import { closeWindows} from "../../services/liffService.js";
import axios from "axios"
import "react-dropdown/style.css";
import NavbarComponent from "./../layouts/NavbarComponent.js"
import FooterComponent from "./../layouts/FooterComponent.js"
import Swal from "sweetalert2"
import table from '../../image/study_table.png';
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-dropdown";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { authToken } from "../../services/authorize.js";
import { appointment_line_msg_user } from "../../services/linemsg.js";

const AppointmentComponent = () => {
    document.title = "การขอนัดพบครู"
    const navigate = useNavigate()
    const [date, setDate] = useState(new Date());

    const periodOptions = ["เลือกคาบเรียน","1","2","3","4","5","6","7","8","9","10"];
    const [period, setSelectPeriod] = useState(periodOptions[0]);
    const handleDropdownPeriod= (selected) => {
        setSelectPeriod(selected.value);
    };

    const submitForm=async(e)=>{
        e.preventDefault()
        try{
            const update =  await axios.post(`${process.env.REACT_APP_API}/appointment`,{period, date},{
                headers:{
                    'authorization':`Bearer ${await authToken()}`
                }
            })
            if (update.status === 200){
                const check = await Swal.fire("แจ้งเตือน","ทำการนัดหมายเสร็จเรียบร้อยแล้ว","success")
                if (check.isConfirmed){
                    await axios.post(`${process.env.REACT_APP_API}/send/line/msg`,{
                        msg: await appointment_line_msg_user() ,
                        },{
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
                    <h1>การขอนัดพบครู</h1>
                </div>
                    <div className="image-study-table m-4">
                        <Link to={'https://cdn.discordapp.com/attachments/859745566735859722/1166424376351146124/2-66.png?ex=654a705a&is=6537fb5a&hm=2eca224d70f871a82351da15d8c6b95910ee2b7c2850c32aa2ee4ab7b34f8694&'} >
                            <img src={table} alt=""/>
                        </Link>  
                </div>
            
                <div className="one-form w-50 d-flex flex-column">
                    <label className="form-range">เลือกวันเดือนปี</label>
                    <DatePicker
                        className="form-control"
                        selected={date} 
                        onChange={(date) => setDate(date)} 
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className="one-form w-75">
                <label className="form-range">เลือกคาบเรียน</label>
                <Dropdown 
                    options={periodOptions}
                    onChange={handleDropdownPeriod}
                    value={period}
                    placeholder="Select an option"
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

export default AppointmentComponent;