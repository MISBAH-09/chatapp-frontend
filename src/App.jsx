import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/login";
import Chat from "./Pages/chat";
import InviteUser from "./Pages/inviteuser";
import { getToken } from "./services/userService";
import { ToastContainer, toast } from 'react-toastify';
import { SocketProvider  , useSocket} from "./contexts/SocketContext";

const PrivateRoute = ({ children }) => {
  const isToken = !!getToken();
  return isToken ? children : <Navigate to="/login" />;
};
// import { useState } from "react";
// import Chat from "./Pages/chat";

function App() {
  const [activeConversationFromNotification, setActiveConversationFromNotification] = useState(null);

  const handleNotification = (conversation_id) => {
    setActiveConversationFromNotification(conversation_id);
  };

  return (
    <SocketProvider onNotification={handleNotification}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        pauseOnHover
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={
          <PrivateRoute>
            <Chat
              activeConversationFromNotification={activeConversationFromNotification}
              setActiveConversationFromNotification={setActiveConversationFromNotification}
            />
          </PrivateRoute>
        } />

        <Route
          path="/inviteuser"
          element={
            <PrivateRoute>
              <InviteUser />
            </PrivateRoute>
          }
        />

        <Route path="/" element={<Navigate to="/chat" />} />
        <Route path="*" element={<Navigate to="/chat" />} />
      </Routes>
    </SocketProvider>
  );
}

// function App() {
//   return (
//     <>
//       <SocketProvider>
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         newestOnTop
//         pauseOnHover
//       />

//       {/* 🔀 ROUTES ONLY */}
//       <Routes>
//         <Route path="/login" element={<Login />} />

//         <Route
//           path="/chat"
//           element={
//             <PrivateRoute>
//               <Chat />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/inviteuser"
//           element={
//             <PrivateRoute>
//               <InviteUser />
//             </PrivateRoute>
//           }
//         />

//         <Route path="/" element={<Navigate to="/chat" />} />
//         <Route path="*" element={<Navigate to="/chat" />} />
//       </Routes>
//     </SocketProvider>
//     </>
//   );
// }

export default App;
