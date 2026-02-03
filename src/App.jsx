import React, { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Login from "./Pages/login";
import Chat from "./Pages/chat";
import InviteUser from "./Pages/inviteuser";
import Signup from "./Pages/signup";
import FloatingAi from "./components/floatingai";

import { getToken } from "./services/userService";
import { ToastContainer } from "react-toastify";
import { SocketProvider } from "./contexts/SocketContext";

const PrivateRoute = ({ children }) => {
  const isToken = !!getToken();
  return isToken ? children : <Navigate to="/login" />;
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeConversationFromNotification, setActiveConversationFromNotification] =
    useState(null);

  // Notification click → open chat
  const handleNotification = (conversation_id) => {
    setActiveConversationFromNotification(conversation_id);
    navigate("/chat");
  };

  // Hide Floating AI on login or signup page
  const hideFloatingAi = location.pathname === "/login" || location.pathname === "/signup";

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
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat
                activeConversationFromNotification={
                  activeConversationFromNotification
                }
                setActiveConversationFromNotification={
                  setActiveConversationFromNotification
                }
              />
            </PrivateRoute>
          }
        />

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

      {/* Floating AI everywhere except login */}
      {!hideFloatingAi && <FloatingAi />}
    </SocketProvider>
  );
}

export default App;
