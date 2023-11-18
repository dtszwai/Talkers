import React from "react";
import { useParams } from "react-router-dom";
import { Server } from "../../@types/server";
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography, useTheme } from "@mui/material";
import MessageInterfaceChannel from "./MessageInterfaceChannel";
import Scroll from "./Scroll";
import useChatWebSocket from "../../services/chatServices";

interface ServerChannelProps {
  data: Server[];
}

interface SendMessageData {
  type: string;
  message: string;
}

const MessageInterface = (props: ServerChannelProps) => {
  const { data } = props;
  const serverName = data?.[0]?.name ?? "Server"
  const { serverId, channelId } = useParams();
  const { message, setMessage, newMessage, sendJsonMessage } = useChatWebSocket(serverId || "", channelId || "")
  const theme = useTheme()
  const serverDescription = data?.[0]?.description ?? "This is our home."


  const sendMessage = () => sendJsonMessage({ type: "message", message })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendJsonMessage({ type: "message", message } as SendMessageData)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendJsonMessage({ type: "message", message } as SendMessageData)
    }
  }

  const formatTimeStamp = (timestamp: string) => {
    const date = new Date(Date.parse(timestamp));
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    const options = { hour: "numeric", minute: "2-digit", hour12: false } as Intl.DateTimeFormatOptions
    const formattedTime = new Intl.DateTimeFormat(undefined, options).format(date);

    return `${formattedDate} ${formattedTime}`
  }


  return (<>
    <MessageInterfaceChannel data={data} />
    {channelId == undefined
      ? <Box sx={{
        overflow: 'hidden',
        p: { xs: 0 },
        height: `calc(80vh)`,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            fontWeight={700}
            letterSpacing={"-0.5px"}
            sx={{ px: 5, maxWidth: "600px" }}
          >
            Welcome to {serverName}
          </Typography>
          <Typography>
            {serverDescription}
          </Typography>
        </Box>
      </Box >
      : <>
        <Box sx={{ overflow: "hidden", p: 0, height: `calc(100vh - 100px)` }}>
          <Scroll>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {newMessage.map((msg, i) => {
                return (
                  <ListItem key={i} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="User Image" />
                    </ListItemAvatar>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: "12px", variant: "body2" }}
                      primary={
                        <>
                          <Typography
                            component="span"
                            variant="body1"
                            color="text.primaary"
                            sx={{ display: "inline", fontW: 600 }}
                          >
                            {`${msg.sender}${" "}`}
                          </Typography>
                          <Typography component="span" variant="caption" color="textSecondary">
                            {formatTimeStamp(msg.timestamp)}
                          </Typography>
                        </>
                      }
                      secondary={
                        <>
                          <Typography
                            variant="body1"
                            style={{ overflow: "visible", whiteSpace: "normal", textOverflow: "clip" }}
                            sx={{ display: "inline", lineHeight: 1.2, fontWeight: 400, letterSpacing: "-0.2px" }}
                            component="span"
                            color="text.primary"
                          >
                            {msg.content}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                )
              })}
            </List>
          </Scroll>
        </Box>
        <Box
          sx={{ position: "sticky", bottom: 0, width: "100%" }}>
          <form
            onSubmit={handleSubmit}
            style={{ bottom: 0, right: 0, padding: "1rem", backgroundColor: theme.palette.background.default, zIndex: 1 }}
          >
            <Box
              sx={{ display: "flex" }}
            >
              <TextField
                fullWidth
                multiline
                minRows={1}
                maxRows={4}
                sx={{ flexGrow: 1 }}
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </Box>
            <button onClick={sendMessage} >Send Message</button>
          </form>
        </Box>
      </>
    }
  </>
  )
}

export default MessageInterface