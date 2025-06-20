import { useContext } from "react";
import { useState} from "react";
import {HiOutlineMenu,HiOutlineBell,HiOutlineSearch,HiOutlinePlus,HiOutlineCalendar,HiOutlineClock,HiOutlineCheckCircle,HiOutlineDocumentText,HiOutlineFilter,HiOutlineChevronDown,HiOutlineDotsVertical} from "react-icons/hi";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

const Home = () => {
  const {teamMembers} = useContext(Context)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete project proposal",
      category: "Work",
      priority: "High",
      completed: false,
      date: "2023-05-15",
      description: "Finalize and submit proposal to client",
    },
    {
      id: 2,
      title: "Team meeting with design",
      category: "Work",
      priority: "Medium",
      completed: false,
      date: "2023-05-16",
      description: "Discuss UI improvements",
    },
    {
      id: 3,
      title: "Buy groceries",
      category: "Personal",
      priority: "Medium",
      completed: true,
      date: "2023-05-14",
      description: "Milk, eggs, vegetables",
    },
    {
      id: 4,
      title: "Gym workout",
      category: "Health",
      priority: "Low",
      completed: false,
      date: "2023-05-15",
      description: "Cardio and strength training",
    },
    {
      id: 5,
      title: "Update portfolio website",
      category: "Work",
      priority: "High",
      completed: false,
      date: "2023-05-17",
      description: "Add new projects and case studies",
    },
    {
      id: 6,
      title: "Call mom",
      category: "Personal",
      priority: "Low",
      completed: true,
      date: "2023-05-14",
      description: "Check on birthday plans",
    },
  ]);

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Website Redesign",
      progress: 75,
      tasks: 12,
      color: "bg-indigo-500",
      deadline: "2023-06-15",
    },
    {
      id: 2,
      name: "Mobile App",
      progress: 40,
      tasks: 8,
      color: "bg-teal-500",
      deadline: "2023-07-10",
    },
    {
      id: 3,
      name: "Marketing Campaign",
      progress: 30,
      tasks: 5,
      color: "bg-amber-500",
      deadline: "2023-05-30",
    },
  ]);



  const [newTask, setNewTask] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    priority: "all",
    status: "all",
  });
  const [stats, setStats] = useState({
    productivity: 78,
    dailyCompleted: 12,
    weeklyGoal: 85,
  });

  const toggleTaskStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      const task = {
        id: tasks.length + 1,
        title: newTask,
        category: "Personal",
        priority: "Medium",
        completed: false,
        date: new Date().toISOString().split("T")[0],
        description: "Add task description",
      };
      setTasks([task, ...tasks]);
      setNewTask("");
    }
  };

  const filteredTasks =
    activeTab === "all"
      ? tasks
      : tasks.filter((task) => task.category.toLowerCase() === activeTab);

  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  // Filter tasks based on filter options
  const applyFilters = (tasks) => {
    return tasks.filter((task) => {
      const priorityMatch =
        filterOptions.priority === "all" ||
        task.priority === filterOptions.priority;
      const statusMatch =
        filterOptions.status === "all" ||
        (filterOptions.status === "completed" && task.completed) ||
        (filterOptions.status === "pending" && !task.completed);
      return priorityMatch && statusMatch;
    });
  };

  const finalTasks = applyFilters(filteredTasks);

  // Project progress indicator
  const ProjectProgress = ({ project }) => (
    <div className="mt-3">
      <div className="flex justify-between text-sm text-gray-500 mb-1">
        <span>Progress</span>
        <span>{project.progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${project.color} h-2 rounded-full`}
          style={{ width: `${project.progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>Deadline</span>
        <span>{project.deadline}</span>
      </div>
    </div>
  );

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="mr-4 text-gray-500 lg:hidden"
              >
                <HiOutlineMenu className="h-6 w-6" />
              </button>
              <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search tasks, projects..."
                />
              </div>

              <button className="relative p-1 text-gray-500 hover:text-gray-700">
                <HiOutlineBell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              <Link to={'/profileForm'} className="relative">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                />
                <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 border-2 border-white"></div>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white mb-6">
            <h1 className="text-2xl font-bold mb-2">Welcome back, Ahmad!</h1>
            <p className="opacity-90">
              You have {pendingTasks} pending tasks.{" "}
              {pendingTasks > 0 ? "Let's get things done!" : "Great job!"}
            </p>
            <div className="mt-4 flex items-center">
              <div className="flex-1 bg-white bg-opacity-20 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full"
                  style={{ width: `${stats.productivity}%` }}
                ></div>
              </div>
              <span className="ml-4 text-sm font-medium">
                {stats.productivity}% Productivity
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600">
                      <HiOutlineDocumentText className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">
                        Total Tasks
                      </p>
                      <p className="text-2xl font-semibold">{tasks.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-amber-100 text-amber-600">
                      <HiOutlineClock className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">
                        Pending
                      </p>
                      <p className="text-2xl font-semibold">{pendingTasks}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-green-100 text-green-600">
                      <HiOutlineCheckCircle className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">
                        Completed
                      </p>
                      <p className="text-2xl font-semibold">{completedTasks}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Task */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    Add New Task
                  </h3>
                  <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                    <HiOutlineFilter className="h-4 w-4 mr-1" />
                    Filter
                    <HiOutlineChevronDown className="h-4 w-4 ml-1" />
                  </button>
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTask()}
                    className="flex-1 border border-gray-300 rounded-l-lg py-3 px-4 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="What needs to be done?"
                  />
                  <button
                    onClick={addTask}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-r-lg flex items-center"
                  >
                    <HiOutlinePlus className="h-5 w-5" />
                    <span className="ml-1 hidden sm:inline">Add Task</span>
                  </button>
                </div>
              </div>

              {/* Tasks List */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="border-b border-gray-200">
                  <div className="flex">
                    <button
                      className={`flex-1 py-4 px-6 text-center font-medium ${
                        activeTab === "all"
                          ? "text-indigo-600 border-b-2 border-indigo-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveTab("all")}
                    >
                      All Tasks
                    </button>
                    <button
                      className={`flex-1 py-4 px-6 text-center font-medium ${
                        activeTab === "work"
                          ? "text-indigo-600 border-b-2 border-indigo-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveTab("work")}
                    >
                      Work
                    </button>
                    <button
                      className={`flex-1 py-4 px-6 text-center font-medium ${
                        activeTab === "personal"
                          ? "text-indigo-600 border-b-2 border-indigo-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveTab("personal")}
                    >
                      Personal
                    </button>
                    <button
                      className={`flex-1 py-4 px-6 text-center font-medium ${
                        activeTab === "health"
                          ? "text-indigo-600 border-b-2 border-indigo-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveTab("health")}
                    >
                      Health
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {finalTasks.length > 0 ? (
                    finalTasks.map((task) => (
                      <div
                        key={task.id}
                        className="p-4 flex items-start hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                        onClick={() => setShowTaskDetails(task)}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTaskStatus(task.id);
                          }}
                          className={`flex-shrink-0 h-5 w-5 mt-1 rounded-full border flex items-center justify-center ${
                            task.completed
                              ? "bg-indigo-600 border-indigo-600"
                              : "border-gray-300"
                          }`}
                        >
                          {task.completed && (
                            <svg
                              className="h-3 w-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </button>
                        <div className="ml-3 flex-1">
                          <p
                            className={`text-sm font-medium ${
                              task.completed
                                ? "line-through text-gray-400"
                                : "text-gray-800"
                            }`}
                          >
                            {task.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {task.description}
                          </p>
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <span className="flex items-center">
                              <HiOutlineCalendar className="h-4 w-4 mr-1" />
                              {task.date}
                            </span>
                            <span className="mx-2">•</span>
                            <span
                              className={`px-2 py-0.5 rounded-full ${
                                task.priority === "High"
                                  ? "bg-red-100 text-red-800"
                                  : task.priority === "Medium"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {task.priority}
                            </span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 ml-4 flex items-start">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              task.category === "Work"
                                ? "bg-indigo-100 text-indigo-800"
                                : task.category === "Health"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {task.category}
                          </span>
                          <button className="ml-2 text-gray-400 hover:text-gray-600">
                            <HiOutlineDotsVertical className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <div className="inline-block p-4 bg-indigo-50 rounded-full mb-3">
                        <HiOutlineCheckCircle className="h-10 w-10 text-indigo-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-800 mb-1">
                        No tasks found
                      </h3>
                      <p className="text-gray-500">
                        Try changing your filters or create a new task
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Productivity Overview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    Productivity
                  </h3>
                  <span className="text-sm font-medium text-indigo-600">
                    {stats.weeklyGoal}% Weekly Goal
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-cyan-50 to-indigo-50 rounded-lg p-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Tasks Completed
                      </span>
                      <span className="text-sm font-bold text-indigo-600">
                        {stats.dailyCompleted}/15
                      </span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{
                          width: `${(stats.dailyCompleted / 15) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Completed</p>
                      <p className="text-xl font-bold text-indigo-700 mt-1">
                        {completedTasks}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Tasks</p>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">In Progress</p>
                      <p className="text-xl font-bold text-amber-700 mt-1">
                        {pendingTasks}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Tasks</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    Projects
                  </h3>
                  <button className="text-indigo-600 text-sm font-medium">
                    View All
                  </button>
                </div>

                <div className="space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-800">
                          {project.name}
                        </h4>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                          {project.tasks} tasks
                        </span>
                      </div>
                      <ProjectProgress project={project} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Members */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    Team Members
                  </h3>
                  <button className="text-indigo-600 text-sm font-medium">
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center">
                      <div className="relative">
                        <img
                          src="https://img.freepik.com/premium-photo/men-design-logo-avatar_665280-69427.jpg?ga=GA1.1.917450233.1745315446&semt=ais_hybrid&w=740"
                          alt={member.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        {member.online && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-800">
                          {member.name} {member._id.slice(8,20)}
                        </p>
                        <p className="text-xs text-gray-500">{member.email}</p>
                      </div>
                      <button className="ml-auto text-indigo-600 text-sm font-medium">
                        Message
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Task Detail Panel */}
      {showTaskDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">
                  Task Details
                </h3>
                <button
                  onClick={() => setShowTaskDetails(null)}
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
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <button
                    onClick={() => toggleTaskStatus(showTaskDetails.id)}
                    className={`flex-shrink-0 h-6 w-6 rounded-full border flex items-center justify-center ${
                      showTaskDetails.completed
                        ? "bg-indigo-600 border-indigo-600"
                        : "border-gray-300"
                    }`}
                  >
                    {showTaskDetails.completed && (
                      <svg
                        className="h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                  <h4
                    className={`ml-3 text-lg font-bold ${
                      showTaskDetails.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {showTaskDetails.title}
                  </h4>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    showTaskDetails.category === "Work"
                      ? "bg-indigo-100 text-indigo-800"
                      : showTaskDetails.category === "Health"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {showTaskDetails.category}
                </span>
              </div>

              <div className="mt-6">
                <p className="text-gray-600">{showTaskDetails.description}</p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Due Date</p>
                    <p className="flex items-center mt-1">
                      <HiOutlineCalendar className="h-5 w-5 text-gray-400 mr-2" />
                      {showTaskDetails.date}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Priority</p>
                    <p
                      className={`mt-1 px-3 py-1 inline-block rounded-full text-sm ${
                        showTaskDetails.priority === "High"
                          ? "bg-red-100 text-red-800"
                          : showTaskDetails.priority === "Medium"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {showTaskDetails.priority}
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-sm text-gray-500 mb-2">Assigned to</p>
                  <div className="flex items-center">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Assignee"
                      className="h-8 w-8 rounded-full mr-2"
                    />
                    <span className="font-medium">Sarah Johnson</span>
                  </div>
                </div>

                <div className="mt-8 flex space-x-3">
                  <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-medium">
                    Edit Task
                  </button>
                  <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg font-medium">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
