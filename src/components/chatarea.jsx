import React from 'react';
import { FaEllipsisV, FaInfoCircle ,FaFilter, FaPhone, FaPlus, FaSearch, FaVideo } from "react-icons/fa";

function ChatArea() {
  return (
   <>
     <div className="w-4/5 border-2 border-yellow-500 bg-gray-200 ">
      {/* top header */}
      <div className='w-full flex flex-row h-12 mb-1 bg-white'>
          <div className="w-4/5 flex items-center gap-1 ml-2">
            <img src="/defaultuser.JPG" alt="avatar" className="h-9 w-9 rounded-full object-cover" />
            <div className="flex flex-col">
              <span className="text-lg">Misbah Sehar</span>
              <span className="text-xs text-gray-600 pb-2">Online</span>
            </div>
          </div>
        <div className='w-1/5 flex justify-end'>
          <div className="ml-auto mr-2 gap-5 m-2 pr-4 flex ">
              <button className="w-auto h-8"><FaSearch></FaSearch> </button>
              <button className="w-auto h-8"><FaPhone> </FaPhone> </button>
              <button className="w-auto h-8"><FaVideo> </FaVideo> </button>
              <button className="w-auto h-8"><FaInfoCircle ></FaInfoCircle > </button>
            </div>
        </div>
      </div>
      {/* chat part */}
      <div className='h-full bg-white p-2'>
        <h2>my messagess</h2>

        {/* if my message */}
        <div className='m-1 flex flex-column gap-2  '>
          <div className='mt-auto'>
            <img src="/defaultuser.JPG" alt="avatar" className="h-10 w-10 rounded-full object-cover ml-2" />
          </div>
          <div className="w-2/5" >
          <p className='text-[14px]'><span className='ml-1'>Misbah Sehar</span> <span className='ml-2'>2:00PM</span></p> 
          <div className=" bg-gray-200 rounded-xl  text-wrap">
            <p className='p-2'>srxtcygvuhbzrdxtfcy gvhbjzrxtcyvuhbez </p>
          </div>
          </div>
          <div className='flex items-center'>
            <button className="text-gray-400"><FaEllipsisV ></FaEllipsisV></button>
          </div>
        </div>
         {/* if others message message */}
        <div className='m-1 flex flex-column gap-2 justify-end '>
          <div className='flex items-center'>
            <button className="text-gray-400"><FaEllipsisV ></FaEllipsisV></button>
          </div>
           <div className="w-2/5" >
          <p className='text-[14px]'><span className='ml-1'>Misbah Sehar</span> <span className='ml-2'>2:00PM</span></p> 
          <div className=" bg-gray-200 rounded-xl  text-wrap">
            <p className='p-2'>srxtcygvuhbzrdxtfcy gvhbjzrxtcyvuhbez </p>
          </div>
          </div>
          <div className='mt-auto'>
            <img src="/defaultuser.JPG" alt="avatar" className="h-10 w-10 rounded-full object-cover ml-2" />
          </div>
        </div>
        <div className=' m-1 flex flex-column gap-2 justify-end  '>
          <div className='flex items-center'>
            <button className="text-gray-400"><FaEllipsisV ></FaEllipsisV></button>
          </div>
           <div className="w-2/5" >
          <p className='text-[14px]'><span className='ml-1'>Misbah Sehar</span> <span className='ml-2'>2:00PM</span></p> 
          <div className=" bg-gray-200 rounded-xl  text-wrap">
            <p className='p-2'>srxtcygvuhbzrdxtfcy gvhbjzrxtcyvuhbez </p>
          </div>
          </div>
          <div className='mt-auto'>
            <img src="/defaultuser.JPG" alt="avatar" className="h-10 w-10 rounded-full object-cover ml-2" />
          </div>
        </div>


        
        {/* if my message */}
        <div className='m-1 flex flex-column gap-2  '>
          <div className='mt-auto'>
            <img src="/defaultuser.JPG" alt="avatar" className="h-10 w-10 rounded-full object-cover ml-2" />
          </div>
          <div className="w-2/5" >
          <p className='text-[14px]'><span className='ml-1'>Misbah Sehar</span> <span className='ml-2'>2:00PM</span></p> 
          <div className=" bg-gray-200 rounded-xl  text-wrap">
            <p className='p-2'>srxtcygvuhbzrdxtfcy gvhbjzrxtcyvuhbez </p>
          </div>
          </div>
          
          <div className='flex items-center'>
            <button className="text-gray-400"><FaEllipsisV ></FaEllipsisV></button>
          </div>
        </div>
        
      </div>
    </div>
   
   </>
  );
}

export default ChatArea;