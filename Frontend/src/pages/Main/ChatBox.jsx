import { useState, useEffect, useRef } from "react";
import BASEURL from "../../constant/BaseUrl";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChatBox = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const token = localStorage.getItem("authToken");
  const authId = localStorage.getItem("authId");

  // SINGLE PROJECT DETAIL

  const fetchSingleProjectData = async () => {
    try {
      const { data } = await axios.get(
        `${BASEURL}/project/singleProject/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProject(data.data);
      console.log("SINGLE PROJECT 111", data.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchSingleProjectData();
    fetchMessages();
  }, []);

  // SEND MESSAGE
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASEURL}/project/${projectId}/messages`,
        {
          message: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchMessages();
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // FETCH MESSAGES

  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(
        `${BASEURL}/projects/${projectId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Messages:", data);
      setMessages(data.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };


  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-indigo-50 to-purple-50 ">
      <div className="flex flex-col w-full  mx-auto bg-white shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-800 to-indigo-900 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Design Team Chat</h1>
              <div className="flex items-center mt-1">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <p>online now</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full hover:bg-indigo-500 transition">
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </button>
              <button className="p-2 rounded-full hover:bg-indigo-500 transition">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <button className="p-2 rounded-full hover:bg-indigo-500 transition">
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
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Online Users Panel */}
          <div className="hidden md:block w-80 border-[#352ba1]  border-r-8 rounded-se-xl  p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold text-indigo-900 mb-4">
              Team Members
            </h2>
            <div className="space-y-3">
              {project?.members?.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center p-3 bg-white rounded-xl shadow-sm"
                >
                  <div className="relative">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                    {!user.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-800">
                      {user.user.name}
                    </p>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>
                  {user.isOnline && (
                    <span className="ml-auto text-xs text-gray-400">
                      Offline
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex flex-col flex-1">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="max-w-3xl mx-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex mb-4 ${
                      message?.sender?._id == authId
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {message?.sender?._id != authId && (
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex-shrink-0 mr-3 mt-1" />
                    )}
                    <div
                      className={`max-w-xs md:max-w-md rounded-2xl px-4 py-3 ${
                        message?.sender?._id == authId
                          ? "bg-indigo-600 text-white rounded-br-none"
                          : "bg-white text-gray-800 rounded-bl-none shadow-sm"
                      }`}
                    >
                      {!message?.sender?._id != authId && (
                        <p className="font-semibold text-sm">
                          {message?.sender?.name}
                        </p>
                      )}
                      <p>{message?.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message?.sender?._id == authId
                            ? "text-indigo-200"
                            : "text-gray-500"
                        }`}
                      >
                        {message?.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4 bg-white">
              <form onSubmit={handleSendMessage} className="flex items-center">
                <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2 mr-3">
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700 mr-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0"
                  />
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700 ml-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatBox;
