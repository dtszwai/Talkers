import axios from "axios"
import { AuthServicesProps } from "../@types/auth-service"
import { useState } from "react"
import { BASE_URL } from "../config"

export const useAuthService = (): AuthServicesProps => {
  const getInitialLoggedInValue = () => {
    const loggedIn = localStorage.getItem("is_logged_in")
    return loggedIn === 'true';
  }

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(getInitialLoggedInValue);

  const getUserDetails = async () => {
    try {
      const user_id = localStorage.getItem("user_id");
      const response = await axios.get(
        `${BASE_URL}/account/?user_id=${user_id}`,
        { withCredentials: true }
      );
      const userDetails = response.data;
      localStorage.setItem("username", userDetails.username)
    } catch (error) {
      setIsLoggedIn(false);
      localStorage.setItem("is_logged_in", "false")
      return error;
    }
  }

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/token/`,
        { username, password, },
        { withCredentials: true }
      );
      const user_id = response.data.user_id
      localStorage.setItem("is_logged_in", "true");
      localStorage.setItem("user_id", user_id);
      setIsLoggedIn(true);
      getUserDetails();
    } catch (error) {
      return error.response.status
    }
  }

  const logout = () => {
    localStorage.setItem("is_logged_in", "false")
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    setIsLoggedIn(false)
  }

  return { login, logout, isLoggedIn }
}