export interface AuthServicesProps {
  login: (username: string, password: string) => Promise<unknown>;
  logout: () => void;
  register: (username: string, password: string) => Promise<unknown>;
  isLoggedIn: boolean;
  refreshAccessToken: () => Promise<void>;
}
