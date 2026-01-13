import React from "react";
import {  FaBars, FaCog, FaRegComment, FaSave, FaUser, FaUserFriends } from "react-icons/fa";


function Sidebar () {
  return (
  <>
    <div className="w-[50px] border-2 border-yellow-500">
      <div className="flex flex-col justify-start h-full">

        <button className="text-xl w-10 h-10 p-2 m-2 item-center " title="dashboard">
          <FaBars></FaBars>
        </button>
        <button className="text-xl w-10 h-10 p-2 m-2 item-center "  title="Chat">
          <FaUser></FaUser>
        </button>
        <button className="text-xl w-10 h-10 p-2 m-2 item-center " title="Groups">
          <FaUserFriends></FaUserFriends>
        </button>
         <button className="text-xl w-10 h-10 p-2 m-2 item-center " title="Messages">
          <FaRegComment></FaRegComment>
        </button>
          <button className="text-xl w-10 h-10 p-2 m-2 item-center " title="Settings">
            <FaCog></FaCog>
        </button> 

      </div>
    </div>
  </>

  );
 
}
export default Sidebar;