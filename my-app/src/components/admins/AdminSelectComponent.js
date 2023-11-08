import { Link } from "react-router-dom"
import NavbarComponent from "./../layouts/NavbarComponent.js"
import FooterComponent from "./../layouts/FooterComponent.js"

const AdminSelectComponent =()=>{
    document.title = "การเลือกหน้ารายการ"
    return(
    <div>
        <NavbarComponent/>
        <div className="mycontainer-select m-2 pt-5 pb-5 ">
            <div className="form-group w">
                <h1>เมนูของAdmin</h1>
            </div>
            <div className="two-blog">
                <Link className="btn btn-danger mybtn" to={"/admin/drug"}>การขอยา</Link>
                <Link className="btn btn-danger mybtn" to={"/admin/appointment"}>การขอนัดพบ</Link>
            </div>
            <div className="two-blog">
                <Link className="btn btn-danger mybtn" to={"/admin/emergency"}>การแจ้งเหตุด่วน</Link>
                <Link className="btn btn-danger mybtn" to={"/admin/report"}>การรายงานปัญหา</Link>
            </div>
            <div className="two-blog">
                <Link className="btn btn-success mybtn" to={"/admin/download/excel"}>เลือกหัวข้อการดาวน์โหลด</Link>
            </div>
            
            <FooterComponent />
            </div>
    </div>
    )
}

export default AdminSelectComponent