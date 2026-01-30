import React, { useState, useEffect, useRef } from "react";
import { fetchAllUsers } from "../services/messageservices";
import { addUser } from "../services/userService";
import { FaUserFriends, FaUserPlus } from "react-icons/fa";
const Backend_url = import.meta.env.BACKEND_URL;

function NewUser() {
  const [allusers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [emailerr, setEmailErr] =useState('');


  // Fetch users
  const pollingFunc = async () => {
    try {
      const usersResponse = await fetchAllUsers();
      setAllUsers(usersResponse.data);
    } catch (err) {
      console.error("Polling error:", err);
    }
  };

  useEffect(() => {
    pollingFunc();
  }, []);

  // Handle new user
const handlenewUser = async () => {
  // Clear previous errors
  setEmailErr('');

  // Frontend validation
  if (!searchTerm.trim()) {
    setEmailErr("Email is required");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(searchTerm)) {
    setEmailErr("Invalid email");
    return;
  }

  try {
    const response = await addUser(searchTerm);
    console.log("User added:", response);
    
    // Success - clear input
    setSearchTerm("");
    pollingFunc();

  } catch (err) {
    // Backend errors show perfectly!
    console.error("Add user failed", err);
    setEmailErr(err.message || "Failed to add user");
  }
};



  return (
    <div className="w-full flex flex-col md:flex-row h-full">
      {/* ===== ALL USERS ===== */}
      <div className="w-full md:w-1/2 flex border-r-4 border-black">
        <div className="flex-1 overflow-y-auto pt-1 bg-cyan-500">
          <div className="flex flex-row items-center ml-2 pt-2 mb-2">
            <FaUserFriends className="text-3xl mr-4" />
            <h2 className="font-semibold text-2xl md:text-3xl font-serif tracking-wider">
              All Users
            </h2>
          </div>

          {allusers.map((user) => (
            <div
              key={user.id}
              className="w-[98%] bg-gray-100 m-1 flex items-center gap-2 min-w-0 pl-3 pr-4 py-2 rounded cursor-pointer hover:bg-yellow-500"
            >
              <img
                src={
                  user.profile
                    ? `${Backend_url}${user.profile}`
                    : "/defaultuser.JPG"
                }
                className="h-8 w-8 rounded-full object-cover flex-shrink-0 border-2 border-black"
                alt="user"
              />
              <p className="truncate">{user.email}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== INVITE USER ===== */}
      <div className="w-full md:w-1/2 flex mt-4 md:mt-0">
        <div className="w-full flex flex-col bg-cyan-500">
          <div className="flex flex-row items-center ml-2 pt-2 mb-2">
            <FaUserPlus className="text-3xl mr-4" />
            <h2 className="font-semibold text-2xl md:text-3xl font-serif tracking-wider">
              Invite Another User
            </h2>
          </div>

          <div className="flex flex-col px-3">
            <h1 className="mb-2 text-lg">Enter an email</h1>

            <input
              type="email"
              placeholder="Enter an email address"
              className="w-full md:w-[90%] bg-gray-100 placeholder-gray-400 rounded-md border-2 border-black pl-3 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={searchTerm}
              onChange={(e) =>{
                setSearchTerm(e.target.value)
                setEmailErr('')
              } }
            />

            {emailerr && <span className="ml-2 text-black text-sm  mt-1">{emailerr}</span>}

            <div className="flex justify-end mt-3 md:mr-20">
              <button
                onClick={handlenewUser}
                disabled={!searchTerm.trim()}
                className="font-bold rounded-lg border-2 border-black bg-red-700 px-5 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewUser;
