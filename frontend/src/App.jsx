import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { OfficerDashboard } from "./pages/OfficerDashboard";
import { LoginOfficer } from "./pages/LoginOfficer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-officer" element={<LoginOfficer />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/officerDashboard" element={<OfficerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
