// import React from "react";
// import Header from "../components/header";
// import Sidebar from "../components/sidebar";
// import Chatbar from "../components/chatbar";

// function Chat() {
//   return (
//     <div className="h-screen flex flex-col overflow-hidden">
//       <Header />

//       <div className="flex flex-1 overflow-hidden ">
//         <Sidebar />
//         <Chatbar />
//       </div>
//     </div>
//   );
// }

// export default Chat;

import React from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Chatbar from "../components/chatbar";

function Chat({ activeConversationFromNotification, setActiveConversationFromNotification }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Chatbar
          activeConversationFromNotification={activeConversationFromNotification}
          setActiveConversationFromNotification={setActiveConversationFromNotification}
        />
      </div>
    </div>
  );
}

export default Chat;