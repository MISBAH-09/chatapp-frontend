// import React, { useState } from "react";
// import { FaBars, FaCog, FaRegComment, FaUser, FaUserFriends } from "react-icons/fa";

// function Sidebar() {
//   const [open, setOpen] = useState(false);

//   const items = [
//     { key: "chat", icon: FaUser, title: "Chat" },
//     { key: "groups", icon: FaUserFriends, title: "Groups" },
//     { key: "messages", icon: FaRegComment, title: "Messages" },
//     { key: "settings", icon: FaCog, title: "Settings" },
//   ];

//   return (
//     <div
//       className={`h-screen bg-cyan-500 border-r border-gray-200 transition-width duration-200 ease-in-out flex flex-col items-start ${
//         open ? "w-56" : "w-14"
//       }`}
//     >
//       <div className="w-full flex flex-col items-start mt-2">
//         <button
//           onClick={() => setOpen((s) => !s)}
//           className="flex items-center gap-2 w-full px-2 py-2 hover:bg-yellow-500"
//           title="Toggle sidebar"
//         >
//           <FaBars className="ml-1 text-lg" />
//           {open && <span className="font-semibold ">Menu</span>}
//         </button>

//         <div className="mt-4 w-full">
//           {items.map((it) => {
//             const Icon = it.icon;
//             return (
//               <button
//                 key={it.key}
//                 className="flex items-center gap-3 w-full px-2 py-2 hover:bg-yellow-500"
//                 title={it.title}
//               >
//                 <Icon className="ml-1 text-lg" />
//                 <span
//                   className={`truncate transition-all duration-200 ease-in-out ${
//                     open ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
//                   }`}
//                 >
//                   {it.title}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaCog,
  FaRegComment,
  FaUser,
  FaUserFriends,
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Individual handlers
  const handleChat = () => {
    console.log("Token:", localStorage.getItem("userToken"));
    navigate("/chat");
  };


  const handleGroups = () => {
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
      className={`h-screen bg-cyan-500 border-r border-gray-200 transition-all duration-200 ease-in-out flex flex-col ${
        open ? "w-56" : "w-14"
      }`}
    >
      {/* Toggle */}
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-2 w-full px-2 py-2 hover:bg-yellow-500"
        title="Toggle sidebar"
      >
        <FaBars className="ml-1 text-lg" />
        {open && <span className="font-semibold">Menu</span>}
      </button>

      {/* Chat */}
      <button
        onClick={handleChat}
        className="flex items-center gap-3 w-full px-2 py-2 hover:bg-yellow-500"
        title="Chat"
      >
        <FaUser className="ml-1 text-lg" />
        <span className={`${open ? "opacity-100" : "opacity-0 w-0 overflow-hidden"} transition-all`}>
          Chat
        </span>
      </button>

      {/* Groups */}
      <button
        onClick={handleGroups}
        className="flex items-center gap-3 w-full px-2 py-2 hover:bg-yellow-500"
        title="Groups"
      >
        <FaUserFriends className="ml-1 text-lg" />
        <span className={`${open ? "opacity-100" : "opacity-0 w-0 overflow-hidden"} transition-all`}>
          Groups
        </span>
      </button>

      {/* Messages */}
      <button
        onClick={handleMessages}
        className="flex items-center gap-3 w-full px-2 py-2 hover:bg-yellow-500"
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
        className="flex items-center gap-3 w-full px-2 py-2 hover:bg-yellow-500"
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
