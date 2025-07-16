import {useState, useEffect, useRef} from "react";
import BASEURL from "../../constant/BaseUrl";
import {useParams} from "react-router-dom";
import axios from "axios";
import {MdOutlineAttachEmail, MdEmojiEmotions, MdSend,MdAttachFile} from "react-icons/md";
import {FaMicrophone, FaStop, FaFileUpload, FaTrash} from "react-icons/fa";

const ChatBox = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const token = localStorage.getItem("authToken");
  const authId = localStorage.getItem("authId");
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editText, setEditText] = useState("");

  // For file upload
  const [file, setFile] = useState(null);
  // For voice recording
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const fileInputRef = useRef(null);

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
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  useEffect(() => {
    fetchSingleProjectData();
    fetchMessages();
  }, []);

  // SEND MESSAGE
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !file && !audioBlob) return;

    try {
      const formData = new FormData();
      
      if (file) {
        formData.append("file", file);
        formData.append("type", "file");
      } else if (audioBlob) {
        const audioFile = new File([audioBlob], "voice-message.webm", {
          type: "audio/webm"
        });
        formData.append("file", audioFile);
        formData.append("type", "voice");
      } else {
        formData.append("message", newMessage);
        formData.append("type", "text");
      }

      await axios.post(
        `${BASEURL}/project/${projectId}/messages`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Reset states
      setNewMessage("");
      setFile(null);
      setAudioBlob(null);
      fetchMessages();
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
      setMessages(data.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // DELETE MESSAGE
  const handleDeleteMessage = async (messageId) => {
    try {
      await axios.delete(`${BASEURL}/projects/${projectId}/messages/${messageId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMessages();
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  // EDIT MESSAGE
  const handleStartEdit = (message) => {
    setEditingMessageId(message._id);
    setEditText(message.message);
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditText("");
  };

  const handleUpdateMessage = async (messageId) => {
    if (!editText.trim()) {
      handleCancelEdit();
      return;
    }

    try {
      await axios.put(
        `${BASEURL}/projects/${projectId}/messages/${messageId}`,
        { message: editText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchMessages();
      setEditingMessageId(null);
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  // AUTO SCROLL
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // FORMAT TIMESTAMP
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // File input change handler
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAudioBlob(null);
    }
  };

  // Start voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
        setFile(null);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error starting recording:", err);
      alert("Microphone access is required for voice messages");
    }
  };

  // Stop voice recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  // Render attachment preview
  const renderAttachmentPreview = () => {
    if (file) {
      return (
        <div className="flex items-center justify-between p-2 bg-indigo-50 rounded-lg mb-2">
          <div className="flex items-center">
            <MdAttachFile className="text-indigo-600 mr-2" />
            <span className="truncate max-w-xs">{file.name}</span>
          </div>
          <button 
            onClick={() => setFile(null)}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </button>
        </div>
      );
    }

    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      return (
        <div className="flex items-center justify-between p-2 bg-indigo-50 rounded-lg mb-2">
          <audio controls src={audioUrl} className="w-full" />
          <button 
            onClick={() => setAudioBlob(null)}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-indigo-50 to-purple-50 ">
      <div className="flex flex-col w-full mx-auto bg-white shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-800 to-indigo-900 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Design Team Chat</h1>
              <div className="flex items-center mt-1">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <p>online now</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="hidden md:block w-80 border-[#352ba1] border-r-8 rounded-se-xl p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold text-indigo-900 mb-4">
              Team Members
            </h2>
            <div className="space-y-3">
              {project?.members?.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center p-3 bg-white rounded-xl shadow-sm"
                >
                  <div className="relative">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                    {user.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-800">
                      {user.user.name}
                    </p>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>
                  {!user.isOnline && (
                    <span className="ml-auto text-xs text-gray-400">
                      Offline
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="max-w-3xl mx-auto">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={`flex mb-4 ${
                      message?.sender?._id == authId
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {message?.sender?._id != authId && (
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex-shrink-0 mr-3 mt-1" />
                    )}

                    <div className="relative group">
                      {editingMessageId === message._id ? (
                        <div className="bg-white p-3 rounded-xl shadow-lg border border-indigo-200">
                          <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full p-2 border rounded-lg mb-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                            rows="2"
                            autoFocus
                          />
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={handleCancelEdit}
                              className="px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleUpdateMessage(message._id)}
                              className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`max-w-xs md:max-w-md rounded-2xl px-4 py-3 relative ${
                            message?.sender?._id == authId
                              ? "bg-indigo-600 text-white rounded-br-none"
                              : "bg-white text-gray-800 rounded-bl-none shadow-sm"
                          }`}
                        >
                          {message?.sender?._id != authId && (
                            <p className="font-semibold text-sm mb-1">
                              {message?.sender?.name}
                            </p>
                          )}
                          
                          {message.type === "text" ? (
                            <p>{message.message}</p>
                          ) : message.type === "file" ? (
                            <a 
                              href={message.fileUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center text-indigo-300 hover:text-indigo-100 underline"
                            >
                              <MdAttachFile className="mr-1" />
                              {message.fileName || "Download file"}
                            </a>
                          ) : (
                            <audio controls className="w-48 md:w-64 mt-2">
                              <source src={message.fileUrl} type={message.fileType} />
                              Your browser does not support audio playback.
                            </audio>
                          )}
                          
                          <p
                            className={`text-xs mt-1 text-right ${
                              message?.sender?._id == authId
                                ? "text-indigo-200"
                                : "text-gray-500"
                            }`}
                          >
                            {formatTime(message?.timestamp)}
                          </p>

                          {message?.sender?._id == authId && message.type === "text" && (
                            <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 bg-white rounded-full p-1 shadow-md">
                              <button
                                onClick={() => handleStartEdit(message)}
                                className="p-1 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-indigo-50"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteMessage(message._id)}
                                className="p-1 text-gray-600 hover:text-red-600 rounded-full hover:bg-red-50"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="border-t border-gray-200 p-4 bg-white">
              {renderAttachmentPreview()}
              <form onSubmit={handleSendMessage} className="flex items-center">
                <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2 mr-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="text-gray-500 hover:text-gray-700 mr-2 flex justify-center items-center"
                  >
                    <MdAttachFile size={20} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  <button
                    type="button"
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`mr-2 ${isRecording ? "text-red-500 animate-pulse" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    {isRecording ? <FaStop size={18} /> : <FaMicrophone size={18} />}
                  </button>
                  
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0"
                    disabled={isRecording}
                  />
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700 ml-2 justify-center items-center"
                  >
                    <MdEmojiEmotions size={20} />
                  </button>
                </div>
                <button
                  type="submit"
                  className="justify-center items-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <MdSend size={20} />
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