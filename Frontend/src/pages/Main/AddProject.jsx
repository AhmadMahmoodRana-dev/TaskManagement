import { useContext, useEffect, useState } from "react";
import {FaPlus,FaSearch,FaUserFriends,FaUserCog,FaCode,FaEye} from "react-icons/fa";
import ProjectModel from "../../components/models/ProjectModel";
import { Link } from "react-router-dom";
import { useDebouncedSearch } from "../../hooks/useDebouncedSearch";
import { Context } from "../../context/Context";

const AddProject = () => {
  const {projects} = useContext(Context)
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedQuery = useDebouncedSearch(searchTerm, 700);


  const filteredProjects = projects?.filter(
    (project) =>
      project?.name?.toLowerCase()?.includes(debouncedQuery.toLowerCase()) ||
      project?.description?.toLowerCase()?.includes(debouncedQuery.toLowerCase())
  );

  const getRoleIcon = (role) => {
    switch (role) {
      case "owner":
        return <FaUserCog className="text-purple-600" />;
      case "manager":
        return <FaUserCog className="text-blue-500" />;
      case "developer":
        return <FaCode className="text-green-500" />;
      case "viewer":
        return <FaEye className="text-gray-500" />;
      default:
        return <FaUserFriends className="text-indigo-500" />;
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 w-full">
        <div className="">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Project Hub</h1>
              <p className="text-gray-600">Manage your development projects</p>
            </div>

            <div className="flex space-x-4 mt-4 md:mt-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>

              <button
                onClick={() => setOpen(!open)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition duration-300 lg:text-md text-sm "
              >
                <FaPlus className="mr-2" /> New Project
              </button>
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-gray-800">
                      {project.name}
                    </h2>
                    <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>

                  <p className="mt-3 text-gray-600 min-h-[60px]">
                    {project.description || "No description provided"}
                  </p>

                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Team Members
                      </span>
                      <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                        {project.members.length} members
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.members.map((member, index) => (
                        <>
                        <div
                          key={index}
                          className="flex items-center bg-gray-50 rounded-full px-3 pb-5 text-sm"
                          title={`${member.user.name} (${member.role})`}
                        >
                          <span className="mr-2">
                            {getRoleIcon(member.role)}
                          </span>
                          <span className="text-gray-700 truncate max-w-[80px]">
                            {member.user.name}
                          </span>
                        </div>
                        </>
                      ))}
                    </div>
                  </div>

                  <Link to={`/project-dashboard/${project?._id}`} className="mt-10 px-3 w-full bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-2 rounded-lg transition duration-300">
                    View Project Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FaUserFriends className="text-gray-500 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                No projects found
              </h3>
              <p className="mt-1 text-gray-500">
                Create a new project or adjust your search
              </p>
            </div>
          )}
        </div>
      </div>
      <ProjectModel setOpen={setOpen} open={open} />
    </>
  );
};

export default AddProject;
