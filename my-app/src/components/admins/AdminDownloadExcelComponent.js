import NavbarComponent from "./../layouts/NavbarComponent.js"
import FooterComponent from "./../layouts/FooterComponent.js"
import axios from "axios"
import { authToken } from "../../services/authorize.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminDownloadExcekComponent =()=>{

    document.title = "การดาวน์โหลดข้อมูล Excel"
    const navigate = useNavigate()
    const apiDownloadExcel = async(category)=>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API}/export/excel`, {
                responseType: 'blob', // Set responseType to 'blob' to receive binary data.
                params:{
                  msg:category
                },
                headers:{
                    'authorization':`Bearer ${await authToken()}`
                }
              });
            await downloadExcelFile(response,category)
        }catch (error) {
            const send = await Swal.fire("แจ้งเตือน","คุณไม่มีสิทธิ์เข้าถึงข้อมูลส่วนนี้","error")
            if (send.isConfirmed) return navigate("/login")
          }
    }

    const downloadExcelFile = async(response,category)=>{
        try {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = `Excel${category}File.xlsx`; // Set the desired filename.
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          } catch (error) {
            console.error('Error downloading Excel file: ', error);
          }
    }

    return(
    <div>
        <NavbarComponent/>
        <div className="mycontainer-select m-2 pt-5 pb-5 ">
            <div className="form-group w">
                <h1>เมนูการดาวน์โหลด Excel</h1>
            </div>
            <div className="two-blog ps-5 pe-5 pt-3">
                <button className="btn btn-success mybtn" onClick={()=>apiDownloadExcel("drug")}>ดาวน์โหลดข้อมูลการขอยา</button>
            </div>
            <div className="two-blog ps-5 pe-5 pt-3">
                <button className="btn btn-success mybtn" onClick={()=>apiDownloadExcel("appointment")}>ดาวน์โหลดข้อมูลการขอนัดพบ</button>
            </div>
            <div className="two-blog ps-5 pe-5 pt-3">
                <button className="btn btn-success mybtn" onClick={()=>apiDownloadExcel("emergency")}>ดาวน์โหลดข้อมูลการแจ้งเหตุด่วน</button>
            </div>
            <div className="two-blog ps-5 pe-5 pt-3">
                <button className="btn btn-success mybtn" onClick={()=>apiDownloadExcel("report")}>ดาวน์โหลดข้อมูลการรายงานปัญหา</button>
            </div>
            
            <FooterComponent />
            </div>
    </div>
    )
}

export default AdminDownloadExcekComponent