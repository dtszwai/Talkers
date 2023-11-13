import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Explore from "./pages/Explore";
import ToggleColorMode from "./components/ToggleColorMode";
import Server from "./pages/Server";
import Login from "./pages/Login";
import AuthServiceProvider from "./context/AuthContext";
import TestLogin from "./pages/TestLogin";
import ProtectedRoute from "./services/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/testlogin" element={
        <ProtectedRoute>
          <TestLogin />
        </ProtectedRoute>
      } />
      <Route path="/server/:serverId/:channelId?" element={<Server />} />
      <Route path="/explore/:categoryName" element={<Explore />} />
    </Route>
  )
)

const App = () => {

  return (
    <AuthServiceProvider>
      <ToggleColorMode>
        <RouterProvider router={router} />
      </ToggleColorMode>
    </AuthServiceProvider>
  )
}

export default App
