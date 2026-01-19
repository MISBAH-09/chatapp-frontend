import React, { Profiler } from "react";
import ChatArea from "./chatarea";
import { useState, useEffect} from "react";
import { FaEllipsisV, FaFilter, FaPlus,FaSearch } from "react-icons/fa";

import { fetchAllUsers , getConversation ,getAllConversation} from "../services/messageservices";


function Chatbar() {
  const Backend_url = "http://localhost:8000/media/"
  const [showUpperScreen, setShowUpperScreen] = useState(false);
  const [allusers, setAllUsers] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");
   const [activeconversationid, setActiveConversationId]= useState('');
  const [activeconversation, setActiveConversation]= useState(null);
  const [allconversations , setAllConversation] = useState([]);

  // const [conversation]
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchAllUsers();
        setAllUsers(response.data); 
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsers();
  }, []);

  const handleConversation = async (userId) => {
    try {
      const response = await getConversation(userId);
      setActiveConversation({
        // title : response.data.title,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        username :response.data.username,
        userid : response.data.id,
        profile: response.data.profile,
      });
      const conversation_id = response.data.conversation_id;
      setActiveConversationId(conversation_id)
      setShowUpperScreen(false);
    } catch (error) {
      console.error("Error getting conversation:", error);
    }
  };

  useEffect(() => {
    const getCoversations = async () => {
      try {
        const response = await getAllConversation();
        setAllConversation(response.data); // adjust if needed
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    getCoversations();
  }, []);


  return (
    <>
    {/* base div  */}
    <div className="flex flex-1">
      
      <div className="w-full md:w-1/3 lg:w-1/4 bg-gray-300 flex flex-col h-full md:shrink-0">

        {/* Chat tag */}
        <div className="w-full h-8 flex mt-2 shrink-0">
          <h3 className="font-bold ml-2">Chats</h3>
          <div className="ml-auto mr-2 gap-2 flex">
            <button className="transition-transform duration-200 hover:scale-110" onClick={() => setShowUpperScreen(true)}><FaPlus /></button>
            <button><FaEllipsisV /></button>
          </div>
        </div>

        {/* Search bar */}
        <div className="w-full my-2 px-2 shrink-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-100 text-black placeholder-gray-400 pl-3 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
             <FaSearch className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500' />
          </div>
        </div>

        {/* Recent chats */}
        <div className="flex flex-col shrink-0">
          <div className="w-full h-8 flex mt-2">
            <p className="ml-2">Recent Chats</p>
            <div className="ml-auto mr-2 gap-2 flex">
              <button><FaEllipsisV /></button>
            </div>
          </div>

          <div className="flex flex-row">
            <div className="flex flex-col items-center ml-4">
              <img src="/defaultuser.JPG" className="h-10 w-10 rounded-full object-cover" />
              <span className="text-xs">Misbah</span>
            </div>

            <div className="flex flex-col items-center ml-4">
              <img src="/defaultuser.JPG" className="h-10 w-10 rounded-full object-cover" />
              <span className="text-xs">Misbah</span>
            </div>

            <div className="flex flex-col items-center ml-4">
              <img src="/defaultuser.JPG" className="h-10 w-10 rounded-full object-cover" />
              <span className="text-xs">Misbah</span>
            </div>

            <div className="flex flex-col items-center ml-4">
              <img src="/defaultuser.JPG" className="h-10 w-10 rounded-full object-cover" />
              <span className="text-xs">Misbah</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">

          {/* All Chat Header */}
          <div className="w-full h-8 flex mt-2 shrink-0">
            <h3 className="ml-2">All Chats</h3>
            <div className="ml-auto mr-2 gap-2 flex">
              <button><FaFilter /></button>
            </div>
          </div>


          <div className="flex-1 overflow-y-auto p-2 min-h-0">

          {
            allconversations.map((conversation) => (
              <div
                key={conversation.conversation_id}
                className="w-full h-14 flex items-center border-2 border-green-500 justify-between mt-2 bg-white px-2 overflow-hidden cursor-pointer"
                onClick={() => {
                  setActiveConversationId(conversation.conversation_id);
                  setActiveConversation({
                    // title : response.data.title,
                    first_name: conversation.first_name,
                    last_name: conversation.last_name,
                    username: conversation.username,
                    userid: conversation.user_id,
                    profile: conversation.profile,
                  });
                }}
              >
                <div className="flex items-center gap-1 min-w-0">
                  <img
                    src={
                      conversation.profile
                        ? `${Backend_url}${conversation.profile}`
                        : "/defaultuser.JPG"
                    }
                    className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                  />

                  <div className="flex flex-col min-w-0">
                    <p className="truncate">
                      {conversation.first_name} {conversation.last_name}
                    </p>
                    <span className="text-xs text-gray-600 truncate">User</span>
                  </div>
                </div>

                <div className="flex flex-col items-center flex-shrink-0">
                  <span className="text-[10px] font-semibold">Yesterday</span>
                  <span className="text-[10px] text-gray-600">User</span>
                </div>
              </div>
            ))
          }

          </div>
        </div>
      </div>

      {/* Chat Area (Hidden on Mobile) */}
      <div className="hidden md:flex flex-1">
        <ChatArea conversationid ={activeconversationid} activeconversation= {activeconversation}/>
      </div>


      {/* upper screen */}
      {showUpperScreen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowUpperScreen(false)}
          ></div>

          {/* Modal */}
          <div className="relative w-[95%] sm:w-3/4 md:w-1/2 lg:w-3/5 bg-yellow-300 rounded-lg p-4 z-50 flex flex-col max-h-[90vh]">
            <h3 className="text-left font-bold text-lg mb-2">New Message</h3>

            {/* Search Input */}
            <div className="w-full my-2 px-2 shrink-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-gray-100 text-black placeholder-gray-400 pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* User List */}
            <div className="flex-1 overflow-y-auto mt-2">
              {allusers
                .filter((user) =>
                  `${user.username} ${user.first_name} ${user.last_name}`
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((user) => (
                  <div
                    key={user.id}
                    onClick={() => handleConversation(user.id)}
                    className="w-[99%] bg-gray-100 m-1 text-black flex items-center gap-2 min-w-0 pl-3 pr-4 py-2 rounded cursor-pointer hover:bg-gray-200"
                  >
                    <img
                      src={user.profile ? `${Backend_url}${user.profile}` : "/defaultuser.JPG"}
                      className="h-8 w-8 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <p className="truncate text-xs text-gray-600">
                        {user.username} • {user.first_name} {user.last_name}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

    </div>
    </>
  );
}

export default Chatbar;

