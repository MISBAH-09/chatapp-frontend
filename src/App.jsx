import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/login";
import Chat from "./Pages/chat";
import InviteUser from "./Pages/inviteuser";
import { getToken } from "./services/userService";

const PrivateRoute = ({ children }) => {
  const isToken = !!getToken();
  return isToken ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/chat"
        element={
          <PrivateRoute>
            <Chat />
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
  );
}

export default App;
