import { useNavigate } from 'react-router-dom'
import axios, { AxiosInstance } from 'axios'
import { useAuthService } from '../services/AuthServices';
import { BASE_URL } from '../config';

const useAxiosWithInterceptor = (): AxiosInstance => {
  const jwtAxios = axios.create({ baseURL: BASE_URL });
  const navigate = useNavigate();
  const { logout } = useAuthService();

  jwtAxios.interceptors.response.use(
    res => res,
    async (error) => {
      const originalRequest = error.config;
      const isUnauthorizedOrForbidden = [401, 403].includes(error.response?.status);

      if (isUnauthorizedOrForbidden) {
        axios.defaults.withCredentials = true
        try {
          const response = await axios.post(
            `${BASE_URL}/token/refresh/`,
          );
          if (response["status"] === 200) return jwtAxios(originalRequest)
        } catch (refreshError) {
          logout()
          navigate('/login');
          return Promise.reject(refreshError);
        }
      }
      throw error;
    }
  )
  return jwtAxios
}

export default useAxiosWithInterceptor;