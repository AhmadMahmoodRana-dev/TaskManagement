// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import { 
  HiOutlineMenu, 
  HiOutlineBell, 
  HiOutlineSearch, 
  HiOutlinePlus,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineUserCircle,
  HiOutlineDocumentText,
  HiOutlineUserGroup,
  HiOutlineChartBar,
  HiOutlineCog
} from 'react-icons/hi';

const Home = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete project proposal', category: 'Work', priority: 'High', completed: false, date: '2023-05-15' },
    { id: 2, title: 'Team meeting with design', category: 'Work', priority: 'Medium', completed: false, date: '2023-05-16' },
    { id: 3, title: 'Buy groceries', category: 'Personal', priority: 'Medium', completed: true, date: '2023-05-14' },
    { id: 4, title: 'Gym workout', category: 'Health', priority: 'Low', completed: false, date: '2023-05-15' },
    { id: 5, title: 'Update portfolio website', category: 'Work', priority: 'High', completed: false, date: '2023-05-17' },
    { id: 6, title: 'Call mom', category: 'Personal', priority: 'Low', completed: true, date: '2023-05-14' },
  ]);

  const [projects, setProjects] = useState([
    { id: 1, name: 'Website Redesign', progress: 75, tasks: 12, color: 'bg-indigo-500' },
    { id: 2, name: 'Mobile App', progress: 40, tasks: 8, color: 'bg-teal-500' },
    { id: 3, name: 'Marketing Campaign', progress: 30, tasks: 5, color: 'bg-amber-500' },
  ]);

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Alex Morgan', role: 'Designer', online: true },
    { id: 2, name: 'Jamie Smith', role: 'Developer', online: true },
    { id: 3, name: 'Taylor Johnson', role: 'Project Manager', online: false },
    { id: 4, name: 'Jordan Williams', role: 'QA Engineer', online: true },
  ]);

  const [newTask, setNewTask] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      const task = {
        id: tasks.length + 1,
        title: newTask,
        category: 'Personal',
        priority: 'Medium',
        completed: false,
        date: new Date().toISOString().split('T')[0]
      };
      setTasks([task, ...tasks]);
      setNewTask('');
    }
  };

  const filteredTasks = activeTab === 'all' 
    ? tasks 
    : tasks.filter(task => task.category.toLowerCase() === activeTab);

  const pendingTasks = tasks.filter(task => !task.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;

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
                  placeholder="Search..."
                />
              </div>
              
              <button className="relative p-1 text-gray-500 hover:text-gray-700">
                <HiOutlineBell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              
              <div className="relative">
                <img 
                  className="h-8 w-8 rounded-full object-cover" 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Profile" 
                />
                <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 border-2 border-white"></div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
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
                      <p className="text-sm font-medium text-gray-500">Total Tasks</p>
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
                      <p className="text-sm font-medium text-gray-500">Pending</p>
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
                      <p className="text-sm font-medium text-gray-500">Completed</p>
                      <p className="text-2xl font-semibold">{completedTasks}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Add Task */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Add New Task</h3>
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                    className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter a new task..."
                  />
                  <button 
                    onClick={addTask}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-r-lg flex items-center"
                  >
                    <HiOutlinePlus className="h-5 w-5" />
                    <span className="ml-1">Add</span>
                  </button>
                </div>
              </div>
              
              {/* Tasks List */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="border-b border-gray-200">
                  <div className="flex">
                    <button 
                      className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'all' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('all')}
                    >
                      All Tasks
                    </button>
                    <button 
                      className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'work' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('work')}
                    >
                      Work
                    </button>
                    <button 
                      className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'personal' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setActiveTab('personal')}
                    >
                      Personal
                    </button>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {filteredTasks.map(task => (
                    <div key={task.id} className="p-4 flex items-start hover:bg-gray-50 transition-colors duration-150">
                      <button 
                        onClick={() => toggleTaskStatus(task.id)}
                        className={`flex-shrink-0 h-5 w-5 mt-1 rounded-full border flex items-center justify-center ${task.completed ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'}`}
                      >
                        {task.completed && (
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                      <div className="ml-3 flex-1">
                        <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                          {task.title}
                        </p>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <span className="flex items-center">
                            <HiOutlineCalendar className="h-4 w-4 mr-1" />
                            {task.date}
                          </span>
                          <span className="mx-2">•</span>
                          <span className={`px-2 py-0.5 rounded-full ${task.priority === 'High' ? 'bg-red-100 text-red-800' : task.priority === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${task.category === 'Work' ? 'bg-indigo-100 text-indigo-800' : task.category === 'Health' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'}`}>
                          {task.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              {/* Projects */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Projects</h3>
                  <button className="text-indigo-600 text-sm font-medium">View All</button>
                </div>
                
                <div className="space-y-4">
                  {projects.map(project => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-800">{project.name}</h4>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                          {project.tasks} tasks
                        </span>
                      </div>
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
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Team Members */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Team Members</h3>
                  <button className="text-indigo-600 text-sm font-medium">View All</button>
                </div>
                
                <div className="space-y-3">
                  {teamMembers.map(member => (
                    <div key={member.id} className="flex items-center">
                      <div className="relative">
                        <HiOutlineUserCircle className="h-10 w-10 text-gray-400" />
                        {member.online && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-800">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                      <button className="ml-auto text-indigo-600 text-sm font-medium">Message</button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Upcoming Deadlines */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Upcoming Deadlines</h3>
                  <button className="text-indigo-600 text-sm font-medium">View All</button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-indigo-100 text-indigo-800 rounded-lg p-2">
                      <HiOutlineCalendar className="h-6 w-6" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-800">Project Review Meeting</p>
                      <p className="text-xs text-gray-500 mt-1">Tomorrow, 10:00 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-amber-100 text-amber-800 rounded-lg p-2">
                      <HiOutlineDocumentText className="h-6 w-6" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-800">Submit Quarterly Report</p>
                      <p className="text-xs text-gray-500 mt-1">May 20, 2023</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 text-green-800 rounded-lg p-2">
                      <HiOutlineUserGroup className="h-6 w-6" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-800">Team Building Event</p>
                      <p className="text-xs text-gray-500 mt-1">May 25, 2023</p>
                    </div>
                  </div>
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