import { createContext, useContext } from "react";
import { AuthServicesProps } from '../@types/auth-service'
import { useAuthService } from '../services/AuthServices'

const AuthServiceContext = createContext<AuthServicesProps | null>(null);

const AuthServiceProvider = (props: React.PropsWithChildren<object>) => {
  const authServices = useAuthService();
  return (
    <AuthServiceContext.Provider value={authServices}>
      {props.children}
    </AuthServiceContext.Provider>
  )
}

export const useAuthServiceContext = (): AuthServicesProps => {
  const context = useContext(AuthServiceContext);

  if (context === null) {
    throw new Error("Error - You have to use the AuthServiceProvider");
  }

  return context;
}

export default AuthServiceProvider;