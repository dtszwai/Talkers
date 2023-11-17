import { useState } from "react";
import useWebSocket from "react-use-websocket"
import { useAuthService } from "../services/AuthServices";
import useCrud from "../hooks/useCrud";
import { Server } from "../@types/server";
import { WS_ROOT } from "../config";

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

const useChatWebSocket = (serverId: string, channelId: string) => {
  const [message, setMessage] = useState("")
  const [newMessage, setNewMessage] = useState<Message[]>([])

  const socketUrl = channelId ? `${WS_ROOT}/${serverId}/${channelId}` : null;
  const { fetchData } = useCrud<Server>([], `/messages/?channel_id=${channelId}`)
  const { logout, refreshAccessToken } = useAuthService()

  const [reconnectionAttempt, setReconnectionAttempt] = useState(0);
  const maxConntectionAttempts = 4;

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
      if (event.code == 4001) {
        console.log('Authentication Error.');
        refreshAccessToken().catch((error) => {
          if (error.response?.status === 401) {
            logout()
          }
        })
      }
      console.log('Closed.');
      setReconnectionAttempt((prevAttempt) => prevAttempt + 1)
    },
    onError: () => {
      console.log('Error.');
    },
    onMessage: (msg) => {
      const data = JSON.parse(msg.data);
      setNewMessage(prev_msg => [...prev_msg, data.new_message]);
      setMessage("")
    },
    shouldReconnect: (closeEvent) => {
      if (closeEvent.code === 4001 && reconnectionAttempt >= maxConntectionAttempts) {
        setReconnectionAttempt(0)
        return false
      }
      return true
    },
    reconnectInterval: 1000
  })

  return { newMessage, message, setMessage, sendJsonMessage }

}

export default useChatWebSocket