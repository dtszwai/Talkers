import { createContext, useContext } from "react";
import useMembership from '../services/membershipServices'

interface IuseServer {
  joinServer: (serverId: number) => Promise<void>;
  leaveServer: (serverId: number) => Promise<void>;
  isMember: (serverId: number) => Promise<void>;
  isUserMember: boolean;
  error: Error | null;
  isLoading: boolean;
}

const MembershipContext = createContext<IuseServer | null>(null);

const MembershipProvider = (props: React.PropsWithChildren<object>) => {
  const membership = useMembership();
  return (
    <MembershipContext.Provider value={membership}>
      {props.children}
    </MembershipContext.Provider>
  )
}

export const useMembershipContext = (): IuseServer => {
  const context = useContext(MembershipContext);

  if (context === null) {
    throw new Error("Error - You have to use the MembershipProvider");
  }

  return context;
}

export default MembershipProvider;