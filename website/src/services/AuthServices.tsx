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
      const access_token = localStorage.getItem("access_token");
      const response = await axios.get(
        `${BASE_URL}/account/?user_id=${user_id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      const userDetails = response.data;
      localStorage.setItem("username", userDetails.username)
      setIsLoggedIn(true)
      localStorage.setItem("is_logged_in", "true")
    } catch (error) {
      setIsLoggedIn(false);
      localStorage.setItem("is_logged_in", "false")
      return error;
    }
  }

  const getUserIdFromToken = (accessToken: string): string => {
    const tokenParts = accessToken.split('.')
    const encodedPayload = tokenParts[1]
    const decodedPayload = atob(encodedPayload)
    const payloadData = JSON.parse(decodedPayload)
    const userId = payloadData.user_id
    return userId
  }

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/token/`,
        { username, password, });
      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access)
      localStorage.setItem("refresh_token", refresh)
      localStorage.setItem("user_id", getUserIdFromToken(access))
      getUserDetails()
    } catch (error) {
      return error.response.status
    }
  }

  const logout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("user_id")
    localStorage.removeItem("username")
    localStorage.setItem("is_logged_in", "false")
    setIsLoggedIn(false)
  }

  return { login, logout, isLoggedIn }
}