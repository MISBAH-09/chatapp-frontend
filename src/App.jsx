import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Pages/login'
import Chat from './pages/chat'
import { getToken } from './services/userService'

function App() {
  const isToken = !!getToken(); // convert to true/false

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          isToken ? <Chat /> : <Navigate to="/login" />
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App;
