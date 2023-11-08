import { Link } from "react-router-dom"
import NavbarComponent from "./layouts/NavbarComponent.js"
import FooterComponent from "./layouts/FooterComponent.js"

const SelectComponent =()=>{
    return(
    <div>
        <NavbarComponent/>
        <div className="mycontainer-select m-2 pt-5 pb-5 ">
            <div className="form-group w">
                <h1>อาการ</h1>
            </div>
            <div className="two-blog">
                <Link className="btn btn-danger mybtn" to={"/pain/form"}>ปวดหัว</Link>
                {/* <Link className="btn btn-danger mybtn" to={"/fever/form"}>มีไข้</Link> */}
            </div>
            {/* <div className="two-blog">
                <Link className="btn btn-danger mybtn" to={"/stomach-ache/form"}>ท้องเสีย</Link>
                <Link className="btn btn-danger mybtn" to={"/allergy/form"}>ลมพิษ/แพ้</Link>
            </div>
            <div className="two-blog">
                <Link className="btn btn-danger mybtn" to={'/menstrual-pain/form'}>ปวดประจำเดือน</Link>
            </div> */}
            <FooterComponent />
            </div>
    </div>
    )
}

export default SelectComponent