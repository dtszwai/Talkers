import { useParams } from "react-router-dom";
import { useMembershipContext } from "../../context/MemberContext";
import { useEffect } from "react";

const MembershipCheck = ({ children }) => {
  const { serverId } = useParams();
  const { isMember } = useMembershipContext();

  useEffect(() => {
    const checkMembership = async () => {
      try {
        await isMember(Number(serverId));
      } catch (error) {
        console.error("Error checking membership status.", error);
      }
    }
    checkMembership()
  }, [serverId])

  return <>{children}</>
}

export default MembershipCheck;