import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import LoginComponent from './components/logins/loginComponent'
import FristLoginComponent from './components/logins/firstLoginComponent'
import LogoutComponent from "./components/logins/logoutComponent"

import SelectComponent from "./components/SelectComponent"
import PainFormComponent from "./components/forms/PainFormComponent"
import ApponitmentCompoent from './components/forms/AppointmentComponent'
import EmergencyComponent from './components/forms/EmergencyComponent'
import ReportComponent from './components/forms/ReportComponent'

import SingleDrugDetailComponent from "./components/admins/SingleDrugDetailComponent"
import AdminDrugComponent from './components/admins/AdminDrugComponent'
import AdminAppointmentComponent from './components/admins/AdminAppointmentComponent'
import AdminSelectComponent from './components/admins/AdminSelectComponent'
import AdminEmergencyComponent from './components/admins/AdminEmergencyComponent'
import AdminReportComponent from './components/admins/AdminReportComponent'
import AdminDownloadExcekComponent from './components/admins/AdminDownloadExcelComponent'

function App() {
  document.title = "App"
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path='/first/login' element={<FristLoginComponent/>}/>
          <Route path='/logout' element={<LogoutComponent/>}/>

          <Route path="/select" element={<SelectComponent />} />
          <Route path="/pain/form" element={<PainFormComponent />} />
          <Route path='/appointment' element={<ApponitmentCompoent/>}/>
          <Route path='/emergency' element={<EmergencyComponent/>}/>
          <Route path='/report' element={<ReportComponent/>}/>

          <Route path="/admin/select" element={<AdminSelectComponent />} />
          <Route path="/admin/drug" element={<AdminDrugComponent />} />
          <Route path="/admin/appointment" element={<AdminAppointmentComponent />} />
          <Route path="/admin/emergency" element={<AdminEmergencyComponent />} />
          <Route path="/admin/report" element={<AdminReportComponent />} />
          <Route path="/admin/download/excel" element={<AdminDownloadExcekComponent />} />

          <Route path='/detail/:username' element={<SingleDrugDetailComponent/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
