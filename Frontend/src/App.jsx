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
import TaskBoard from "./pages/Main/TaskBoard";
import ChatBox from "./pages/Main/ChatBox";

const App = () => {
  const navigate = useNavigate();
  const currentHost = window.location.host; // includes port, like "localhost:5174"
  const isRegisterAllowed = currentHost === "localhost:5173";

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
          {isRegisterAllowed && (
            <Route path="/register" element={<Register />} />
          )}
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/project-dashboard/:id" element={<ProjectDashboard />} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/profileForm" element={<ProfileForm />} />
          <Route path="/taskBoard" element={<TaskBoard />} />
          <Route path="/chatBox/:projectId" element={<ChatBox />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
