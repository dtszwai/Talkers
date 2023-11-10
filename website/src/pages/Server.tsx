import { Box, CssBaseline } from "@mui/material"
import PrimaryAppBar from './templates/PrimaryAppBar';
import PrimaryDrawer from "./templates/PrimaryDrawer";
import SecondaryDrawer from "./templates/SecondaryDrawer";
import Main from "./templates/Main";
import MessageInterface from "../components/Main/MessageInterface";
import ServerChannel from "../components/SecondaryDrawer/ServerChannel";
import UserServer from "../components/PrimaryDrawer/UserServer";
import { useNavigate, useParams } from "react-router-dom";
import useCrud from "../hooks/useCrud";
import { Server } from "../@types/server";
import { useEffect } from "react";

const Server = () => {
  const navigate = useNavigate();
  const { serverId, channelId } = useParams();

  const { dataCRUD, fetchData, error, isLoading } = useCrud<Server>(
    [],
    `/server/select/?by_serverid=${serverId}`
  );

  useEffect(() => {
    fetchData()
  }, [])

  const isChannel = () => {
    if (!channelId) return true
    else return dataCRUD.some((server) => server.channel_server.some(channel => channel.id === parseInt(channelId)))
  }

  if (error !== null && error.message === "400") {
    navigate("/")
  }

  useEffect(() => {
    if (!isChannel()) navigate(`/server/${serverId}`)
  }, [isChannel, channelId])



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <PrimaryAppBar />
      <PrimaryDrawer>
        <UserServer open={false} data={dataCRUD} />
      </PrimaryDrawer>
      <SecondaryDrawer>
        <ServerChannel data={dataCRUD} />
      </SecondaryDrawer>
      <Main>
        <MessageInterface />
      </Main>
    </Box>
  )
}

export default Server