export interface AuthServicesProps {
  login: (username: string, password: string) => Promise<unknown>;
  isLoggedIn: boolean;
  logout: () => void;
}
