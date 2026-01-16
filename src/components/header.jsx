import React ,{useState ,useEffect } from "react"; 
import { FaBell, FaRegComment ,FaSearch} from "react-icons/fa";
import { getCurrentUser } from "../services/userService";

function Header() {
  const [currentUser, setCurrentUser] = useState("")
  const Backend_url = "http://localhost:8000/media/"
  useState(() => {
    const getUser = async () => {
      try {
        const response = await getCurrentUser();
        setCurrentUser(response.data); 
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUser();
  });


  return (
    <header className="w-full bg-white text-black border-b border-gray-300 relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
        <img src="/logo.png" alt="logo" className="h-10 w-10 object-contain" />
        <div className="hidden sm:flex flex-col">
          <span className="text-lg font-semibold">DreamsChat</span>
          <span className="text-xs text-gray-600">Free Chat App</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex items-center h-16 px-4">

        {/* Center: Search bar (centered) */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-30 max-w-2xl">
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded bg-gray-100 text-black placeholder-gray-400 px-10 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
              <FaSearch className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500' />
          </div>
        </div>

        {/* Right: Icons + User info pinned to right */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <button aria-label="messages" className="relative p-1 rounded-md hover:text-cyan-400">
            <FaRegComment className="text-xl text-yellow-400" />
          </button>
          <button aria-label="notifications" className="relative p-1 rounded-md hover:text-cyan-400">
            <FaBell className="text-xl text-yellow-400" />
          </button>


          <div className="flex items-center gap-3 ml-4">
            <img src={currentUser.profile ? `${Backend_url}${currentUser.profile}` : "/defaultuser.JPG"}
             alt="avatar" className="h-10 w-10 rounded-full object-cover border-2 border-black"
            />
                <div className="hidden sm:flex flex-col">
                  <span className="text-lg font-semibold">{currentUser.first_name}  {currentUser.last_name}</span>
                  <span className="text-xs text-gray-600">{currentUser.username}</span>
                </div>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Header;
