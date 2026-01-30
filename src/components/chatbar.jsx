import React, { useState, useEffect } from "react";
import ChatArea from "./chatarea";
import { FaEllipsisV, FaFilter, FaPlus, FaSearch } from "react-icons/fa";
import { getConversation } from "../services/messageservices";
import { formatTime, formatDate } from "./helpermethods";
import { useSocket } from "../contexts/SocketContext";
const Backend_url = import.meta.env.BACKEND_URL;


function Chatbar({ activeConversationFromNotification, setActiveConversationFromNotification }) {
  const [showUpperScreen, setShowUpperScreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeconversationid, setActiveConversationId] = useState(null);
  const [activeconversation, setActiveConversation] = useState(null);
  const [modalType, setModalType] = useState("message");
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const { allusers, allconversations, wsRef } = useSocket();

  // ---------------- SEARCH FILTER ----------------
 const filteredConversations = (allconversations || []).filter((convo) => {
    const search = searchTerm.toLowerCase();

    if (convo.is_group) {
      return (convo.title || "").toLowerCase().includes(search);
    }

    if (convo.displayUser) {
      const { username, first_name, last_name, email } = convo.displayUser;

      return `${username || ""} ${first_name || ""} ${last_name || ""} ${email || ""}`
        .toLowerCase()
        .includes(search);
    }

    return false;
  });

  const sortedConversations = [...filteredConversations]; 

  // ---------------- ACTIVE CONVERSATION FROM NOTIFICATION ----------------
  useEffect(() => {
    if (!activeConversationFromNotification) return;

    const convo = allconversations.find(
      c => c.conversation_id === activeConversationFromNotification
    );

    setActiveConversationId(activeConversationFromNotification);
    if (convo) setActiveConversation(convo);

    setActiveConversationFromNotification(null);
  }, [activeConversationFromNotification, allconversations]);

  // ---------------- USER SELECTION ----------------
  const toggleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // ---------------- HANDLE CONVERSATION ----------------
  const handleConversation = async (userId) => {
    try {
      const payload = { user_id: String(userId), is_group: false };
      const res = await getConversation(payload);
      const conv = res.data;

      setActiveConversationId(conv.conversation_id);
      setActiveConversation(conv);

      wsRef.current?.send(JSON.stringify({
        type: "join_conversation",
        conversation_id: conv.conversation_id,
      }));

      wsRef.current?.send(JSON.stringify({ type: "get_all_conversations" }));
      setShowUpperScreen(false);
    } catch (err) {
      console.error("Conversation error:", err);
    }
  };

  // ---------------- CREATE GROUP ----------------
  const createGroup = async () => {
    if (!groupName || selectedUsers.length === 0) return;
    const payload = {
      title: groupName,
      user_ids: selectedUsers.join(",") + ",",
      is_group: true,
    };

    const res = await getConversation(payload);

    wsRef.current?.send(JSON.stringify({ type: "get_all_conversations" }));

    setActiveConversationId(res.data.conversation_id);
    setActiveConversation(res.data);
    setShowUpperScreen(false);
    setGroupName("");
    setSelectedUsers([]);
  };


  // -------------------- NOTIFICATION CLICK --------------------
  useEffect(() => {
    if (!activeConversationFromNotification) return;

    const convo = allconversations.find(
      c => c.conversation_id === activeConversationFromNotification
    );

    setActiveConversationId(activeConversationFromNotification);
    if (convo) setActiveConversation(convo);

    setActiveConversationFromNotification(null);
  }, [activeConversationFromNotification, allconversations]);

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
            {(allconversations || [])
              .filter(convo => !convo.is_group)        
              .slice(0, 4)                             
              .map((conversation) => {
                // Determine profile & title
                let title = "";
                let profile = "";

                if (conversation.displayUser) {
                  title = conversation.displayUser.first_name
                    ? conversation.displayUser.first_name
                    : conversation.displayUser.username
                    ? conversation.displayUser.username
                    : "User";

                  profile = conversation.displayUser.profile
                    ? `${Backend_url}${conversation.displayUser.profile}`
                    : "/defaultuser.JPG";
                } else {
                  title = "User";
                  profile = "/defaultuser.JPG";
                }

                return (
                  <div key={conversation.conversation_id} className="flex flex-col items-center ml-4 mt-2 cursor-pointer"
                    onClick={() => {
                      setActiveConversationId(conversation.conversation_id);
                      setActiveConversation({
                        is_group: false,
                        participants: conversation.participants || [],
                        first_name: conversation.displayUser?.first_name || null,
                        last_name: conversation.displayUser?.last_name || null,
                        username: conversation.displayUser?.username || null,
                        userid: conversation.displayUser?.user_id || null,
                        profile: conversation.displayUser?.profile || null,
                        email: conversation.displayUser?.email || null,
                      });
                    }}
                  >
                    <img
                      src={profile}
                      className="h-12 w-12 rounded-full object-cover transition-transform duration-200 hover:scale-150 border-2 border-black"
                    />
                    <span className="text-xs truncate">{title}</span>
                  </div>
                );
              })}
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

            // Determine display name and profile
            let title = "";
            let profile = "";

            if (conversation.is_group) {
              title = conversation.title;
              profile = "/defaultgroup.JPG";
            } else if (conversation.displayUser) {
              title = conversation.displayUser.first_name
                ? `${conversation.displayUser.first_name} ${conversation.displayUser.last_name || ""}`
                : conversation.displayUser.username || conversation.displayUser.email;
              profile = conversation.displayUser.profile
                ? `${Backend_url}${conversation.displayUser.profile}`
                : "/defaultuser.JPG";
            }

            return (
              <div
                key={conversation.conversation_id}
                className={`w-full h-14 flex items-center rounded-md border-2 border-yellow-500 justify-between mt-2 px-2 overflow-hidden cursor-pointer hover:bg-yellow-500 ${isActive ? 'bg-yellow-500 border-black' : 'bg-white'}`}
                onClick={() => {
                  setActiveConversationId(conversation.conversation_id);

                  setActiveConversation({
                    is_group: conversation.is_group,
                    title: conversation.is_group ? conversation.title : undefined,
                    participants: conversation.participants || [],
                    first_name: conversation.displayUser?.first_name || null,
                    last_name: conversation.displayUser?.last_name || null,
                    username: conversation.displayUser?.username || null,
                    userid: conversation.displayUser?.user_id || null,
                    profile: conversation.displayUser?.profile || null,
                    email: conversation.displayUser?.email || null,
                  });
                }}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={profile}
                    className="h-10 w-10 rounded-full object-cover flex-shrink-0 transition-transform duration-200 hover:scale-150 border-2 border-black"
                  />
                  <div className="flex flex-col min-w-0">
                    <p className="truncate font-serif">{title}</p>
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
 
      { activeconversationid ? (
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
      <div className="flex gap-6 border-b-2 border-black shrink-0">
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
          <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2" />
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
        {(allusers || [])
          .filter((u) =>
            `${u.username || ''} ${u.email || ''} ${u.first_name || ''} ${u.last_name || ''}`
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

