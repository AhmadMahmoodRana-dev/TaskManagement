import MobileSidebar from "../components/MobileSidebar";
import Sidebar from "../components/Sidebar";
const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <MobileSidebar />
      {children}
    </div>
  );
};

export default Layout;
