// src/components/LogStats.jsx
import React from 'react';

const LogStats = ({ logs }) => {
  // Calculate statistics
  const totalLogs = logs.length;
  const today = new Date().toISOString().split('T')[0];
  const todaysLogs = logs.filter(log => log.timestamp.startsWith(today)).length;
  
  // Count actions
  const actionCounts = logs.reduce((acc, log) => {
    acc[log.action] = (acc[log.action] || 0) + 1;
    return acc;
  }, {});
  
  // Find most active user
  const userCounts = logs.reduce((acc, log) => {
    acc[log.user] = (acc[log.user] || 0) + 1;
    return acc;
  }, {});
  
  const mostActiveUser = Object.keys(userCounts).reduce((a, b) => 
    userCounts[a] > userCounts[b] ? a : b, '');
  
  const stats = [
    { name: 'Total Logs', value: totalLogs, change: '+12% from last week' },
    { name: "Today's Logs", value: todaysLogs, change: '+3 from yesterday' },
    { name: 'Most Active User', value: mostActiveUser, change: `${userCounts[mostActiveUser]} actions` },
    { name: 'Most Common Action', value: actionCounts['updated'] ? 'Updated' : 'Created', change: `${actionCounts['updated'] || actionCounts['created']} times` },
  ];

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Log Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</dd>
            <div className="mt-1 text-xs text-gray-500">{stat.change}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogStats;