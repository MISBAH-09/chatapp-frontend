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
    <header className="w-full bg-cyan-500 text-black border-b border-gray-300 relative">
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
          <button aria-label="messages" className="relative p-1 rounded-md hover:text-black">
            <FaRegComment className="text-xl text-black-400" />
          </button>
          <button aria-label="notifications" className="relative p-1 rounded-md hover:text-black">
            <FaBell className="text-xl text-black-400" />
          </button>


          <div className="flex items-center gap-3 ml-4 mr-10">
            <img src={currentUser.profile ? `${Backend_url}${currentUser.profile}` : "/defaultuser.JPG"}
             alt="avatar" className="h-12 w-12 border-2 border-black rounded-full object-cover border-2 border-black transition-transform duration-200 hover:scale-150"
            />
                <div className="hidden sm:flex flex-col">
                  <span className="text-lg font-semibold">{currentUser.first_name}  {currentUser.last_name}</span>
                  <span className="text-[18px]  text-gray-700 ">{currentUser.username}</span>
                </div>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Header;
