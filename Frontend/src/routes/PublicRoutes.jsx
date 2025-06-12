import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const token = localStorage.getItem("authToken");

  return token ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
