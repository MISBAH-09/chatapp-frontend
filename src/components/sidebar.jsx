import React, { useState } from "react";
import { FaBars, FaCog, FaRegComment, FaUser, FaUserFriends } from "react-icons/fa";

function Sidebar() {
  const [open, setOpen] = useState(false);

  const items = [
    { key: "chat", icon: FaUser, title: "Chat" },
    { key: "groups", icon: FaUserFriends, title: "Groups" },
    { key: "messages", icon: FaRegComment, title: "Messages" },
    { key: "settings", icon: FaCog, title: "Settings" },
  ];

  return (
    <div
      className={`h-screen bg-white border-r border-gray-200 transition-width duration-200 ease-in-out flex flex-col items-start ${
        open ? "w-56" : "w-14"
      }`}
    >
      <div className="w-full flex flex-col items-start mt-2">
        <button
          onClick={() => setOpen((s) => !s)}
          className="flex items-center gap-2 w-full px-2 py-2 hover:bg-gray-100"
          title="Toggle sidebar"
        >
          <FaBars className="ml-1 text-lg" />
          {open && <span className="font-semibold">Menu</span>}
        </button>

        <div className="mt-4 w-full">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <button
                key={it.key}
                className="flex items-center gap-3 w-full px-2 py-2 hover:bg-gray-100"
                title={it.title}
              >
                <Icon className="ml-1 text-lg" />
                <span
                  className={`truncate transition-all duration-200 ease-in-out ${
                    open ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                  }`}
                >
                  {it.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;