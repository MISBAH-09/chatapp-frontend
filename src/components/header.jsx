import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, updateUser , logoutUser } from "../services/userService";
import { convertToBase64 } from "./helpermethods";
const Backend_url = import.meta.env.VITE_BACKEND_URL;

function Header() {
  const [currentUser, setCurrentUser] = useState({});
  const [upperScreen, setUpperScreen] = useState(false);
  const [profileFile, setProfileFile] = useState(null);
  const [preview, setPreview] = useState("/defaultuser.JPG");
  // const Backend_url = "http://localhost:8000/media/";

  const usernameRef = useRef();
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    logoutUser();          // Clear token and userId
    setUpperScreen(false); // Close modal
    navigate("/login");    // Navigate to login page
  };

  // Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) throw new Error("User not found"); // optional, helps debugging
        setCurrentUser(user);
        setPreview(user?.profile ? `${Backend_url}${user.profile}` : "/defaultuser.JPG");
      } catch (err) {
        console.error("Error fetching user:", err);
        setCurrentUser({});             
        setPreview("/defaultuser.JPG"); 
      }
    };
    fetchUser();
  }, []);

  // Handle profile image change
  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle Save
  const handleSave = async () => {
    try {
      let profileBase64 = null;
      if (profileFile) {
        profileBase64 = await convertToBase64(profileFile);
      }

      const payload = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
      };

      if (profileBase64) payload.profile = profileBase64;

      const updatedUser = await updateUser(payload);
      setCurrentUser(updatedUser);
      setUpperScreen(false);
    } catch (err) {
      alert(err.message || "Failed to update user");
      console.error(err);
    }
  };

  return (
    <>
    <header className="w-full bg-cyan-500 text-black border-b-2 border-black relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
        <img src="/logo.png" alt="logo" className="h-10 w-10 object-contain rounded-full" />
        <div className="hidden sm:flex flex-col">
          <span className="text-lg  font-mono font-semibold">DreamsChat</span>
          <span className="text-xs font-mono text-black">Free Chat App</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex items-center h-16 px-4">

        {/* Center: Search bar (centered) */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-30 max-w-2xl">
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded text-black border-2 border-black placeholder-gray-400 px-10 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
              <FaSearch className='absolute right-3 top-1/2 -translate-y-1/2 text-black' />
          </div>
        </div>

        {/* Right: Icons + User info pinned to right */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <div className="flex items-center gap-3 ml-4 mr-10 " onClick={()=> setUpperScreen(true)}>
            <img src={currentUser.profile ? `${Backend_url}${currentUser.profile}` : "/defaultuser.JPG"}
             alt="avatar" className="h-12 w-12 border-2 border-black rounded-full object-cover border-2 border-black transition-transform duration-200 hover:scale-150"
            />
                <div className="hidden sm:flex flex-col">
                  <span className="text-lg font-semibold">{currentUser.first_name ? currentUser.first_name : "User"}  {currentUser.last_name}</span>
                  <span className="text-[18px]  text-gray-700 ">{currentUser.username ? currentUser.username : currentUser.email}</span>
                </div>
          </div>
        </div>

      </div>
    </header>
 
     {/* Upper Screen Modal */}
      {upperScreen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-cyan-500 rounded-lg shadow-lg w-11/12 max-w-4xl p-6 flex gap-6">
            {/* Left: Profile image */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <img
                src={preview}
                alt="profile"
                className="h-40 w-40 rounded-full object-cover border-4 border-black"
              />
              <input type="file" accept="image/*" onChange={handleProfileChange} className="mt-2" />
            </div>

            {/* Right: User fields */}
            <div className="flex-1 flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">Update your information</h2>
              <p>Username</p>
              <input
                type="text"
                defaultValue={currentUser.username}
                placeholder="Username"
                ref={usernameRef}
                className="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
              <p>Email</p>
              <input
                type="email"
                defaultValue={currentUser.email}
                placeholder="Email"
                ref={emailRef}
                className="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
              <p>First Name</p>
              <input
                type="text"
                defaultValue={currentUser.first_name}
                placeholder="First Name"
                ref={firstNameRef}
                className="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
              <p>Last Name</p>
              <input
                type="text"
                defaultValue={currentUser.last_name}
                placeholder="Last Name"
                ref={lastNameRef}
                className="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setUpperScreen(false)}
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

export default Header;


