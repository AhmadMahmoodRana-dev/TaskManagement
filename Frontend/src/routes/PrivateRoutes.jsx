import { Navigate, Outlet } from "react-router-dom";
import Layout from "../layout/Layout";

const PrivateRoutes = () => {
const token = localStorage.getItem("authToken");
  return token ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/register" />
  );
};

export default PrivateRoutes;