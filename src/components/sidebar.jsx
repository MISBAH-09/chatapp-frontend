import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaCog,
  FaRegComment,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Individual handlers
  const handleChat = () => {
    console.log("Token:", localStorage.getItem("userToken"));
    navigate("/chat");
  };


  const handlenewUser = () => {
    navigate('/inviteuser')
  };

  const handleMessages = () => {
    console.log("Messages clicked");
  };

  const handleSettings = () => {
    console.log("Settings clicked");
  };

  return (
    <div
      className={`h-screen font-manrope bg-gradient-to-r from-cyan-400/70 to-cyan-700/70 border-r border-gray-200 transition-all duration-200 ease-in-out flex flex-col ${
        open ? "w-56" : "w-14"
      }`}
    >
      {/* Toggle */}
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-2 w-full px-2 py-2 hover:bg-gradient-to-r from-yellow-200 to-yellow-400"
        title="Toggle sidebar"
      >
        <FaBars className="ml-1 text-lg" />
        {open && <span className="font-semibold">Menu</span>}
      </button>

      {/* Chat */}
      <button
        onClick={handleChat}
        className="flex items-center gap-3 w-full px-2 py-2 hover:bg-gradient-to-r from-yellow-200 to-yellow-400"
        title="Chat"
      >
        <FaUser className="ml-1 text-lg" />
        <span className={`${open ? "opacity-100" : "opacity-0 w-0 overflow-hidden"} transition-all`}>
          Chat
        </span>
      </button>

      {/* Invite User */}
      <button
        onClick={handlenewUser}
        className="flex items-center gap-3 mt-1 w-full px-2 py-2 hover:bg-gradient-to-r from-yellow-200 to-yellow-400 "
        title="Add User"
      >
        <FaUserPlus className="ml-1 text-2xl" />
        <span className={`${ open ? "opacity-100" : "opacity-0 w-0 overflow-hidden"} transition-all`}>
          Add User
        </span>
      </button>

      {/* Messages */}
      <button
        onClick={handleMessages}
        className="flex items-center gap-3 w-full px-2 py-2 hover:bg-gradient-to-r from-yellow-200 to-yellow-400"
        title="Messages"
      >

        <FaRegComment className="ml-1 text-lg" />
        <span className={`${open ? "opacity-100" : "opacity-0 w-0 overflow-hidden"} transition-all`}>
          Messages
        </span>
      </button>

      {/* Settings */}
      <button
        onClick={handleSettings}
        className="flex items-center gap-3 w-full px-2 py-2 hover:bg-gradient-to-r from-yellow-200 to-yellow-400"
        title="Settings"
      >
        <FaCog className="ml-1 text-lg" />
        <span className={`${open ? "opacity-100" : "opacity-0 w-0 overflow-hidden"} transition-all`}>
          Settings
        </span>
      </button>
    </div>
  );
}

export default Sidebar;
