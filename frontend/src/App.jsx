import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Login from "./User/Login";
import RegisterUser from "./User/registerUser";
import AdminDashboard from "./pages/AdminDashboard";
import AddAppointment from "./pages/AddAppointment";
import ProtectedRoute from "./utill/ProtectedRoute";
import AddDoctor from "./Doctors_pages/AddDoctor";
import DoctorList from "./Doctors_pages/DoctorList";
import UpdateDoctor from "./Doctors_pages/UpdateDoctor";
import ViewDoctor from "./Doctors_pages/ViewDoctor";
import AppointmentHistory from "./pages/AppointmentHistory";
import User from "./User/User";
import AddUser from "./User/AddUser";
import UpdateUser from "./User/UpdateUser";
import ChangePassword from "./User/ChangePassword";
import Prescription from "./Perscription/Prescription";
import AddPerscription from "./Perscription/AddPerscription";
import AdminSummary from "./pages/AdminSummary";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user/register" element={<RegisterUser />} />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="/admin-dashboard" element={< AdminSummary/>} />
            <Route path="book-appointment" element={< AddAppointment/>} />
            <Route path="doctors" element={<DoctorList />} />
            <Route path="/admin-dashboard/doctors/add-doctor" element={< AddDoctor/>} />
            <Route path="/admin-dashboard/doctors/update-doctor/:id" element={< UpdateDoctor/>} />
            <Route path="/admin-dashboard/doctors/view/:id" element={< ViewDoctor/>} />
            <Route path="/admin-dashboard/appointment-history" element={< AppointmentHistory/>} />
            <Route path="/admin-dashboard/user" element={< User/>} />
            <Route path="/admin-dashboard/user/register" element={< AddUser/>} />
            <Route path="/admin-dashboard/user/update-user/:id" element={< UpdateUser/>} />
            <Route path="/admin-dashboard/user/setting" element={<ChangePassword  />} />
            <Route path="/admin-dashboard/prescription" element={<Prescription  />} />
            <Route path="/admin-dashboard/prescription/add/:id" element={<AddPerscription  />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
