import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PublicRoutes/>}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoutes/>}>
          <Route path="/" element={<h1>HOME</h1>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
