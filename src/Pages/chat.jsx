import React from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Chatbar from "../components/chatbar";


function Chat() {
  return (
    <>
      <Header />
    <div className="flex">
      <Sidebar />
      <Chatbar />
    </div>
    

    {/* <div className=" flex justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <Sidebar />

      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition">
        Start Chatting
      </button> 
    </div> */}
    </>
    
  );
}
export default Chat;