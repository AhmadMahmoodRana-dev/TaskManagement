const LogEntry = ({ log }) => {
  // Action label mapping
  const actionLabels = {
    created: { label: 'Created', color: 'text-blue-600' },
    updated: { label: 'Updated', color: 'text-yellow-600' },
    deleted: { label: 'Deleted', color: 'text-red-600' },
    completed: { label: 'Completed', color: 'text-green-600' },
    commented: { label: 'Commented', color: 'text-purple-600' },
    assigned: { label: 'Assigned', color: 'text-indigo-600' },
    archived: { label: 'Archived', color: 'text-gray-600' },
  };

  const actionInfo = actionLabels[log.action] || { label: log.action, color: 'text-gray-600' };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors duration-150">
      <div className="flex">
        {/* Icon */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${log.color}`}>
          <span className="text-xl">{log.icon}</span>
        </div>
        
        {/* Content */}
        <div className="ml-4 flex-1">
          <div className="flex justify-between">
            <div>
              <span className="font-medium text-gray-900">{log.user}</span>
              {' '}
              <span className={actionInfo.color}>{actionInfo.label}</span>
              {' '}
              <span className="font-medium text-gray-900">{log.entity}</span>
              : {' '}
              <span className="font-medium text-gray-900">"{log.entityTitle}"</span>
            </div>
            <div className="text-sm text-gray-500">{log.timestamp}</div>
          </div>
          
          <div className="mt-2 text-gray-600 bg-gray-50 rounded-lg p-3 text-sm">
            {log.details}
          </div>
          
          <div className="mt-3 flex space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {log.entity}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {log.action}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogEntry;