import { useEffect, useState } from "react";
import { Server } from '../../@types/server';
import { MEDIA_URL } from "../../config";
import ServerChannel from "../SecondaryDrawer/ServerChannel";
import { MoreVert } from "@mui/icons-material";
import { AppBar, Avatar, Box, Drawer, IconButton, ListItemAvatar, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";

interface ServerChannelProps {
  data: Server[];
}

const MessageInterfaceChannel = (props: ServerChannelProps) => {
  const { data } = props;
  const { serverId, channelId } = useParams();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const channelName = data
    ?.find(server => server.id == Number(serverId))
    ?.channel_server?.find(channel => channel.id === Number(channelId))
    ?.name || "Home"

  useEffect(() => {
    if (isSmallScreen && isSideMenuOpen)
      setIsSideMenuOpen(false)
  }, [isSmallScreen])

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift"))
      return;

    setIsSideMenuOpen(open)
  }

  const list = () => (
    <Box
      sx={{ paddingTop: `${theme.primaryAppBar.height}px`, minWidth: 200 }}
    // onClick={toggleDrawer(false)}
    // onKeyDown={toggleDrawer(false)}
    >
      <ServerChannel data={data} />
    </Box>
  )

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: theme.palette.background.default,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
        color="default"
        position="sticky"
        elevation={0}
      >
        <Toolbar variant="dense"
          sx={{
            minHeight: theme.primaryAppBar.height,
            height: theme.primaryAppBar.height,
            display: "flex",
            alignItems: "center"
          }}
        >
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <ListItemAvatar sx={{ minWidth: "40px" }}>
              <Avatar alt="Server Icon" src={`${MEDIA_URL}${data?.[0]?.icon}`}
                sx={{ width: 30, height: 30 }}
              />
            </ListItemAvatar>
          </Box>
          <Typography noWrap component="div">
            {channelName}
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton color="inherit" edge="end" onClick={toggleDrawer(true)}>
              <MoreVert />
            </IconButton>
          </Box>
          <Drawer anchor="left" open={isSideMenuOpen} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default MessageInterfaceChannel;