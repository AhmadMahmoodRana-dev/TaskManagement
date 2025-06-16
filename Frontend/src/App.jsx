import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import Home from "./pages/Main/Home";
import { useEffect } from "react";
import ProjectDashboard from "./pages/Main/ProjectDashboard";
import AddProject from "./pages/Main/AddProject";
import ProfileForm from "./pages/Main/ProfileForm";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const expiry = localStorage.getItem("tokenExpiry");

    if (expiry && Date.now() > parseInt(expiry, 10)) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("tokenExpiry");
      localStorage.removeItem("authId");
        localStorage.removeItem("authName");
      console.log("Token expired. Logging out.");
      navigate("/login");
    }
  }, []);
  return (
    <>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/project-dashboard" element={<ProjectDashboard />} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/profileForm" element={<ProfileForm />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
