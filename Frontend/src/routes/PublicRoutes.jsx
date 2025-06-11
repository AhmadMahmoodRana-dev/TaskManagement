import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const token = false;

  return token ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
