import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Home from "./pages/home/home";
import ApplyDoctor from "./pages/doctor/ApplyDoctor";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
// import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Notifications from "./pages/notifications/Notifications";
import Userlist from "./pages/Admin/Userlist";
import Doctorlist from "./pages/Admin/Doctorlist";
import Profile from "./pages/doctor/Profile";
import BookAppointment from "./pages/doctor/BookAppointment";
import Appointments from "./pages/appointments/Appointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";

function App() {
  const {loading} = useSelector(state =>state.alerts)
  return (
    <BrowserRouter>
      {loading && (<div className="spinner-parent">
        <div className="spinner-border" role="status">
        </div>
      </div>)}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        {/* <Route path="/" element={<Home />} />
        <Route path="/apply-doctor" element={<ApplyDoctor/>} />
        <Route path="/notifications" element={<Notifications/>} />
        <Route path="/admin/userslist" element={<Userlist/>} />
        <Route path="/admin/doctorslist" element={<Doctorlist/>} />
        <Route path="/doctor/profile/:userId" element={<Profile/>} />
        <Route path="/book-appointment/:doctorId" element={<BookAppointment/>} />
        <Route path="/appointments" element={<Appointments/>} />
        <Route path="/doctor/appointments" element={<DoctorAppointments/>} /> */}
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="/apply-doctor" element={<ProtectedRoute><ApplyDoctor/></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications/></ProtectedRoute>} />
        <Route path="/admin/userslist" element={<ProtectedRoute><Userlist/></ProtectedRoute>} />
        <Route path="/admin/doctorslist" element={<ProtectedRoute><Doctorlist/></ProtectedRoute>} />
        <Route path="/doctor/profile/:id" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        <Route path="/book-appointment/:doctorId" element={<ProtectedRoute><BookAppointment/></ProtectedRoute>} />
        <Route path="/appointments" element={<ProtectedRoute><DoctorAppointments/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
