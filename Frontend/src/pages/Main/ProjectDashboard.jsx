import { useEffect, useState } from "react";
import axios from "axios";
import BASEURL from "../../constant/BaseUrl";
import { useParams } from "react-router-dom";
import formatDate from "../../constant/FormatDate";
import AddMemberModel from "../../components/models/AddMemberModel";
import AddTaskModal from "../../components/models/AddTaskModel";
const ProjectDashboard = () => {
  const [memberOpen, setMemberOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("authToken");
  const { id } = useParams();


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

  // USE EFFECT

  useEffect(() => {
    fetchSingleProjectData();
    allProjectTasks();
  }, []);

  const getPriorityBadge = (priority) => {
    const styles = {
      high: "bg-red-100 text-red-800",
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
              <button
                onClick={() => setMemberOpen(!memberOpen)}
                className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-indigo-700 transition-colors"
              >
                Add Member
              </button>
            </div>

            <div className="space-y-4">
              {project?.members?.map((member) => (
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

        {/* Tasks Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Project Tasks</h2>
            <button
              onClick={() => setTaskOpen(!taskOpen)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
              Add Task
            </button>
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
                {tasks.map((task) => {
                  return (
                    <tr key={task.id} className="hover:bg-gray-50">
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
                      <td className="py-4 px-4">
                        <span className="text-gray-600">
                          {formatDate(task.dueDate)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Member Modal */}
        <AddMemberModel
          setOpen={setMemberOpen}
          open={memberOpen}
          projectId={id}
        />

        {/* Add Task Modal */}
        <AddTaskModal
          setOpen={setTaskOpen}
          open={taskOpen}
          projectId={id}
          teamMembers={project?.members}
        />
      </div>
    </div>
  );
};

export default ProjectDashboard;
