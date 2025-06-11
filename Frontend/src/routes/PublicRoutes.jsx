import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const token = true;

  return token ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
