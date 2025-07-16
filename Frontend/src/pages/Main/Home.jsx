import { useContext} from "react";
import { useState } from "react";
import {HiOutlineBell,HiOutlineSearch,HiOutlineCalendar,HiOutlineClock,HiOutlineCheckCircle,HiOutlineDocumentText,HiOutlineDotsVertical} from "react-icons/hi";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import formatDate from "../../constant/FormatDate";

const Home = () => {
  const {projects,tasks } = useContext(Context);
  const name = localStorage.getItem("authName");
  const [activeTab, setActiveTab] = useState("all");

 

  const [stats, setStats] = useState({
    productivity: 78,
    dailyCompleted: 12,
    weeklyGoal: 85,
  });

  const filteredTasks = activeTab === "all" ? tasks : tasks.filter((task) => task.priority.toLowerCase() === activeTab);
  const pendingTasks = tasks.filter((task) => task.status !== "completed").length;
  const completedTasks = tasks.filter((task) => task.status == "completed").length;

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

              <Link to={"/profileForm"} className="relative">
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
            <h1 className="text-2xl font-bold mb-2">Welcome back, {name}!</h1>
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
                        activeTab === "high"
                          ? "text-indigo-600 border-b-2 border-indigo-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveTab("high")}
                    >
                      High
                    </button>
                    <button
                      className={`flex-1 py-4 px-6 text-center font-medium ${
                        activeTab === "personal"
                          ? "text-indigo-600 border-b-2 border-indigo-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveTab("medium")}
                    >
                      Medium
                    </button>
                    <button
                      className={`flex-1 py-4 px-6 text-center font-medium ${
                        activeTab === "health"
                          ? "text-indigo-600 border-b-2 border-indigo-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveTab("low")}
                    >
                      Low
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                      <div
                        key={task.id}
                        className="p-4 flex items-start hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                      >
                        <button className={`flex-shrink-0 h-5 w-5 mt-1 rounded-full border flex items-center justify-center ${
                            task.status == "completed"
                              ? "bg-indigo-600 border-indigo-600"
                              : "border-gray-300"
                          }`}
                        >
                          { task.status == "completed" && (
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
                               task.status == "completed"
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
                              {formatDate(task?.createdAt)}
                            </span>
                            <span className="mx-2">•</span>
                            <span
                              className={`px-2 py-0.5 rounded-full ${
                                task.priority === "high"
                                  ? "bg-red-100 text-red-800"
                                  : task.priority === "medium"
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
                            className={`text-xs px-2 py-1 rounded-full capitalize ${
                              task.category === "Work"
                                ? "bg-indigo-100 text-indigo-800"
                                : task.category === "Health"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {task.status}
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;