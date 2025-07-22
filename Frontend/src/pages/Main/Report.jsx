import { useState, useEffect, useMemo } from "react";
import BASEURL from "../../constant/BaseUrl";
import axios from "axios";

const Report = () => {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    username: "",
    actions: [], // Changed to array for multi-select
    date: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showActionDropdown, setShowActionDropdown] = useState(false);
  const logsPerPage = 8;

  // Fetch logs from API
  const fetchAllLogs = async () => {
    try {
      const { data } = await axios.get(`${BASEURL}/logs`);
      setLogs(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllLogs();
  }, []);

  // Get unique action types for multi-select options
  const uniqueActions = useMemo(() => {
    return [...new Set(logs.map(log => log.action))];
  }, [logs]);

  // Handle multi-select changes
  const handleActionChange = (action) => {
    setFilters(prev => {
      if (prev.actions.includes(action)) {
        return {
          ...prev,
          actions: prev.actions.filter(a => a !== action)
        };
      } else {
        return {
          ...prev,
          actions: [...prev.actions, action]
        };
      }
    });
  };

  // Apply all filters
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      // Username filter
      if (filters.username && !log.user.name.toLowerCase().includes(filters.username.toLowerCase())) {
        return false;
      }
      
      // Action multi-select filter
      if (filters.actions.length > 0 && !filters.actions.includes(log.action)) {
        return false;
      }
      
      // Date filter
      if (filters.date) {
        const logDate = new Date(log.timestamp).toISOString().split('T')[0];
        if (logDate !== filters.date) {
          return false;
        }
      }
      
      return true;
    });
  }, [logs, filters]);

  // Pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Date formatter
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 w-full">
      <div className="mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            User Activity Report
          </h1>
          <p className="text-gray-600 mt-2">
            Monitor and track user actions within the system
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Username Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={filters.username}
                onChange={(e) => setFilters(prev => ({ ...prev, username: e.target.value }))}
                placeholder="Search users..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Action Multi-Select Filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Action Type
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-left flex justify-between items-center"
                  onClick={() => setShowActionDropdown(!showActionDropdown)}
                >
                  <span>
                    {filters.actions.length > 0 
                      ? `${filters.actions.length} selected` 
                      : "Filter by action..."}
                  </span>
                  <svg 
                    className={`h-5 w-5 text-gray-400 transition-transform ${showActionDropdown ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {showActionDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {uniqueActions.map((action) => (
                      <div 
                        key={action} 
                        className="relative py-2 pl-3 pr-9 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleActionChange(action)}
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            checked={filters.actions.includes(action)}
                            readOnly
                          />
                          <span className="ml-3 block font-normal truncate">
                            {action}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={filters.date}
                onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          {/* Selected Actions Tags */}
          {filters.actions.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.actions.map(action => (
                <span 
                  key={action}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {action}
                  <button
                    type="button"
                    className="ml-1.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-blue-500 hover:bg-blue-200 hover:text-blue-500 focus:bg-blue-500 focus:text-white focus:outline-none"
                    onClick={() => handleActionChange(action)}
                  >
                    <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                      <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentLogs.length > 0 ? (
                  currentLogs.map((log) => (
                    <tr key={log?.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {log?.user.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {log?.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {log?.action == "User Registered"
                          ? log?.description
                          : log?.description.split(" ").slice(0, -1).join(" ") + " " + log?.user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(log?.timestamp)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No matching records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">{indexOfFirstLog + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastLog, filteredLogs.length)}
                </span>{" "}
                of <span className="font-medium">{filteredLogs.length}</span> results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-4 py-2 text-sm rounded-md ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 text-sm rounded-md ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;