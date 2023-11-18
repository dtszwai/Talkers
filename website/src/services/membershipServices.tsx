import { useState } from "react";
import useAxiosWithInterceptor from "../helpers/jwtinterceptor";
import { BASE_URL } from "../config";

interface IuseServer {
  joinServer: (serverId: number) => Promise<void>;
  leaveServer: (serverId: number) => Promise<void>;
  isMember: (serverId: number) => Promise<void>;
  isUserMember: boolean;
  error: Error | null;
  isLoading: boolean;
}

const useMembership = (): IuseServer => {
  const jwtAxios = useAxiosWithInterceptor();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserMember, setIsUserMember] = useState(false);

  const joinServer = async (serverId: number): Promise<void> => {
    setIsLoading(true);
    try {
      await jwtAxios.post(`${BASE_URL}/membership/${serverId}/`, {}, { withCredentials: true });
      setIsLoading(false);
      setIsUserMember(true);
    } catch (error: unknown) {
      setError(error as Error);
      setIsLoading(false);
      throw error;
    }
  }

  const leaveServer = async (serverId: number): Promise<void> => {
    setIsLoading(true);
    try {
      await jwtAxios.delete(`${BASE_URL}/membership/${serverId}/remove_member/`, { withCredentials: true });
      setIsLoading(false);
      setIsUserMember(false);
    } catch (error: unknown) {
      setError(error as Error);
      setIsLoading(false);
      throw error;
    }
  }

  const isMember = async (serverId: number): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await jwtAxios.get(`${BASE_URL}/membership/${serverId}/is_member/`, { withCredentials: true });
      setIsLoading(false);
      setIsUserMember(response.data.is_member);
    } catch (error: unknown) {
      setError(error as Error);
      setIsLoading(false);
      throw error;
    }
  }

  return { joinServer, leaveServer, isMember, isUserMember, error, isLoading }
}

export default useMembership