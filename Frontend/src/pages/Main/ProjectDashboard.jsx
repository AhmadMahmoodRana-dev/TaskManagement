import { useState } from 'react';
import { FiCalendar, FiUsers, FiCheckCircle, FiClock, FiAlertCircle, FiBarChart2, FiMessageSquare, FiPaperclip } from 'react-icons/fi';

const ProjectDashboard = ({ project }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [newComment, setNewComment] = useState('');

  // Sample data - replace with your actual data
  const projectData = {
    id: 1,
    title: 'Website Redesign Project',
    description: 'Complete redesign of company website with modern UI/UX principles',
    status: 'In Progress',
    progress: 65,
    startDate: '2023-06-01',
    endDate: '2023-08-15',
    team: [
      { id: 1, name: 'Alex Johnson', role: 'Designer', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { id: 2, name: 'Sam Wilson', role: 'Developer', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
      { id: 3, name: 'Taylor Smith', role: 'Project Manager', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
    ],
    tasks: [
      { id: 1, title: 'Create wireframes', status: 'completed', dueDate: '2023-06-10' },
      { id: 2, title: 'Design homepage', status: 'completed', dueDate: '2023-06-20' },
      { id: 3, title: 'Develop responsive layout', status: 'in-progress', dueDate: '2023-07-05' },
      { id: 4, title: 'Implement CMS integration', status: 'pending', dueDate: '2023-07-20' },
      { id: 5, title: 'Testing and QA', status: 'pending', dueDate: '2023-08-01' },
    ],
    comments: [
      { id: 1, user: 'Alex Johnson', text: 'Wireframes approved by client', time: '2 days ago' },
      { id: 2, user: 'Sam Wilson', text: 'Need clarification on the color scheme', time: '1 day ago' },
    ],
    files: [
      { id: 1, name: 'Design_Specs.pdf', size: '2.4 MB' },
      { id: 2, name: 'Wireframes.sketch', size: '5.1 MB' },
    ]
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Add comment logic here
      setNewComment('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">{projectData.title}</h1>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                projectData.status === 'Completed' 
                  ? 'bg-green-100 text-green-800' 
                  : projectData.status === 'In Progress' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-yellow-100 text-yellow-800'
              }`}>
                {projectData.status}
              </span>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                Edit Project
              </button>
            </div>
          </div>
          <p className="mt-2 text-gray-600">{projectData.description}</p>
          
          <div className="mt-4 flex items-center space-x-6 text-sm">
            <div className="flex items-center text-gray-500">
              <FiCalendar className="mr-2" />
              <span>Start: {projectData.startDate}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <FiCalendar className="mr-2" />
              <span>End: {projectData.endDate}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <FiUsers className="mr-2" />
              <span>{projectData.team.length} Team Members</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Project Progress</span>
            <span className="text-sm font-medium text-gray-700">{projectData.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full" 
              style={{ width: `${projectData.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tasks'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tasks
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'team'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Team
            </button>
            <button
              onClick={() => setActiveTab('discussion')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'discussion'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Discussion
            </button>
            <button
              onClick={() => setActiveTab('files')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'files'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Files
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Project Summary */}
              <div className="bg-white shadow rounded-lg p-6 md:col-span-2">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Summary</h2>
                <p className="text-gray-600 mb-6">{projectData.description}</p>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{projectData.tasks.filter(t => t.status === 'completed').length}</div>
                    <div className="text-sm text-gray-500">Completed</div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{projectData.tasks.filter(t => t.status === 'in-progress').length}</div>
                    <div className="text-sm text-gray-500">In Progress</div>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{projectData.tasks.filter(t => t.status === 'pending').length}</div>
                    <div className="text-sm text-gray-500">Pending</div>
                  </div>
                </div>
              </div>

              {/* Upcoming Deadlines */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Deadlines</h2>
                <ul className="space-y-4">
                  {projectData.tasks
                    .filter(t => t.status !== 'completed')
                    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                    .slice(0, 3)
                    .map(task => (
                      <li key={task.id} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          {task.status === 'completed' ? (
                            <FiCheckCircle className="h-5 w-5 text-green-500" />
                          ) : task.status === 'in-progress' ? (
                            <FiClock className="h-5 w-5 text-blue-500" />
                          ) : (
                            <FiAlertCircle className="h-5 w-5 text-yellow-500" />
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{task.title}</p>
                          <p className="text-sm text-gray-500">Due {task.dueDate}</p>
                        </div>
                      </li>
                    ))}
                </ul>
                <button className="mt-4 text-sm text-indigo-600 hover:text-indigo-800">
                  View all tasks →
                </button>
              </div>

              {/* Recent Activity */}
              <div className="bg-white shadow rounded-lg p-6 md:col-span-3">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {[...projectData.comments].reverse().slice(0, 3).map(comment => (
                    <div key={comment.id} className="flex items-start">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://randomuser.me/api/portraits/women/44.jpg"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{comment.user}</div>
                        <div className="text-sm text-gray-500">{comment.text}</div>
                        <div className="text-xs text-gray-400 mt-1">{comment.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Project Tasks</h2>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                  Add Task
                </button>
              </div>
              <ul className="divide-y divide-gray-200">
                {projectData.tasks.map(task => (
                  <li key={task.id} className="px-6 py-4 hover:bg-gray-50 transition">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={task.status === 'completed'}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${
                            task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
                          }`}>
                            {task.title}
                          </p>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            task.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : task.status === 'in-progress' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {task.status.replace('-', ' ')}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <FiCalendar className="mr-1.5 h-4 w-4 flex-shrink-0" />
                          <span>Due {task.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Project Team</h2>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                  Add Member
                </button>
              </div>
              <ul className="divide-y divide-gray-200">
                {projectData.team.map(member => (
                  <li key={member.id} className="px-6 py-4 hover:bg-gray-50 transition">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={member.avatar} alt="" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{member.name}</p>
                        <p className="text-sm text-gray-500 truncate">{member.role}</p>
                      </div>
                      <div>
                        <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                          Message
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Discussion Tab */}
          {activeTab === 'discussion' && (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Project Discussion</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {projectData.comments.map(comment => (
                    <div key={comment.id} className="flex items-start">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://randomuser.me/api/portraits/women/44.jpg"
                          alt=""
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-900">{comment.user}</div>
                          <div className="text-xs text-gray-400">{comment.time}</div>
                        </div>
                        <div className="mt-1 text-sm text-gray-700">
                          <p>{comment.text}</p>
                        </div>
                        <div className="mt-2 flex space-x-2">
                          <button className="text-xs text-gray-500 hover:text-gray-700">Like</button>
                          <button className="text-xs text-gray-500 hover:text-gray-700">Reply</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddComment} className="mt-6">
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt=""
                      />
                    </div>
                    <div className="flex-1">
                      <textarea
                        rows={3}
                        className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                      <div className="mt-2 flex justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            className="p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                          >
                            <FiPaperclip className="h-5 w-5" />
                            <span className="sr-only">Attach a file</span>
                          </button>
                        </div>
                        <button
                          type="submit"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Files Tab */}
          {activeTab === 'files' && (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Project Files</h2>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                  Upload File
                </button>
              </div>
              <ul className="divide-y divide-gray-200">
                {projectData.files.map(file => (
                  <li key={file.id} className="px-6 py-4 hover:bg-gray-50 transition">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                          <FiPaperclip className="h-5 w-5 text-gray-500" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-sm text-gray-500 truncate">{file.size}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                          Download
                        </button>
                        <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;