import axios, { AxiosInstance } from 'axios'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../config';

const useAxiosWithInterceptor = (): AxiosInstance => {
  const jwtAxios = axios.create({ baseURL: BASE_URL });
  const navigate = useNavigate();

  jwtAxios.interceptors.response.use(
    res => res,
    async (error) => {
      const originalRequest = error.config;
      const isUnauthorizedOrForbidden = [401, 403].includes(error.response?.status);

      if (isUnauthorizedOrForbidden) {
        const refreshToken = localStorage.getItem("refresh_token")
        if (refreshToken) {
          try {
            const refreshResponse = await axios.post(
              `${BASE_URL}/token/refresh/`,
              {
                refresh: refreshToken,
              }
            );
            const newAccessToken = refreshResponse.data.access;
            localStorage.setItem('access_token', newAccessToken)
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
            return jwtAxios(originalRequest)
          } catch (refreshError) {
            navigate('/login');
            throw refreshError;
          }
        } else {
          navigate('/login')
        }
      }
      throw error;
    }
  )
  return jwtAxios
}

export default useAxiosWithInterceptor;