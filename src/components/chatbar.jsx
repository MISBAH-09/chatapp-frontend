import React, { Profiler } from "react";
import ChatArea from "./chatarea";
import { useState } from "react";
import { FaEllipsisV, FaFilter, FaPlus,FaSearch } from "react-icons/fa";

function Chatbar() {
  const [showUpperScreen, setShowUpperScreen] = useState(false);

  const allusers=[
    { id : "id", username: "Misbahhhh", first_name:"Misbah" , last_name : "Sehar" , Profile : "path"},
    { id : "id", username: "Misbahhhh", first_name:"Misbah" , last_name : "Sehar" , Profile : "path"},
    { id : "id", username: "Misbahhhh", first_name:"Misbah" , last_name : "Sehar" , Profile : "path"},
    { id : "id", username: "Misbahhhh", first_name:"Misbah" , last_name : "Sehar" , Profile : "path"},
    { id : "id", username: "Misbahhhh", first_name:"Misbah" , last_name : "Sehar" , Profile : "path"},
    { id : "id", username: "Misbahhhh", first_name:"Misbah" , last_name : "Sehar" , Profile : "path"},
    { id : "id", username: "Misbahhhh", first_name:"Misbah" , last_name : "Sehar" , Profile : "path"},
    { id : "id", username: "Misbahhhh", first_name:"Misbah" , last_name : "Sehar" , Profile : "path"},
    { id : "id", username: "Misbahhhh", first_name:"Misbah" , last_name : "Sehar" , Profile : "path"},
    { id : "id", username: "Misbahhhh", first_name:"Misbah" , last_name : "Sehar" , Profile : "path"},
    { id : "id", username: "Misbahhhh", first_name:"Misbah" , last_name : "Sehar" , Profile : "path"},
    { id : "id", username: "Misbahhhh", first_name:"Misbah" , last_name : "Sehar" , Profile : "path"}

  ]

  return (
    <>
    {/* base div  */}
    <div className=" flex border-2 border-pink-500 ">
      
      <div className="w-full md:w-1/2 lg:w-1/5 bg-gray-300 flex flex-col h-full ">

        {/* Chat tag */}
        <div className="w-full h-8 flex mt-2 shrink-0">
          <h3 className="font-bold ml-2">Chats</h3>
          <div className="ml-auto mr-2 gap-2 flex">
            <button onClick={() => setShowUpperScreen(true)}><FaPlus /></button>
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

            {/* ---------------- A CHAT BLOCKS ---------------- */}
            <div className="w-full h-14 flex items-center justify-between mt-2 bg-white px-2 overflow-hidden">
              <div className="flex items-center gap-1 min-w-0">
                <img src="/defaultuser.JPG" className="h-10 w-10 rounded-full object-cover flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <p className="truncate">Misbah Sehar</p>
                  <span className="text-xs text-gray-600 truncate">User</span>
                </div>
              </div>
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="text-[10px] font-semibold">Yesterday</span>
                <span className="text-[10px] text-gray-600">User</span>
              </div>
            </div>

              {/* ---------------- A CHAT BLOCKS ---------------- */}
            <div className="w-full h-14 flex items-center justify-between mt-2 bg-white px-2 overflow-hidden">
              <div className="flex items-center gap-1 min-w-0">
                <img src="/defaultuser.JPG" className="h-10 w-10 rounded-full object-cover flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <p className="truncate">Misbah Sehar</p>
                  <span className="text-xs text-gray-600 truncate">User</span>
                </div>
              </div>
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="text-[10px] font-semibold">Yesterday</span>
                <span className="text-[10px] text-gray-600">User</span>
              </div>
            </div>

              {/* ---------------- A CHAT BLOCKS ---------------- */}
            <div className="w-full h-14 flex items-center justify-between mt-2 bg-white px-2 overflow-hidden">
              <div className="flex items-center gap-1 min-w-0">
                <img src="/defaultuser.JPG" className="h-10 w-10 rounded-full object-cover flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <p className="truncate">Misbah Sehar</p>
                  <span className="text-xs text-gray-600 truncate">User</span>
                </div>
              </div>
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="text-[10px] font-semibold">Yesterday</span>
                <span className="text-[10px] text-gray-600">User</span>
              </div>
            </div>

              {/* ---------------- A CHAT BLOCKS ---------------- */}
            <div className="w-full h-14 flex items-center justify-between mt-2 bg-white px-2 overflow-hidden">
              <div className="flex items-center gap-1 min-w-0">
                <img src="/defaultuser.JPG" className="h-10 w-10 rounded-full object-cover flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <p className="truncate">Misbah Sehar</p>
                  <span className="text-xs text-gray-600 truncate">User</span>
                </div>
              </div>
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="text-[10px] font-semibold">Yesterday</span>
                <span className="text-[10px] text-gray-600">User</span>
              </div>
            </div>


              {/* ---------------- A CHAT BLOCKS---------------- */}
            <div className="w-full h-14 flex items-center justify-between mt-2 bg-white px-2 overflow-hidden">
              <div className="flex items-center gap-1 min-w-0">
                <img src="/defaultuser.JPG" className="h-10 w-10 rounded-full object-cover flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <p className="truncate">Misbah Sehar</p>
                  <span className="text-xs text-gray-600 truncate">User</span>
                </div>
              </div>
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="text-[10px] font-semibold">Yesterday</span>
                <span className="text-[10px] text-gray-600">User</span>
              </div>
            </div>


              {/* ---------------- A CHAT BLOCKS ---------------- */}
            <div className="w-full h-14 flex items-center justify-between mt-2 bg-white px-2 overflow-hidden">
              <div className="flex items-center gap-1 min-w-0">
                <img src="/defaultuser.JPG" className="h-10 w-10 rounded-full object-cover flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <p className="truncate">Misbah Sehar</p>
                  <span className="text-xs text-gray-600 truncate">User</span>
                </div>
              </div>
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="text-[10px] font-semibold">Yesterday</span>
                <span className="text-[10px] text-gray-600">User</span>
              </div>
            </div>

              {/* ----------------A CHAT BLOCKS---------------- */}
            <div className="w-full h-14 flex items-center justify-between mt-2 bg-white px-2 overflow-hidden">
              <div className="flex items-center gap-1 min-w-0">
                <img src="/defaultuser.JPG" className="h-10 w-10 rounded-full object-cover flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <p className="truncate">Misbah Sehar</p>
                  <span className="text-xs text-gray-600 truncate">User</span>
                </div>
              </div>
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="text-[10px] font-semibold">Yesterday</span>
                <span className="text-[10px] text-gray-600">User</span>
              </div>
            </div>


              {/* ---------------- A CHAT BLOCKS---------------- */}
            <div className="w-full h-14 flex items-center justify-between mt-2 bg-white px-2 overflow-hidden">
              <div className="flex items-center gap-1 min-w-0">
                <img src="/defaultuser.JPG" className="h-10 w-10 rounded-full object-cover flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <p className="truncate">Misbah Sehar</p>
                  <span className="text-xs text-gray-600 truncate">User</span>
                </div>
              </div>
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="text-[10px] font-semibold">Yesterday</span>
                <span className="text-[10px] text-gray-600">User</span>
              </div>
            </div>

              {/* ----------------A CHAT BLOCKS ---------------- */}
            <div className="w-full h-14 flex items-center justify-between mt-2 bg-white px-2 overflow-hidden">
              <div className="flex items-center gap-1 min-w-0">
                <img src="/defaultuser.JPG" className="h-10 w-10 rounded-full object-cover flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <p className="truncate">Misbah Sehar</p>
                  <span className="text-xs text-gray-600 truncate">User</span>
                </div>
              </div>
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="text-[10px] font-semibold">Yesterday</span>
                <span className="text-[10px] text-gray-600">User</span>
              </div>
            </div>

              {/* ---------------- A CHAT BLOCKS ---------------- */}
            <div className="w-full h-14 flex items-center justify-between mt-2 bg-white px-2 overflow-hidden">
              <div className="flex items-center gap-1 min-w-0">
                <img src="/defaultuser.JPG" className="h-10 w-10 rounded-full object-cover flex-shrink-0" />
                <div className="flex flex-col min-w-0">
                  <p className="truncate">Misbah Sehar</p>
                  <span className="text-xs text-gray-600 truncate">User</span>
                </div>
              </div>
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="text-[10px] font-semibold">Yesterday</span>
                <span className="text-[10px] text-gray-600">User</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Chat Area (Hidden on Mobile) */}
      <div className="hidden md:flex flex-1">
        <ChatArea />
      </div>


      {/* upper screen */}
      {showUpperScreen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowUpperScreen(false)}
          ></div>

          <div className="relative w-[95%] sm:w-3/4 md:w-1/2 lg:w-3/5 bg-yellow-300 rounded-lg p-4 z-50 flex flex-col max-h-[90vh]">
            <h3 className="text-left font-bold text-lg mb-2">New Message</h3>
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

            <div className="flex-1 overflow-y-auto mt-2">
              {allusers.map((user) => (
                <div
                  key={user.id}
                  className="w-[99%] bg-gray-100 m-1 text-black flex items-center gap-1 min-w-0 pl-3 pr-4 py-2 rounded"
                >
                  <img
                    src={user.profile ? user.profile : "/defaultuser.JPG"} 
                    className="h-8 w-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col min-w-0">
                    <p className="truncate">
                      <span className="text-xs text-gray-600 truncate">{user.username} • </span>
                      <span className="text-xs text-gray-600 truncate">{user.first_name} {user.last_name}</span>
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

