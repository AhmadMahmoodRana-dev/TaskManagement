import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import Home from "./pages/Main/Home";
import { useEffect } from "react";
import ProjectDashboard from "./pages/Main/ProjectDashboard";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const expiry = localStorage.getItem("tokenExpiry");
    const token = localStorage.getItem("authToken");

    if (expiry && Date.now() > parseInt(expiry, 10)) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("tokenExpiry");
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
        </Route>
      </Routes>
    </>
  );
};

export default App;
