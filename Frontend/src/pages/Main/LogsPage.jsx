// src/components/LogsPage.jsx
import React, { useState } from 'react';
import LogEntry from '../../components/logs/LogEntry';
import LogFilter from '../../components/logs/LogFilter';
import LogStats from '../../components/logs/LogStats';

const LogsPage = () => {
  const [filter, setFilter] = useState({
    type: 'all',
    user: 'all',
    dateRange: 'all',
    search: '',
  });

  // Mock log data
  const logData = [
    {
      id: 1,
      timestamp: '2023-06-15 09:30:15',
      action: 'created',
      entity: 'Task',
      entityTitle: 'Design new dashboard',
      user: 'Alex Johnson',
      details: 'Created new task with high priority',
      icon: '📝',
      color: 'bg-blue-100',
    },
    {
      id: 2,
      timestamp: '2023-06-15 10:45:22',
      action: 'updated',
      entity: 'Task',
      entityTitle: 'Fix authentication bug',
      user: 'Sarah Williams',
      details: 'Changed status from "To Do" to "In Progress"',
      icon: '🔄',
      color: 'bg-yellow-100',
    },
    {
      id: 3,
      timestamp: '2023-06-15 11:20:05',
      action: 'commented',
      entity: 'Task',
      entityTitle: 'Update documentation',
      user: 'Michael Chen',
      details: 'Added comment: "Need more details about API endpoints"',
      icon: '💬',
      color: 'bg-purple-100',
    },
    {
      id: 4,
      timestamp: '2023-06-15 14:15:33',
      action: 'completed',
      entity: 'Task',
      entityTitle: 'Implement user profile page',
      user: 'Emma Rodriguez',
      details: 'Marked task as completed',
      icon: '✅',
      color: 'bg-green-100',
    },
    {
      id: 5,
      timestamp: '2023-06-15 16:40:18',
      action: 'deleted',
      entity: 'Task',
      entityTitle: 'Redesign old components',
      user: 'David Kim',
      details: 'Permanently deleted task',
      icon: '🗑️',
      color: 'bg-red-100',
    },
    {
      id: 6,
      timestamp: '2023-06-16 08:15:42',
      action: 'assigned',
      entity: 'Task',
      entityTitle: 'Database optimization',
      user: 'Alex Johnson',
      details: 'Assigned task to Sarah Williams',
      icon: '👤',
      color: 'bg-indigo-100',
    },
    {
      id: 7,
      timestamp: '2023-06-16 10:30:11',
      action: 'updated',
      entity: 'Project',
      entityTitle: 'E-commerce Platform',
      user: 'Lisa Anderson',
      details: 'Changed deadline to July 15th',
      icon: '🔄',
      color: 'bg-yellow-100',
    },
    {
      id: 8,
      timestamp: '2023-06-16 13:45:29',
      action: 'archived',
      entity: 'Task',
      entityTitle: 'Initial research',
      user: 'Robert Taylor',
      details: 'Archived completed task',
      icon: '📦',
      color: 'bg-gray-100',
    },
  ];

  // Filter logs based on filter settings
  const filteredLogs = logData.filter(log => {
    // Filter by type
    if (filter.type !== 'all' && log.action !== filter.type) return false;
    
    // Filter by user
    if (filter.user !== 'all' && log.user !== filter.user) return false;
    
    // Simple search filter
    if (filter.search && !(
      log.entityTitle.toLowerCase().includes(filter.search.toLowerCase()) ||
      log.details.toLowerCase().includes(filter.search.toLowerCase()) ||
      log.user.toLowerCase().includes(filter.search.toLowerCase())
    )) return false;
    
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Activity Logs</h1>
              <p className="text-indigo-100 mt-1">Track all actions and changes in your task management system</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <div className="text-4xl">📋</div>
            </div>
          </div>
        </div>
        
        {/* Stats and Filters */}
        <div className="border-b border-gray-200">
          <div className="p-6">
            <LogStats logs={logData} />
          </div>
          <div className="px-6 pb-6">
            <LogFilter filter={filter} setFilter={setFilter} users={[...new Set(logData.map(log => log.user))]} />
          </div>
        </div>
        
        {/* Log Entries */}
        <div className="divide-y divide-gray-100">
          {filteredLogs.length > 0 ? (
            filteredLogs.map(log => (
              <LogEntry key={log.id} log={log} />
            ))
          ) : (
            <div className="py-12 text-center">
              <div className="text-gray-400 text-5xl mb-4">📭</div>
              <h3 className="text-lg font-medium text-gray-700">No matching logs found</h3>
              <p className="text-gray-500 mt-1">Try adjusting your filters to see more results</p>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 text-sm text-gray-500 flex justify-between items-center">
          <div>Showing {filteredLogs.length} of {logData.length} log entries</div>
          <div>Last updated: Today at 16:45</div>
        </div>
      </div>
    </div>
  );
};

export default LogsPage;