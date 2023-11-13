import { useState } from "react";
import { useAuthServiceContext } from "../context/AuthContext"
import useAxiosWithInterceptor from "../helpers/jwtinterceptor";
import { BASE_URL } from "../config";

const TestLogin = () => {
  const { isLoggedIn, logout } = useAuthServiceContext();
  const [username, setUsername] = useState("");
  const jwtAxios = useAxiosWithInterceptor();

  const getUserDetails = async () => {
    try {
      const user_id = localStorage.getItem("user_id");
      const access_token = localStorage.getItem("access_token");
      const response = await jwtAxios.get(
        `${BASE_URL}/account/?user_id=${user_id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      const userDetails = response.data;
      setUsername(userDetails.username)
    } catch (error) {
      return error;
    }
  }

  return <>
    <div>
      {isLoggedIn.toString()}
    </div>
    <div>
      <button onClick={logout}>Logout</button>
      <button onClick={getUserDetails}>Get User Details</button>
    </div>
    <div>Username: {username}</div>
  </>
}

export default TestLogin