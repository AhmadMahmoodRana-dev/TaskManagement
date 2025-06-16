import { useEffect, useState } from "react";
import axios from "axios";
import BASEURL from "../../constant/BaseUrl";
import { useParams } from "react-router-dom";
import formatDate from "../../constant/FormatDate";
const ProjectDashboard = () => {
  const { id } = useParams();
  const token = localStorage.getItem("authToken");
  const [project, setProject] = useState({});

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

  useEffect(() => {
    fetchSingleProjectData();
  }, []);

  const [teamMembers, setTeamMembers] = useState([
    {
      id: "tm-001",
      name: "Alex Johnson",
      role: "Frontend Developer",
      email: "alex@example.com",
      tasks: 3,
    },
    {
      id: "tm-002",
      name: "Sarah Williams",
      role: "UI/UX Designer",
      email: "sarah@example.com",
      tasks: 5,
    },
    {
      id: "tm-003",
      name: "Michael Chen",
      role: "Backend Developer",
      email: "michael@example.com",
      tasks: 2,
    },
  ]);

  const [tasks, setTasks] = useState([
    {
      id: "task-001",
      title: "Design homepage layout",
      description: "Create wireframes and mockups for homepage",
      assignedTo: "tm-002",
      priority: "high",
      status: "in-progress",
      dueDate: "2023-10-15",
    },
    {
      id: "task-002",
      title: "Implement authentication",
      description: "Develop user authentication system",
      assignedTo: "tm-003",
      priority: "medium",
      status: "pending",
      dueDate: "2023-10-20",
    },
    {
      id: "task-003",
      title: "Create responsive components",
      description: "Build reusable React components",
      assignedTo: "tm-001",
      priority: "high",
      status: "completed",
      dueDate: "2023-10-05",
    },
    {
      id: "task-004",
      title: "Optimize performance",
      description: "Improve loading times and responsiveness",
      assignedTo: "tm-001",
      priority: "medium",
      status: "in-progress",
      dueDate: "2023-10-25",
    },
  ]);

  const [newMember, setNewMember] = useState({ name: "", role: "", email: "" });
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "medium",
    dueDate: "",
  });
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);

  const addTeamMember = () => {
    if (newMember.name && newMember.role && newMember.email) {
      const member = {
        id: `tm-${Date.now()}`,
        name: newMember.name,
        role: newMember.role,
        email: newMember.email,
        tasks: 0,
      };
      setTeamMembers([...teamMembers, member]);
      setNewMember({ name: "", role: "", email: "" });
      setShowAddMember(false);
    }
  };

  const addTask = () => {
    if (newTask.title && newTask.description && newTask.assignedTo) {
      const task = {
        id: `task-${Date.now()}`,
        title: newTask.title,
        description: newTask.description,
        assignedTo: newTask.assignedTo,
        priority: newTask.priority,
        status: "pending",
        dueDate: newTask.dueDate || new Date().toISOString().split("T")[0],
      };
      setTasks([...tasks, task]);

      // Update task count for assigned team member
      setTeamMembers(
        teamMembers.map((member) =>
          member.id === newTask.assignedTo
            ? { ...member, tasks: member.tasks + 1 }
            : member
        )
      );

      setNewTask({
        title: "",
        description: "",
        assignedTo: "",
        priority: "medium",
        dueDate: "",
      });
      setShowAddTask(false);
    }
  };

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
      "in-progress": "bg-blue-100 text-blue-800",
      pending: "bg-gray-100 text-gray-800",
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
                onClick={() => setShowAddMember(true)}
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
                  {tasks.filter((t) => t.status === "in-progress").length}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Pending</p>
                <p className="font-medium">
                  {tasks.filter((t) => t.status === "pending").length}
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
              onClick={() => setShowAddTask(true)}
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
                    Priority
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tasks.map((task) => {
                  const member = teamMembers.find(
                    (m) => m.id === task.assignedTo
                  );
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
                        {member ? (
                          <div className="flex items-center">
                            <div className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                              <span className="text-indigo-800 text-sm font-medium">
                                {member.name.charAt(0)}
                              </span>
                            </div>
                            <span>{member.name}</span>
                          </div>
                        ) : (
                          "Unassigned"
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {getPriorityBadge(task.priority)}
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(task.status)}
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600">{task.dueDate}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Member Modal */}
        {showAddMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    Add Team Member
                  </h3>
                  <button
                    onClick={() => setShowAddMember(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={newMember.name}
                      onChange={(e) =>
                        setNewMember({ ...newMember, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <input
                      type="text"
                      value={newMember.role}
                      onChange={(e) =>
                        setNewMember({ ...newMember, role: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter role"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={newMember.email}
                      onChange={(e) =>
                        setNewMember({ ...newMember, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter email"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowAddMember(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addTeamMember}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Add Member
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Task Modal */}
        {showAddTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    Add New Task
                  </h3>
                  <button
                    onClick={() => setShowAddTask(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Task Title
                    </label>
                    <input
                      type="text"
                      value={newTask.title}
                      onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter task title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={newTask.description}
                      onChange={(e) =>
                        setNewTask({ ...newTask, description: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter task description"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assign To
                    </label>
                    <select
                      value={newTask.assignedTo}
                      onChange={(e) =>
                        setNewTask({ ...newTask, assignedTo: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select team member</option>
                      {teamMembers.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.name} ({member.role})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                      </label>
                      <select
                        value={newTask.priority}
                        onChange={(e) =>
                          setNewTask({ ...newTask, priority: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Due Date
                      </label>
                      <input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) =>
                          setNewTask({ ...newTask, dueDate: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowAddTask(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addTask}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDashboard;
