import React from 'react';
import {
  FaEllipsisV,
  FaInfoCircle,
  FaPaperPlane,
  FaMicrophone,
  FaPaperclip,
  FaPhone,
  FaSearch,
  FaVideo
} from "react-icons/fa";


function ChatArea({conversationid, activeconversation}) {
  const Backend_url = "http://localhost:8000/media/"

    if (!conversationid || !activeconversation) {
      return (
        <div className="hidden md:flex flex-1 bg-gray-200 h-full w-full">
          <div className="w-full flex flex-col bg-white h-full items-center justify-center">
            <img src="/logo.png" className="h-40 w-40 rounded-full" />
            <p className="text-xl mt-4">Dreams Chat</p>
            <p className="text-sm text-gray-500">Start Messaging</p>
          </div>
        </div>
      );
    }

  // console.log(" chat area",conversationid , activeconversation)
  const {
      // title,
      first_name,
      last_name,
      username,
      userid,
      profile,
    } = activeconversation;

  return (
  <div className="hidden md:flex flex-1 bg-gray-200 h-full w-full">

    <div className="w-full flex flex-col bg-white h-full ">
          {/* ===== Chat Header ===== */}
          <div className="flex items-center h-14 border-b px-3 bg-white shrink-0">
            <div className="flex items-center gap-2 flex-1">
              <img
                src={
                      activeconversation.profile
                        ? `${Backend_url}${activeconversation.profile}`
                        : "/defaultuser.JPG"
                    }
                alt="avatar"
                className="h-9 w-9 rounded-full"
              />
              <div>
                <p className="text-sm font-semibold">{activeconversation.first_name} {activeconversation.last_name}</p>
                <p className="text-xs text-gray-500">{activeconversation.username}</p>
              </div>
            </div>

            <div className="flex gap-4 text-lg text-gray-700">
              <FaSearch />
              <FaPhone />
              <FaVideo />
              <FaInfoCircle />
            </div>
          </div>

          {/* ===== Messages ===== */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">

            {/* My message */}
            <div className="flex items-end gap-2">
              <img src="/defaultuser.JPG" className="h-8 w-8 rounded-full" />
              <div className="max-w-[60%]">
                <p className="text-xs text-gray-500">Misbah • 2:00 PM</p>
                <div className="bg-gray-200 p-2 rounded-xl text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, a.
                </div>
              </div>
            <div className="flex items-center justify-center  mb-2">
              <FaEllipsisV className="text-gray-400 text-sm" />
            </div>
            </div>

            


            <div className="flex items-end gap-2 justify-end">
              <div className="flex items-center justify-center  mb-2">
              <FaEllipsisV className="text-gray-400 text-sm" />
            </div>
              <div className="max-w-[60%] text-right">
                <p className="text-xs text-gray-500">Misbah • 2:01 PM</p>
                <div className="bg-blue-100 p-2 text-left rounded-xl text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Dolorum asperiores illo aliquam enim beatae id voluptates temporibus quam doloremque totam!
                </div>
              </div>
              <img src="/defaultuser.JPG" className="h-8 w-8 rounded-full" />
            </div>


            <div className="flex items-end gap-2">
              <img src="/defaultuser.JPG" className="h-8 w-8 rounded-full" />
              <div className="max-w-[60%]">
                <p className="text-xs text-gray-500">Misbah • 2:00 PM</p>
                <div className="bg-gray-200 p-2 rounded-xl text-sm">
                  Hello this is my message
                </div>
              </div>
              <div className="flex items-center justify-center  mb-2">
              <FaEllipsisV className="text-gray-400 text-sm" />
            </div>
            </div>

            <div className="flex items-end gap-2 justify-end">
              <div className="flex items-center justify-center  mb-2">
              <FaEllipsisV className="text-gray-400 text-sm" />
            </div>
              <div className="max-w-[60%] text-right">
                <p className="text-xs text-gray-500">Misbah • 2:01 PM</p>
                <div className="bg-blue-100 p-2 text-left rounded-xl text-sm">
                  This stays in place
                </div>
              </div>
              <img src="/defaultuser.JPG" className="h-8 w-8 rounded-full" />
            </div>


            <div className="flex items-end gap-2">
              <img src="/defaultuser.JPG" className="h-8 w-8 rounded-full" />
              <div className="max-w-[60%]">
                <p className="text-xs text-gray-500">Misbah • 2:00 PM</p>
                <div className="bg-gray-200 p-2 rounded-xl text-sm">
                  Hello this is my message
                </div>
              </div>
              <div className="flex items-center justify-center  mb-2">
              <FaEllipsisV className="text-gray-400 text-sm" />
            </div>
            </div>


            <div className="flex items-end gap-2 justify-end">
              <div className="flex items-center justify-center  mb-2">
              <FaEllipsisV className="text-gray-400 text-sm" />
            </div>
              <div className="max-w-[60%] text-right">
                <p className="text-xs text-gray-500">Misbah • 2:01 PM</p>
                <div className="bg-blue-100 p-2 text-left rounded-xl text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Iusto ea porro reiciendis facilis nesciunt debitis, earum perspiciatis. 
                  Est sunt fugiat ipsum, esse cumque ducimus praesentium! Deleniti, dolorem. 
                  Aspernatur, culpa at.
                </div>
              </div>
              <img src="/defaultuser.JPG" className="h-8 w-8 rounded-full" />
            </div>


          </div>

          {/* ===== Message Input ===== */}
          <div className="border-t p-3 bg-white shrink-0">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Write message here"
                className="flex-1 px-4 py-2 border rounded-full outline-none"
              />
              <FaPaperclip className="text-xl text-gray-600 cursor-pointer" />
              <FaMicrophone className="text-xl text-gray-600 cursor-pointer" />
              <FaPaperPlane className="text-xl text-blue-600 cursor-pointer" />
            </div>
          </div>
    </div>
  </div>
);

}

export default ChatArea;