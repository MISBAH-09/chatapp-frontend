import React from "react";
import ChatArea from "./chatarea";
import { FaEllipsisV, FaFilter, FaPlus } from "react-icons/fa";

function Chatbar () {
  return (
  <>
    <div className="w-full md:w-1/2 lg:w-1/5 border-2 border-yellow-500 bg-gray-300">

    {/* Chat tag */}
      <div className="w-full h-8 flex mt-2">
        <h3 className="font-bold ml-2 ">Chats</h3>
        <div className="ml-auto mr-2 gap-2 flex ">
          <button className=""><FaPlus ></FaPlus></button>
          <button className=""><FaEllipsisV ></FaEllipsisV></button>
        </div>
      </div>

    {/* search bar */}
      <div className="w-full my-2 px-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full  bg-gray-100 text-black placeholder-gray-400 pl-3 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
        </div>
      </div>

    {/* Recent chats */}
      <div className="flex flex-col">
        <div className="w-full h-8 flex mt-2">
          <p className=" ml-2 ">Recent Chats</p>
          <div className="ml-auto mr-2 gap-2 flex ">
            <button className=""><FaEllipsisV ></FaEllipsisV></button>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col items-center ml-4">
            <img src="/defaultuser.JPG" alt="avatar" className="h-10 w-10 rounded-full object-cover" />
              <div className="">
                <span className="text-xs">Misbah</span>

              </div>
          </div>
          <div className="flex flex-col items-center ml-4">
            <img src="/defaultuser.JPG" alt="avatar" className="h-10 w-10 rounded-full object-cover" />
              <div className="">
                <span className="text-xs">Misbah</span>

              </div>
          </div>
          <div className="flex flex-col items-center ml-4">
            <img src="/defaultuser.JPG" alt="avatar" className="h-10 w-10 rounded-full object-cover" />
              <div className="">
                <span className="text-xs">Misbah</span>

              </div>
          </div>
          <div className="flex flex-col items-center ml-4">
            <img src="/defaultuser.JPG" alt="avatar" className="h-10 w-10 rounded-full object-cover" />
              <div className="">
                <span className="text-xs">Misbah</span>

              </div>
          </div>
          {/* <div className="flex flex-col items-center ml-4">
            <img src="/defaultuser.JPG" alt="avatar" className="h-10 w-10 rounded-full object-cover" />
              <div className="">
                <span className="text-xs">Misbah</span>

              </div>
          </div> */}
        </div>
      </div>
       
      {/* All Chat */}
      <div className="w-full h-8 flex mt-2">
        <h3 className=" ml-2 ">All Chats</h3>
        <div className="ml-auto mr-2 gap-2 flex ">
          <button className=""><FaFilter></FaFilter></button>
        </div>
      </div>

      {/* Chats */}

      <div className="flex flex-col p-2">
        {/* a user chat */}
        <div className="w-full h-14 flex items-center justify-between mt-2 bg-white px-2 overflow-hidden">

          {/* Left side */}
          <div className="flex items-center gap-1 min-w-0">
            <img
              src="/defaultuser.JPG"
              alt="avatar"
              className="h-10 w-10 rounded-full object-cover flex-shrink-0"
            />

            <div className="flex flex-col min-w-0">
              <p className=" truncate"> Misbah Sehar</p>
              <span className="text-xs text-gray-600 truncate">
                User
              </span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex flex-col items-center flex-shrink-0">
            <span className="text-[10px] font-semibold whitespace-nowrap">
              Yesterday
            </span>
            <span className="text-[10px] text-gray-600 whitespace-nowrap">
              User
            </span>
          </div>

        </div>

{/* ----------------------------- */}
         {/* a user chat */}
        <div className="w-full h-14 flex items-center justify-between mt-2 bg-white px-2 overflow-hidden">

          {/* Left side */}
          <div className="flex items-center gap-1 min-w-0">
            <img
              src="/defaultuser.JPG"
              alt="avatar"
              className="h-10 w-10 rounded-full object-cover flex-shrink-0"
            />

            <div className="flex flex-col min-w-0">
              <p className=" truncate"> Misbah Sehar</p>
              <span className="text-xs text-gray-600 truncate">
                User
              </span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex flex-col items-center flex-shrink-0">
            <span className="text-[10px] font-semibold whitespace-nowrap">
              Yesterday
            </span>
            <span className="text-[10px] text-gray-600 whitespace-nowrap">
              User
            </span>
          </div>

        </div>

{/* ----------------------------- */}
        {/* a user chat */}
        <div className="w-full h-14 flex items-center justify-between mt-2 bg-white px-2 overflow-hidden">

          {/* Left side */}
          <div className="flex items-center gap-1 min-w-0">
            <img
              src="/defaultuser.JPG"
              alt="avatar"
              className="h-10 w-10 rounded-full object-cover flex-shrink-0"
            />

            <div className="flex flex-col min-w-0">
              <p className=" truncate"> Misbah Sehar</p>
              <span className="text-xs text-gray-600 truncate">
                User
              </span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex flex-col items-center flex-shrink-0">
            <span className="text-[10px] font-semibold whitespace-nowrap">
              Yesterday
            </span>
            <span className="text-[10px] text-gray-600 whitespace-nowrap">
              User
            </span>
          </div>

        </div>

{/* ----------------------------- */}

        {/* a user chat */}
        <div className="w-full h-14 flex items-center justify-between mt-2 bg-white px-2 overflow-hidden">

          {/* Left side */}
          <div className="flex items-center gap-1 min-w-0">
            <img
              src="/defaultuser.JPG"
              alt="avatar"
              className="h-10 w-10 rounded-full object-cover flex-shrink-0"
            />

            <div className="flex flex-col min-w-0">
              <p className=" truncate"> Misbah Sehar</p>
              <span className="text-xs text-gray-600 truncate">
                User
              </span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex flex-col items-center flex-shrink-0">
            <span className="text-[10px] font-semibold whitespace-nowrap">
              Yesterday
            </span>
            <span className="text-[10px] text-gray-600 whitespace-nowrap">
              User
            </span>
          </div>

        </div>

{/* ----------------------------- */}

        {/* a user chat */}
        <div className="w-full h-14 flex items-center justify-between mt-2 bg-white px-2 overflow-hidden">

          {/* Left side */}
          <div className="flex items-center gap-1 min-w-0">
            <img
              src="/defaultuser.JPG"
              alt="avatar"
              className="h-10 w-10 rounded-full object-cover flex-shrink-0"
            />

            <div className="flex flex-col min-w-0">
              <p className=" truncate"> Misbah Sehar</p>
              <span className="text-xs text-gray-600 truncate">
                User
              </span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex flex-col items-center flex-shrink-0">
            <span className="text-[10px] font-semibold whitespace-nowrap">
              Yesterday
            </span>
            <span className="text-[10px] text-gray-600 whitespace-nowrap">
              User
            </span>
          </div>

        </div>

{/* ----------------------------- */}


      </div>
    </div>

    {/* <div className="hidden md:block"> */}
      <ChatArea />
    {/* </div> */}

  </>

  );
 
}
export default Chatbar;