import axios from "axios"
import { AuthServicesProps } from "../@types/auth-service"
import { useState } from "react"
import { BASE_URL } from "../config"
import { useNavigate } from "react-router-dom"

export const useAuthService = (): AuthServicesProps => {
  const navigate = useNavigate()

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

  const refreshAccessToken = async () => {
    try {
      await axios.post(
        `${BASE_URL}/token/refresh/`, {}, { withCredentials: true }
      )
    } catch (refreshError) {
      return Promise.reject(refreshError)
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

  const logout = async () => {
    localStorage.setItem("is_logged_in", "false")
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    setIsLoggedIn(false)
    navigate("/login")

    try {
      await axios.post(
        `${BASE_URL}/logout/`, {}, { withCredentials: true }
      )
    } catch (refreshError) {
      return Promise.reject(refreshError)
    }
  }

  const register = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/register/`,
        { username, password, },
        { withCredentials: true }
      );
      return response.status
    } catch (error) {
      return error.response.status
    }
  }

  return { login, logout, register, isLoggedIn, refreshAccessToken }
}