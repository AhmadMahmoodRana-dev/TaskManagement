import axios from "axios";
import { createContext } from "react";
import BASEURL from "../constant/BaseUrl";
import { useState } from "react";
import { useEffect } from "react";

export const Context = createContext();
const ContextProvider = (props) => {
  // ALL USERS
  const [teamMembers, setTeamMembers] = useState([]);

  const allUsers = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const { data } = await axios.get(`${BASEURL}/auth/allUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTeamMembers(data);
      console.log("All Users Data:", teamMembers);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  useEffect(() => {
    allUsers();
  }, []);


// CONTEXT VALUE


  const contextValue = {
    teamMembers,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;