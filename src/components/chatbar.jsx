import React, { useState, useEffect, useRef } from "react";
import ChatArea from "./chatarea";
import { FaEllipsisV, FaFilter, FaPlus, FaSearch } from "react-icons/fa";
import { fetchAllUsers, getConversation, getAllConversation } from "../services/messageservices";
import { formatTime ,formatDate} from "./helpermethods";

function Chatbar({ activeConversationFromNotification, setActiveConversationFromNotification }) {
  const Backend_url = "http://localhost:8000/media/";

  const [showUpperScreen, setShowUpperScreen] = useState(false);
  const [allusers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeconversationid, setActiveConversationId] = useState('');
  const [activeconversation, setActiveConversation] = useState(null);
  const [allconversations, setAllConversation] = useState([]);

  const [modalType, setModalType] = useState("message"); // default is New Message
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
    const pollingRef = useRef(null);



 const toggleUserSelection = (userId) => {
  setSelectedUsers((prev) =>
    prev.includes(userId)
      ? prev.filter((id) => id !== userId)
      : [...prev, userId]
  );
};

// Single user conversation
const handleConversation = async (userId) => {
  try {
    const payload = {
      user_id: String(userId), // string
      is_group: false,
    };

    const response = await getConversation(payload);

    setActiveConversation({
      first_name: response.data.first_name,
      last_name: response.data.last_name,
      username: response.data.username,
      userid: response.data.user_id,
      profile: response.data.profile,
      email: response.data.email,
    });

    setActiveConversationId(response.data.conversation_id);
    setShowUpperScreen(false);
  } catch (error) {
    console.error("Error getting conversation:", error);
  }
};

const createGroup = async () => {
  if (!groupName.trim()) {
    alert("Group name is required");
    return;
  }

  if (selectedUsers.length === 0) {
    alert("Select at least one user");
    return;
  }

  const userIdsStr = selectedUsers.join(",") + ","; // only selected users

  const payload = {
    title: groupName,
    user_ids: userIdsStr,   // backend will append current user's id
    is_group: true,
  };

  try {
    const response = await getConversation(payload);
    console.log("Group created:", response.data);

    setGroupName("");
    setSelectedUsers([]);
    setModalType("message");
    setShowUpperScreen(false);
  } catch (error) {
    console.error("Error creating group:", error);
  }
};

 useEffect(() => {
    if (activeConversationFromNotification) {
      const conversation = allconversations.find(
      (c) => c.conversation_id === activeConversationFromNotification
    );
    if (conversation) {
      setActiveConversationId(conversation.conversation_id);
      setActiveConversation(conversation);
      setActiveConversationFromNotification(null);
    }
    }
  }, [activeConversationFromNotification, allconversations]);
  // Polling function
  const pollingFunc = async () => {
    try {
      const usersResponse = await fetchAllUsers();
      setAllUsers(usersResponse.data);

      const convResponse = await getAllConversation();
      // console.log(convResponse.data)
      setAllConversation(convResponse.data);
    } catch (err) {
      console.error("Polling error:", err);
    }
  };


  useEffect(() => {

    pollingFunc();
    pollingRef.current = setInterval(() => {
      pollingFunc();
    }, 2000); // poll every 2 seconds

    return () => {
      clearInterval(pollingRef.current);
    };
  }, []);

  // Filter conversations based on search term
  const filteredConversations = allconversations
    .filter((convo) =>
      `${convo.username || ''} ${convo.first_name || ''} ${convo.last_name || ''}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  // Sort: filtered on top, then the rest
  const sortedConversations = [
    ...filteredConversations,
    ...allconversations.filter(
      (c) => !filteredConversations.includes(c)
    ),
  ];

  return (
    <>
    <div className="flex flex-1">
      {/* Chatbar */}
      <div className={`${activeconversationid ? 'hidden' : 'flex'} md:flex w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-cyan-500 flex-col h-full md:shrink-0`}>
        
        {/* Chat Header */}
        <div className="w-full h-8 flex mt-2 shrink-0">
          <h3 className="font-semibold  text-[24px] ml-2 tracking-wider" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            Chats
          </h3>
          <div className="ml-auto mr-2 gap-2 flex">
            <button className="transition-transform duration-200 hover:scale-110" onClick={() => setShowUpperScreen(true)}><FaPlus /></button>
            <button><FaEllipsisV /></button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full my-2 px-2 shrink-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-100 placeholder-gray-400 rounded-md border-2 border-black pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 " />
          </div>
        </div>

        {/* Recent chats */} 
        <div className="flex flex-col shrink-0"> 
          <div className="w-full h-8 flex mt-2"> 
            <p className="ml-2 pt-2 pl-2 text-lg font-serif font-semibold">Recent Chats</p> 
            <div className="ml-auto mr-2 gap-2 flex"> 
              <button>
                <FaEllipsisV />
              </button>
             </div> 
            </div> 
            <div className="flex flex-row overflow-x-auto">
              {allconversations.slice(0, 4).map((conversation) => (
                <div key={conversation.conversation_id} className="flex flex-col items-center ml-4 mt-2 ">
                  <img
                    src={conversation.profile ? `${Backend_url}${conversation.profile}` : "/defaultuser.JPG"}
                    className="h-12 w-12 rounded-full object-cover transition-transform duration-200 hover:scale-150 border-2 border-black "
                  />
                  <span className="text-xs truncate">
                    {conversation.username ? conversation.username :"User"}
                  </span>
                </div>
              ))}
            </div>
        </div>
            
        {/* Recent / All Chats */}
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          {/* All Chats Header */}
          <div className="w-full h-8 flex mt-2 shrink-0">
            <h3 className="ml-2 pt-2 pl-2 text-lg font-serif font-semibold">All Chats</h3>
            <div className="ml-auto mr-2 gap-2 flex">
              <button><FaFilter /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 min-h-0">
            {sortedConversations.map((conversation) => {
              const isActive = conversation.conversation_id === activeconversationid;
              // Determine display name
              let title = "";
              let profile = "";
              
              if (conversation.is_group) {
                title = conversation.title;
                profile = "/defaultgroup.JPG"
              } else {
                title = conversation.first_name
                ? `${conversation.first_name} ${conversation.last_name || ""}`
                : conversation.email;

                profile = conversation.profile ? `${Backend_url}${conversation.profile}` : "/defaultuser.JPG"
              }


              return (
                <div
                  key={conversation.conversation_id}
                  className={`w-full h-14 flex items-center rounded-md border-2 border-yellow-500 justify-between mt-2 px-2 overflow-hidden cursor-pointer hover:bg-yellow-500 ${isActive ? 'bg-yellow-500 border-black' : 'bg-white'}`}
                  onClick={() => {
                    setActiveConversationId(conversation.conversation_id);
                    setActiveConversation({
                      first_name: conversation.first_name,
                      last_name: conversation.last_name,
                      username: conversation.username,
                      userid: conversation.user_id,
                      profile: conversation.profile,
                      email : conversation.email,
                      title : title,
                    });
                  }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={profile}
                      className="h-10 w-10 rounded-full object-cover flex-shrink-0 transition-transform duration-200 hover:scale-150 border-2 border-cyan-500"
                    />
                    <div className="flex flex-col min-w-0">
                      <p className="truncate font-serif"> {title} </p>
                      <span className="text-xs text-gray-600 truncate">{conversation.latest_message_body}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center flex-shrink-0">
                    <span className="text-[10px] font-semibold">{formatDate(conversation.latest_message_time)}</span>
                    <span className="text-[10px] text-gray-600">{formatTime(conversation.latest_message_time)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>



       {/* Chat Area - Show on mobile when conversation exists, always on desktop */}
      {activeconversationid ? (
        <div className="flex flex-1">
          <ChatArea 
            conversationid={activeconversationid} 
            activeconversation={activeconversation}
            onBack={() => {
              setActiveConversationId('');
              setActiveConversation(null);
              setShowUpperScreen(false);
            }}
            onMessageSent={async () => { 
              try {
                const response = await getAllConversation();
                setAllConversation(response.data);
              } catch (err) {
                console.error("Error refreshing conversations:", err);
              }
            }}
          />
        </div>
      ) : (
        <div className="flex-1 hidden md:flex">
          <ChatArea 
            conversationid={activeconversationid} 
            activeconversation={activeconversation} 
            onBack={() => setShowUpperScreen(false)}
            onMessageSent={async () => {
              try {
                const response = await getAllConversation();
                setAllConversation(response.data);
              } catch (err) {
                console.error("Error refreshing conversations:", err);
              }
            }}
          />
        </div>
      )}

{/* Upper Screen Modal */}
{showUpperScreen && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/30"
      onClick={() => {
        setShowUpperScreen(false);
        setModalType("message");
        setSelectedUsers([]);
        setGroupName("");
      }}
    />

    {/* MODAL (FIXED HEIGHT) */}
    <div className="relative w-[95%] sm:w-3/4 md:w-1/2 lg:w-3/5
      h-[80vh] bg-cyan-500 rounded-lg p-4 z-50 flex flex-col">

      {/* Tabs (FIXED) */}
      <div className="flex gap-6 border-b-2 border-black pb-1 shrink-0">
        <button
          onClick={() => setModalType("message")}
          className={`font-bold text-lg ${
            modalType === "message" ? "underline" : ""
          }`}
        >
          New Message
        </button>

        <button
          onClick={() => setModalType("group")}
          className={`font-bold text-lg ${
            modalType === "group" ? "underline" : ""
          }`}
        >
          New Group
        </button>
      </div>

      {/* Search (FIXED) */}
      <div className="my-2 shrink-0">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-100 pl-3 pr-10 py-2 rounded border-2 border-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Group Name (FIXED HEIGHT) */}
      <div className="flex items-center gap-3 mb-2 min-h-[48px] shrink-0">
        <span
          className={`font-semibold ${
            modalType === "group" ? "opacity-100" : "opacity-0"
          }`}
        >
          Group Name
        </span>

        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter group name"
          disabled={modalType !== "group"}
          className={`flex-1 bg-gray-100 border-2 border-black px-2 py-1 rounded
            ${modalType !== "group" ? "opacity-0 pointer-events-none" : ""}`}
        />
      </div>

      {/* USERS LIST (ONLY SCROLL AREA) */}
      <div className="flex-1 overflow-y-auto border-t border-black/20 pt-2">
        {allusers
          .filter((u) =>
            `${u.username} ${u.email} ${u.first_name} ${u.last_name}`
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
          .map((user) => {
            const isSelected = selectedUsers.includes(user.id);

            return (
              <div
                key={user.id}
                onClick={() => {
                  if (modalType === "message") {
                    handleConversation(user.id);
                    setShowUpperScreen(false);
                  }

                  if (modalType === "group") {
                    toggleUserSelection(user.id);
                  }
                }}
                className={`flex items-center gap-3 p-2 m-1 rounded cursor-pointer
                  ${
                    modalType === "message"
                      ? "bg-gray-100 hover:bg-yellow-400"
                      : isSelected
                      ? "bg-yellow-300"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                <img
                  src={
                    user.profile
                      ? `${Backend_url}${user.profile}`
                      : "/defaultuser.JPG"
                  }
                  className="h-8 w-8 rounded-full border-2 border-black"
                />

                <p className="flex-1 truncate">
                  {user.username || user.email}
                  {(user.first_name || user.last_name) &&
                    ` • ${user.first_name} ${user.last_name}`}
                </p>

                {/* Checkbox (GROUP MODE ONLY) */}
                {modalType === "group" && (
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    onClick={(e) => e.stopPropagation()}
                    className="
                      w-5 h-5
                      scale-125
                      accent-black
                      border-2 border-black
                      cursor-pointer
                    "
                  />
                )}
              </div>
            );
          })}
      </div>

      {/* CREATE GROUP BUTTON (FIXED) */}
      <div className="shrink-0 mt-2 flex justify-end">
        {modalType === "group" && (
          <button
            onClick={createGroup}
            disabled={!groupName || selectedUsers.length === 0}
            className="bg-yellow-500 px-4 py-2 border-2 border-black font-bold disabled:opacity-70 rounded-lg"
          >
            Create Group ({selectedUsers.length})
          </button>
        )}
      </div>
    </div>
  </div>
)}
    </div>
    </>
  );
}

export default Chatbar;

