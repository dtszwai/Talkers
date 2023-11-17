import { Route, BrowserRouter, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Explore from "./pages/Explore";
import ToggleColorMode from "./components/ToggleColorMode";
import Server from "./pages/Server";
import Login from "./pages/Login";
import AuthServiceProvider from "./context/AuthContext";
import TestLogin from "./pages/TestLogin";
import ProtectedRoute from "./services/ProtectedRoute";
import Register from "./pages/Register";

const App = () => {
  return (
    <BrowserRouter>
      <AuthServiceProvider>
        <ToggleColorMode>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/testlogin" element={
              <ProtectedRoute>
                <TestLogin />
              </ProtectedRoute>
            } />
            <Route path="/server/:serverId/:channelId?" element={
              <ProtectedRoute>
                <Server />
              </ProtectedRoute>
            } />
            <Route path="/explore/:categoryName" element={<Explore />} />
          </Routes>        </ToggleColorMode>
      </AuthServiceProvider>
    </BrowserRouter>
  )
}

export default App
