import { useMembershipContext } from "../../context/MemberContext";
import { useParams } from "react-router-dom";

const JoinServerButton = () => {
  const { serverId } = useParams();
  const { joinServer, leaveServer, isUserMember, error, isLoading } = useMembershipContext()

  const handleJoinServer = async () => {
    try {
      await joinServer(Number(serverId));
      console.log("User has joined the server.");
    } catch (error) {
      console.error("Error joining the server:", error);
    }
  }

  const handleLeaveServer = async () => {
    try {
      await leaveServer(Number(serverId));
      console.log("User has left the server successfully.");
    } catch (error) {
      console.error("Error leaving the server:", error);
    }
  }


  if (isLoading) {
    return <div>Loading...</div>
  }

  // if (error) {
  //   return <div>Error: {error.message}</div>
  // }


  return (
    <>
      isMember:{isUserMember.toString()}
      {isUserMember ? (
        <button onClick={handleLeaveServer}>Leave Server</button>
      ) : (
        <button onClick={handleJoinServer}>Join Server</button>
      )}
    </>
  )
}

export default JoinServerButton