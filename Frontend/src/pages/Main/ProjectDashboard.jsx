import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import BASEURL from "../../constant/BaseUrl";
import { Link, useParams } from "react-router-dom";
import formatDate from "../../constant/FormatDate";
import AddMemberModel from "../../components/models/AddMemberModel";
import AddTaskModal from "../../components/models/AddTaskModel";
import { IoMdArrowRoundForward, IoMdAddCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdEdit, MdFilterAlt, MdClear } from "react-icons/md";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

const ProjectDashboard = () => {
  const [memberOpen, setMemberOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("authToken");
  const [userRole, setUserRole] = useState({});
  const [taskId, setTaskId] = useState("");
  const { id } = useParams();

  // FILTER FUNCTIONALLITY
  const [assignedByFilter, setAssignedByFilter] = useState([]);
  const [assignedToFilter, setAssignedToFilter] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique values for filter options
  const assignedByOptions = [
    ...new Set(tasks.map((task) => task.createdBy.name)),
  ];
  const assignedToOptions = [
    ...new Set(tasks.map((task) => task.assignedTo.name)),
  ];
  const priorityOptions = ["critical", "high", "medium", "low"];
  const statusOptions = ["pending", "in-progress", "completed"];

  // Filter tasks based on selected criteria
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Check assigned by filter
      if (
        assignedByFilter.length > 0 &&
        !assignedByFilter.includes(task.createdBy.name)
      ) {
        return false;
      }

      // Check assigned to filter
      if (
        assignedToFilter.length > 0 &&
        !assignedToFilter.includes(task.assignedTo.name)
      ) {
        return false;
      }

      // Check priority filter
      if (
        priorityFilter.length > 0 &&
        !priorityFilter.includes(task.priority)
      ) {
        return false;
      }

      // Check status filter
      if (statusFilter.length > 0 && !statusFilter.includes(task.status)) {
        return false;
      }

      return true;
    });
  }, [tasks, assignedByFilter, assignedToFilter, priorityFilter, statusFilter]);

  // Toggle filter selection
  const toggleFilter = (filterType, value) => {
    const filterSetters = {
      assignedBy: setAssignedByFilter,
      assignedTo: setAssignedToFilter,
      priority: setPriorityFilter,
      status: setStatusFilter,
    };

    const filterStates = {
      assignedBy: assignedByFilter,
      assignedTo: assignedToFilter,
      priority: priorityFilter,
      status: statusFilter,
    };

    const setter = filterSetters[filterType];
    const state = filterStates[filterType];

    if (state.includes(value)) {
      setter(state.filter((item) => item !== value));
    } else {
      setter([...state, value]);
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setAssignedByFilter([]);
    setAssignedToFilter([]);
    setPriorityFilter([]);
    setStatusFilter([]);
  };

  // Check if any filter is applied
  const isFilterApplied =
    assignedByFilter.length > 0 ||
    assignedToFilter.length > 0 ||
    priorityFilter.length > 0 ||
    statusFilter.length > 0;

  // #####################################
  const name = localStorage.getItem("authName");

  const OpenEditForm = (id) => {
    setTaskId(id);
    setTaskOpen(!taskOpen);
  };

  // FETCH SINGLE PRODUCT

  const fetchSingleProjectData = async () => {
    try {
      const { data } = await axios.get(
        `${BASEURL}/project/singleProject/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProject(data.data);
      console.log("SINGLE PROJECT DETAIL", project);
    } catch (error) {}
  };

  // FETCH ALL TASKS

  const allProjectTasks = async () => {
    try {
      const { data } = await axios.get(`${BASEURL}/task/project/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  // FETCH USER ROLE

  const currentUserRole = async () => {
    try {
      const { data } = await axios.get(
        `${BASEURL}/project/getProjectMemberRole/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserRole(data);
      console.log("Cureent User Data", data);
    } catch (error) {
      console.error(error);
    }
  };

  // DELETE TASK

  const deleteTask = async (taskID) => {
    try {
      const response = await axios.delete(`${BASEURL}/task/${taskID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      allProjectTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // USE EFFECT

  useEffect(() => {
    fetchSingleProjectData();
    allProjectTasks();
    currentUserRole();
  }, []);
  {
    /* /task/:taskId */
  }

  const getPriorityBadge = (priority) => {
    const styles = {
      high: "bg-red-100 text-red-800",
      critical: "bg-red-300 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${styles[priority]}`}
      >
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const styles = {
      completed: "bg-green-100 text-green-800",
      inProgress: "bg-blue-100 text-blue-800",
      pending: "bg-gray-100 text-gray-800",
      review: "bg-yellow-100 text-yellow-800",
      archived: "bg-orange-100 text-orange-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}
      >
        {status
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </span>
    );
  };

  // PAGINATIONS
  const [currentPage, setCurrentPage] = useState(1);
  const ShownRows = 5;
  const totapages = Math.ceil(filteredTasks.length / ShownRows);
  
  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totapages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  
  const currentData = filteredTasks.slice(
    (currentPage - 1) * ShownRows,
    currentPage * ShownRows
  );
    // PAGINATIONS
  const [currentPage1, setCurrentPage1] = useState(1);
  const ShownRows1 = 3;
  const totapages1 = Math.ceil(project?.members?.length / ShownRows1);

  const nextPage1 = () => {
    setCurrentPage1((prev) => Math.min(prev + 1, totapages1));
  };

  const prevPage1 = () => {
    setCurrentPage1((prev) => Math.max(prev - 1, 1));
  };

  const currentData1 = project?.members?.slice(
    (currentPage1 - 1) * ShownRows1,
    currentPage1 * ShownRows1
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-8 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {project?.name}
            </h1>
            <p className="text-gray-600 mt-2">{project.description}</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
              {project.status}
            </span>
            <div className="hidden md:block">
              <div className="flex items-center">
                <span className="text-gray-600 text-sm mr-2">Progress:</span>
                <div className="w-32 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <span className="text-gray-600 text-sm ml-2">
                  {project.progress}%
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mb-4">
          <Link
            to={`/chatBox/${id}`}
            className="bg-indigo-600 text-white px-4 py-2 gap-3 cursor-pointer rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
          >
            <IoMdArrowRoundForward />
            Go ChatBox
          </Link>
        </div>

        {/* Project Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Project Details
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-500 text-sm">Start Date</p>
                <p className="font-medium">{formatDate(project?.createdAt)}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Deadline</p>
                <p className="font-medium">{formatDate(project?.deadline)}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Team Size</p>
                <p className="font-medium">
                  {project?.members?.length} members
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Team Members
              </h3>
              {userRole?.role == "developer" || userRole?.role == "viewer" ?  (
                ""
              ) : (
                <button
                  onClick={() => setMemberOpen(!memberOpen)}
                  className="bg-indigo-600 text-white gap-2 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                >
                  <IoMdAddCircleOutline size={22} />
                  Add Member
                </button>
              )}
            </div>

            <div className="space-y-4">
              {currentData1?.map((member) => (
                <div key={member?.user?._id} className="flex items-center">
                  <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center">
                    <span className="text-indigo-800 font-medium">
                      {member?.user?.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{member?.user?.name}</p>
                    <p className="text-gray-500 text-sm">
                      {member?.role} • {member?.tasks} tasks
                    </p>
                  </div>
                </div>
              ))}

              <div className="flex justify-end w-full gap-3 items-center">
              <button
                onClick={() => prevPage1()}
                disabled={currentPage1 === 1}
                className={`p-2 rounded-full cursor-pointer ${
                  currentPage1 === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-indigo-200"
                }`}
              >
                <GoArrowLeft color="#372aac" size={18} />
              </button>

              <h1 className="text-lg font-semibold">{currentPage1}</h1>

              <button
                onClick={() => nextPage1()}
                disabled={currentPage1 === totapages1}
                className={`p-2 rounded-full cursor-pointer ${
                  currentPage1 === totapages1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-indigo-200"
                }`}
              >
                <GoArrowRight color="#372aac" size={18} />
              </button>
            </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Task Overview
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Total Tasks</p>
                <p className="font-medium">{tasks.length}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Completed</p>
                <p className="font-medium">
                  {tasks.filter((t) => t.status === "completed").length}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">In Progress</p>
                <p className="font-medium">
                  {tasks.filter((t) => t.status === "inProgress").length}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Archieved</p>
                <p className="font-medium">
                  {tasks.filter((t) => t.status === "archived").length}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 flex justify-center items-center">
              Task Filters
            </h2>
            <div className="flex space-x-2">
              {isFilterApplied && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                >
                  <MdClear className="mr-1"  /> Clear Filters
                </button>
              )}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
              >
                <MdFilterAlt size={22} className="mr-2 text-white" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              {/* Assigned By Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Assigned By
                </h3>
                <div className="space-y-2">
                  {assignedByOptions.map((assigner) => (
                    <label key={assigner} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={assignedByFilter.includes(assigner)}
                        onChange={() => toggleFilter("assignedBy", assigner)}
                        className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-gray-700">{assigner}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Assigned To Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Assigned To
                </h3>
                <div className="space-y-2">
                  {assignedToOptions.map((assignee) => (
                    <label key={assignee} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={assignedToFilter.includes(assignee)}
                        onChange={() => toggleFilter("assignedTo", assignee)}
                        className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-gray-700">{assignee}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Priority Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Priority
                </h3>
                <div className="space-y-2">
                  {priorityOptions.map((priority) => (
                    <label key={priority} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={priorityFilter.includes(priority)}
                        onChange={() => toggleFilter("priority", priority)}
                        className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-gray-700 capitalize">
                        {priority}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Status
                </h3>
                <div className="space-y-2">
                  {statusOptions.map((status) => (
                    <label key={status} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={statusFilter.includes(status)}
                        onChange={() => toggleFilter("status", status)}
                        className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-gray-700 capitalize">
                        {status}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filter Indicators */}
        {isFilterApplied && (
          <div className="mb-4 flex flex-wrap gap-2">
            {assignedByFilter.map((filter) => (
              <span
                key={`by-${filter}`}
                className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full flex items-center"
              >
                Assigned By: {filter}
                <button
                  onClick={() => toggleFilter("assignedBy", filter)}
                  className="ml-2 text-indigo-600 hover:text-indigo-900"
                >
                  <MdClear size={16} />
                </button>
              </span>
            ))}

            {assignedToFilter.map((filter) => (
              <span
                key={`to-${filter}`}
                className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full flex items-center"
              >
                Assigned To: {filter}
                <button
                  onClick={() => toggleFilter("assignedTo", filter)}
                  className="ml-2 text-indigo-600 hover:text-indigo-900"
                >
                  <MdClear size={16} />
                </button>
              </span>
            ))}

            {priorityFilter.map((filter) => (
              <span
                key={`priority-${filter}`}
                className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full flex items-center"
              >
                Priority: {filter.charAt(0).toUpperCase() + filter.slice(1)}
                <button
                  onClick={() => toggleFilter("priority", filter)}
                  className="ml-2 text-indigo-600 hover:text-indigo-900"
                >
                  <MdClear size={16} />
                </button>
              </span>
            ))}

            {statusFilter.map((filter) => (
              <span
                key={`status-${filter}`}
                className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full flex items-center"
              >
                Status: {filter.charAt(0).toUpperCase() + filter.slice(1)}
                <button
                  onClick={() => toggleFilter("status", filter)}
                  className="ml-2 text-indigo-600 hover:text-indigo-900"
                >
                  <MdClear size={16} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* ##################################### */}

        {/* Tasks Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Project Tasks
            </h2>
            {userRole?.role == "developer" || userRole?.role == "viewer" ? (
              ""
            ) : (
              <button
                onClick={() => setTaskOpen(!taskOpen)}
                className="bg-indigo-600 text-white gap-2 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
              >
                <IoMdAddCircleOutline size={22} />
                Add Task
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned By
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Create Date
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentData.map((task) => {
                  return (
                    <tr
                      key={task.id}
                      className={` ${
                        task.priority == "critical"
                          ? "bg-red-100"
                          : "hover:bg-gray-50"
                      } `}
                    >
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">
                          {task.title}
                        </div>
                        <div className="text-gray-500 text-sm mt-1">
                          {task.description}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                            <span className="text-indigo-800 text-sm font-medium">
                              {task?.assignedTo?.name.charAt(0)}
                            </span>
                          </div>
                          <span>{task?.assignedTo?.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                            <span className="text-indigo-800 text-sm font-medium">
                              {task?.createdBy?.name.charAt(0)}
                            </span>
                          </div>
                          <span>{task?.createdBy?.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {getPriorityBadge(task.priority)}
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(task.status)}
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600">
                          {formatDate(task.createdAt)}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="text-gray-600">
                          {formatDate(task.dueDate)}
                        </span>
                      </td>
                      {name == task?.createdBy?.name && (
                        <td className="py-4 ">
                          <span className="text-gray-600 flex justify-center">
                            <button
                              onClick={() => deleteTask(task?.id)}
                              className="cursor-pointer hover:text-red-600 transition-all duration-700 ease-in-out"
                            >
                              <MdDeleteOutline size={20} />
                            </button>
                            <button
                              onClick={() => OpenEditForm(task?.id)}
                              className="cursor-pointer hover:text-green-600 transition-all duration-700 ease-in-out"
                            >
                              <MdEdit size={20} />
                            </button>
                          </span>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-end w-full gap-3 items-center pt-10">
              <button
                onClick={() => prevPage()}
                disabled={currentPage === 1}
                className={`p-2 rounded-full cursor-pointer ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-indigo-200"
                }`}
              >
                <GoArrowLeft color="#372aac" size={18} />
              </button>

              <h1 className="text-lg font-semibold">{currentPage}</h1>

              <button
                onClick={() => nextPage()}
                disabled={currentPage === totapages}
                className={`p-2 rounded-full cursor-pointer ${
                  currentPage === totapages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-indigo-200"
                }`}
              >
                <GoArrowRight color="#372aac" size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Add Member Modal */}
        <AddMemberModel
          setOpen={setMemberOpen}
          open={memberOpen}
          projectId={id}
          fetchSingleProjectData={fetchSingleProjectData}
        />

        {/* Add Task Modal */}
        <AddTaskModal
          setOpen={setTaskOpen}
          open={taskOpen}
          projectId={id}
          teamMembers={project?.members}
          fetchTasks={allProjectTasks}
          taskId={taskId}
          setTaskId={setTaskId}
        />
      </div>
    </div>
  );
};

export default ProjectDashboard;