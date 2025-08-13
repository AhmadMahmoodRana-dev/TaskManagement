import { useState } from "react";
import {HiHome,HiFolder,HiCalendar,HiUserGroup,HiCog,HiChartBar,HiQuestionMarkCircle,HiLogout,HiChevronLeft} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const username = localStorage.getItem("authName")
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <HiHome size={20} />, route: "/" },
    { name: "Projects", icon: <HiFolder size={20} />, route: "add-project" },
    { name: "Task Board", icon: <HiCalendar size={20} />, route:"taskBoard" },
    { name: "Calendar", icon: <HiUserGroup size={20} /> ,route:"calender" },
    { name: "Reports", icon: <HiChartBar size={20} />, route:"report" },
  ];

  const settingsItems = [
    { name: "Settings", icon: <HiCog size={20} /> },
    { name: "Help", icon: <HiQuestionMarkCircle size={20} /> },
  ];

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const Logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("authId");
    localStorage.removeItem("authName");
    navigate("/login");
  };  

  return (
    <div
      className={`flex flex-col sticky top-0 bg-gradient-to-b from-indigo-800 to-indigo-900 text-white md:h-screen h-[121.4vh] transition-all duration-300 ${
        expanded ? "lg:w-64 lg:flex hidden w-20" : " lg:flex hidden w-20"
      }`}
    >
      {/* Header */}
      <div className="p-4 pb-2 flex justify-between items-center border-b border-indigo-700">
        <div
          className={`flex items-center overflow-hidden transition-all ${
            expanded ? "lg:w-44 w-0" : "w-0"
          }`}
        >
          <div className="bg-white p-2 rounded-lg mr-3">
            <div className="bg-gradient-to-r from-blue-400 to-indigo-600 w-8 h-8 rounded-md" />
          </div>
          <h1 className="font-bold text-xl whitespace-nowrap">TaskFlow</h1>
        </div>
        <button
          onClick={toggleSidebar}
          className={`p-1.5 rounded-lg bg-indigo-700 hover:bg-indigo-600`}
        >
          <HiChevronLeft
            size={20}
            className={`transition-transform ${!expanded && "rotate-180"}`}
          />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <Link to={item?.route} key={item.name}>
              <button
                onClick={() => setActiveItem(item.name)}
                className={`flex items-center w-full p-3 rounded-lg transition-colors cursor-pointer ${
                  activeItem === item.name
                    ? "bg-white text-indigo-800 shadow-md"
                    : "hover:bg-indigo-700"
                }`}
              >
                <span className="flex-shrink-0 ml-1">{item.icon}</span>
                <span
                  className={`ml-3 whitespace-nowrap transition-opacity ${
                    expanded ? "lg:opacity-100 opacity-0 lg:relative absolute" : "opacity-0 absolute"
                  }`}
                >
                  {item.name}
                </span>
              </button>
            </Link>
          ))}
        </ul>
      </nav>

      {/* Settings Navigation */}
      <div className="px-3 py-4 border-t border-indigo-700">
        <ul className="space-y-1">
          {settingsItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => setActiveItem(item.name)}
                className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                  activeItem === item.name
                    ? "bg-white text-indigo-800 shadow-md"
                    : "hover:bg-indigo-700"
                }`}
              >
                <span className="flex-shrink-0 ml-1">{item.icon}</span>
                <span
                  className={`ml-3 whitespace-nowrap transition-opacity ${
                     expanded ? "lg:opacity-100 opacity-0 lg:relative absolute" : "opacity-0 absolute"
                  }`}
                >
                  {item.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-indigo-700 flex items-center">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex-shrink-0" />
        <div
          className={`ml-3 overflow-hidden transition-all ${
            expanded ? "lg:w-40 w-0" : "w-0"
          }`}
        >
          <p className="font-medium truncate">{username}</p>
        </div>
        <button
          onClick={() => Logout()}
          className={`ml-auto p-2 rounded-lg hover:bg-indigo-700 transition-opacity ${
            expanded ? "md:opacity-100 opacity-0 md:relative absolute" : "opacity-0 absolute"
          }`}
        >
          <HiLogout size={20} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;