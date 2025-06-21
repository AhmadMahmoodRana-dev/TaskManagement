import { createContext, useState, useEffect } from "react";
import axios from "axios";
import BASEURL from "../constant/BaseUrl";

export const Context = createContext();

const ContextProvider = (props) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [token, setToken] = useState(null);

  // Sync token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Re-check token when it changes in localStorage (after login)
  useEffect(() => {
    const interval = setInterval(() => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken !== token) {
        setToken(storedToken);
      }
    }, 1000); // check every second

    return () => clearInterval(interval);
  }, [token]);

  // Trigger API calls only when token is available
  useEffect(() => {
    if (token) {
      allUsers(token);
      fetchAllProjects(token);
      allTasks(token)
    }
  }, [token]);

  // FETCH ALL USERS 

  const allUsers = async (authToken) => {
    try {
      const { data } = await axios.get(`${BASEURL}/auth/allUser`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setTeamMembers(data);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  // FETCH ALL PROJECTS

  const fetchAllProjects = async (authToken) => {
    try {
      const { data } = await axios.get(`${BASEURL}/project/myprojects`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setProjects(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // FETCH MY TASKS 

 const [tasks, setTasks] = useState([]);

  const allTasks = async (authToken) => {
    try {
      const { data } = await axios.get(`${BASEURL}/task/my`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setTasks(data)
      console.log("I fetch SUCCESSFULLY")
    } catch (error) {
      console.error(error);
    }
  };




  const contextValue = {
    teamMembers,
    projects,
    tasks,
    
    // FUNCTIONS
    
    allTasks,
    fetchAllProjects
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;