import { useState } from "react";
import {
  HiHome,
  HiFolder,
  HiCalendar,
  HiUserGroup,
  HiCog,
  HiChartBar,
  HiQuestionMarkCircle,
  HiLogout,
  HiMenu, // Added menu icon for toggle button
  HiX,    // Added close icon
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const MobileSidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false); // State to control sidebar visibility
  const username = localStorage.getItem("authName");
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <HiHome size={20} />, route: "/" },
    { name: "Projects", icon: <HiFolder size={20} />, route: "add-project" },
    { name: "Task Board", icon: <HiCalendar size={20} />, route: "taskBoard" },
    { name: "Team", icon: <HiUserGroup size={20} /> },
    { name: "Reports", icon: <HiChartBar size={20} /> },
  ];

  const settingsItems = [
    { name: "Settings", icon: <HiCog size={20} /> },
    { name: "Help", icon: <HiQuestionMarkCircle size={20} /> },
  ];

  const Logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("authId");
    localStorage.removeItem("authName");
    navigate("/login");
  };

  // Function to close sidebar when menu item is clicked
  const handleMenuItemClick = (name) => {
    setActiveItem(name);
    setIsOpen(false);
  };

  return (
    <>
      {/* Toggle Button - always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 p-2 rounded-md bg-indigo-700 text-white lg:hidden"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Overlay - visible when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar with animation */}
      <div
        className={`fixed top-0 left-0 z-40 flex flex-col w-64 h-screen bg-gradient-to-b from-indigo-800 to-indigo-900 text-white transition-transform duration-300 transform lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header with close button */}
        <div className="p-4 pb-2 flex justify-between items-center border-b border-indigo-700">
          <div className="flex items-center overflow-hidden transition-all w-44">
            <div className="bg-white p-2 rounded-lg mr-3">
              <div className="bg-gradient-to-r from-blue-400 to-indigo-600 w-8 h-8 rounded-md" />
            </div>
            <h1 className="font-bold text-xl whitespace-nowrap">TaskFlow</h1>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-indigo-700"
          >
            <HiX size={20} />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link to={item?.route || "#"}>
                  <button
                    onClick={() => handleMenuItemClick(item.name)}
                    className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                      activeItem === item.name
                        ? "bg-white text-indigo-800 shadow-md"
                        : "hover:bg-indigo-700"
                    }`}
                  >
                    <span className="flex-shrink-0 ml-1">{item.icon}</span>
                    <span className="ml-3 whitespace-nowrap">
                      {item.name}
                    </span>
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Settings Navigation */}
        <div className="px-3 py-4 border-t border-indigo-700">
          <ul className="space-y-1">
            {settingsItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleMenuItemClick(item.name)}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeItem === item.name
                      ? "bg-white text-indigo-800 shadow-md"
                      : "hover:bg-indigo-700"
                  }`}
                >
                  <span className="flex-shrink-0 ml-1">{item.icon}</span>
                  <span className="ml-3 whitespace-nowrap">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-indigo-700 flex items-center">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex-shrink-0" />
          <div className="ml-3 overflow-hidden transition-all w-40">
            <p className="font-medium truncate">{username}</p>
          </div>
          <button
            onClick={() => {
              Logout();
              setIsOpen(false);
            }}
            className="ml-auto p-2 rounded-lg hover:bg-indigo-700"
          >
            <HiLogout size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;