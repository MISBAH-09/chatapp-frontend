import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export const SocketContext = createContext(null);
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children, onNotification }) => {
  const wsRef = useRef(null);
  const seenMessages = useRef(new Set());
  const joinedConversations = useRef(new Set());
  const [connected, setConnected] = useState(false);

  const currentUserId = Number(localStorage.getItem("userId"));
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    if (!token) return;

    const wsUrl = `ws://localhost:8000/ws/global/?token=${token}`;

    const initSocket = () => {
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => setConnected(true);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Ignore non-chat payloads
      if (!["text", "image", "audio"].includes(data.type)) return;

      // Ignore self messages FOR NOTIFICATIONS ONLY
      if (data.sender_id === currentUserId) return;

      const msgKey = `${data.conversation_id}-${data.id}`;
      if (seenMessages.current.has(msgKey)) return;

      seenMessages.current.add(msgKey);

      toast(
        <div
          className="flex flex-col cursor-pointer"
          onClick={() => onNotification?.(data.conversation_id)}
        >
          <span className="font-semibold text-sm">
            {data.sender_first_name} {data.sender_last_name}
          </span>
          <span className="text-xs text-gray-600 truncate">
            {data.type === "text"
              ? `${data.body?.slice(0, 25)}${data.body?.length > 25 ? "..." : ""}`
              : `Sent a ${data.type}`}
          </span>
        </div>
      );
      
      if (seenMessages.current.size > 50) {
        const first = seenMessages.current.values().next().value;
        seenMessages.current.delete(first);
      }
    };

      ws.onclose = () => {
        setConnected(false);
        wsRef.current = null;
        setTimeout(initSocket, 2000);
      };

      ws.onerror = console.error;

      wsRef.current = ws;
    };

    initSocket();
    return () => wsRef.current?.close();
  }, [token, currentUserId, onNotification]);

  const sendMessage = ({ conversation_id, body, msg_type = "text", media }) => {
    if (wsRef.current?.readyState !== WebSocket.OPEN) return;
    if (conversation_id && !joinedConversations.current.has(conversation_id)) {
      wsRef.current.send(JSON.stringify({ type: "join_conversation", conversation_id }));
      joinedConversations.current.add(conversation_id);
    }
    wsRef.current.send(JSON.stringify({ type: "chat_message", conversation_id, body, msg_type, media }));
  };

  return (
    <SocketContext.Provider value={{ wsRef, connected, sendMessage, joinedConversations: joinedConversations.current }}>
      {children}
    </SocketContext.Provider>
  );
};