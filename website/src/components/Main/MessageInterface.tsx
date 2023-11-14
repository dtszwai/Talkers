import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket"
import useCrud from "../../hooks/useCrud";
import { Server } from "../../@types/server";
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography, useTheme } from "@mui/material";
import MessageInterfaceChannel from "./MessageInterfaceChannel";
import Scroll from "./Scroll";

interface ServerChannelProps {
  data: Server[];
}

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

interface SendMessageData {
  type: string;
  message: string;
}

const MessageInterface = (props: ServerChannelProps) => {
  const { data } = props
  const serverName = data?.[0]?.name ?? "Server"
  const serverDescription = data?.[0]?.description ?? "This is our home."
  const theme = useTheme()
  const [newMessage, setNewMessage] = useState<Message[]>([])
  const [message, setMessage] = useState("")
  const { serverId, channelId } = useParams()
  const { fetchData } = useCrud<Server>([], `/messages/?channel_id=${channelId}`)
  const socketUrl = channelId ? `ws://127.0.0.1:8000/${serverId}/${channelId}` : null;

  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: async () => {
      try {
        const data = await fetchData();
        setNewMessage(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error(err);
      }

    },
    onClose: (event) => {
      if (event.code == 4001) console.log('Authentication Error.');
      console.log('Closed.');
    },
    onError: () => {
      console.log('Error.');
    },
    onMessage: (msg) => {
      const data = JSON.parse(msg.data);
      setNewMessage(prev_msg => [...prev_msg, data.new_message]);
      setMessage("")
    }
  })

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
    const options = { hour: "2-digit", minute: "2-digit", hour12: true } as Intl.DateTimeFormatOptions
    const formattedTime = new Intl.DateTimeFormat('zh-HK', options).format(date);

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