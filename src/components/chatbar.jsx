import React from "react";
import ChatArea from "./chatarea";
import { FaEllipsisV, FaFilter, FaPlus } from "react-icons/fa";

function Chatbar () {
  return (
  <>
    <div className="w-1/5 border-2 border-yellow-500 bg-gray-300">

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
        {/* a user chat  */}
        <div className="w-full h-12 flex flex-row justify-between gap-1 mt-2 bg-white ">
        <div className="flex items-center ml-2">
          <img src="/defaultuser.JPG" alt="avatar" className="h-10 w-10 rounded-full object-cover" />
            <div className="flex flex-col pl-2">
              <span className="">Misbah Sehar</span>
              <span className="text-xs text-gray-600">User</span>
            </div>
        </div>
        <div className="flex items-right">
          <div className="flex flex-col items-center p-2">
            <span className="text-[10px] font-semibold">Yesterday</span>
            <span className="text-[10px] text-gray-600">User</span>
          </div>
        </div>     
      </div>
{/* ----------------------------- */}
        <div className="w-full h-12 flex flex-row justify-between gap-1 mt-2 bg-white">
        <div className="flex items-center ml-2">
          <img src="/defaultuser.JPG" alt="avatar" className="h-10 w-10 rounded-full object-cover" />
            <div className="flex flex-col pl-2">
              <span className="">Misbah Sehar</span>
              <span className="text-xs text-gray-600">User</span>
            </div>
        </div>
        <div className="flex items-right">
          <div className="flex flex-col items-center p-2">
            <span className="text-[10px] font-semibold">Yesterday</span>
            <span className="text-[10px] text-gray-600">User</span>
          </div>
        </div>     
      </div>
        <div className="w-full h-12 flex flex-row justify-between gap-1 mt-2 bg-white">
        <div className="flex items-center ml-2">
          <img src="/defaultuser.JPG" alt="avatar" className="h-10 w-10 rounded-full object-cover" />
            <div className="flex flex-col pl-2">
              <span className="">Misbah Sehar</span>
              <span className="text-xs text-gray-600">User</span>
            </div>
        </div>
        <div className="flex items-right">
          <div className="flex flex-col items-center p-2">
            <span className="text-[10px] font-semibold">Yesterday</span>
            <span className="text-[10px] text-gray-600">User</span>
          </div>
        </div>     
      </div>
        <div className="w-full h-12 flex flex-row justify-between gap-1 mt-2 bg-white">
        <div className="flex items-center ml-2">
          <img src="/defaultuser.JPG" alt="avatar" className="h-10 w-10 rounded-full object-cover" />
            <div className="flex flex-col pl-2">
              <span className="">Misbah Sehar</span>
              <span className="text-xs text-gray-600">User</span>
            </div>
        </div>
        <div className="flex items-right">
          <div className="flex flex-col items-center p-2">
            <span className="text-[10px] font-semibold">Yesterday</span>
            <span className="text-[10px] text-gray-600">User</span>
          </div>
        </div>     
      </div>

              <div className="w-full h-12 flex flex-row justify-between gap-1 mt-2 bg-white ">
        <div className="flex items-center ml-2">
          <img src="/defaultuser.JPG" alt="avatar" className="h-10 w-10 rounded-full object-cover" />
            <div className="flex flex-col pl-2">
              <span className="">Misbah Sehar</span>
              <span className="text-xs text-gray-600">User</span>
            </div>
        </div>
        <div className="flex items-right">
          <div className="flex flex-col items-center p-2">
            <span className="text-[10px] font-semibold">Yesterday</span>
            <span className="text-[10px] text-gray-600">User</span>
          </div>
        </div>     
      </div>

              <div className="w-full h-12 flex flex-row justify-between gap-1 mt-2 bg-white ">
        <div className="flex items-center ml-2">
          <img src="/defaultuser.JPG" alt="avatar" className="h-10 w-10 rounded-full object-cover" />
            <div className="flex flex-col pl-2">
              <span className="">Misbah Sehar</span>
              <span className="text-xs text-gray-600">User</span>
            </div>
        </div>
        <div className="flex items-right">
          <div className="flex flex-col items-center p-2">
            <span className="text-[10px] font-semibold">Yesterday</span>
            <span className="text-[10px] text-gray-600">User</span>
          </div>
        </div>     
      </div>

              <div className="w-full h-12 flex flex-row justify-between gap-1 mt-2 bg-white ">
        <div className="flex items-center ml-2">
          <img src="/defaultuser.JPG" alt="avatar" className="h-10 w-10 rounded-full object-cover" />
            <div className="flex flex-col pl-2">
              <span className="">Misbah Sehar</span>
              <span className="text-xs text-gray-600">User</span>
            </div>
        </div>
        <div className="flex items-right">
          <div className="flex flex-col items-center p-2">
            <span className="text-[10px] font-semibold">Yesterday</span>
            <span className="text-[10px] text-gray-600">User</span>
          </div>
        </div>     
      </div>

              <div className="w-full h-12 flex flex-row justify-between gap-1 mt-2 bg-white ">
        <div className="flex items-center ml-2">
          <img src="/defaultuser.JPG" alt="avatar" className="h-10 w-10 rounded-full object-cover" />
            <div className="flex flex-col pl-2">
              <span className="">Misbah Sehar</span>
              <span className="text-xs text-gray-600">User</span>
            </div>
        </div>
        <div className="flex items-right">
          <div className="flex flex-col items-center p-2">
            <span className="text-[10px] font-semibold">Yesterday</span>
            <span className="text-[10px] text-gray-600">User</span>
          </div>
        </div>     
      </div>

      </div>
    </div>

    <ChatArea />

  </>

  );
 
}
export default Chatbar;