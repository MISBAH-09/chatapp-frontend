import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const wsRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const seenMessages = useRef(new Set());
  const joinedConversations = useRef(new Set());

  const currentUserId = Number(localStorage.getItem("userId"));
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    if (!token) return;

    const wsUrl = `ws://localhost:8000/ws/global/?token=${token}`;

    const initSocket = () => {
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log("🟢 Global WebSocket connected");
        setConnected(true);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        // Handle messages
        if (["text", "image", "audio"].includes(data.type) && data.sender_id !== currentUserId) {
          const msgKey = `${data.conversation_id}-${data.id}`;
          
          if (!seenMessages.current.has(msgKey)) {
            seenMessages.current.add(msgKey);
            
            toast(
              <div className="flex flex-col">
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
            
            // Cleanup old messages
            if (seenMessages.current.size > 50) {
              const first = seenMessages.current.values().next().value;
              seenMessages.current.delete(first);
            }
          }
        }
        // Handle connected users
        else if (data.type === "connected_users") {
          console.log("🟢 Connected users:", data.users);
        }
      };

      ws.onerror = (err) => console.error("❌ Global WebSocket error:", err);

      ws.onclose = () => {
        console.log("🔴 Global WebSocket disconnected");
        setConnected(false);
        wsRef.current = null;
        setTimeout(initSocket, 2000);
      };

      wsRef.current = ws;
    };

    initSocket();
    return () => wsRef.current?.close();
  }, [token, currentUserId]);

  const sendMessage = ({ conversation_id, body, msg_type = "text", media }) => {
    if (wsRef.current?.readyState !== WebSocket.OPEN) {
      toast("Socket not connected yet!");
      return;
    }

    if (conversation_id && !joinedConversations.current.has(conversation_id)) {
      wsRef.current.send(JSON.stringify({
        type: "join_conversation",
        conversation_id
      }));
      joinedConversations.current.add(conversation_id);
    }

    wsRef.current.send(JSON.stringify({
      type: "chat_message",
      conversation_id,
      body,
      msg_type,
      media
    }));
  };

  const leaveConversation = (conversation_id) => {
    if (wsRef.current?.readyState === WebSocket.OPEN && joinedConversations.current.has(conversation_id)) {
      wsRef.current.send(JSON.stringify({
        type: "leave_conversation",
        conversation_id
      }));
      joinedConversations.current.delete(conversation_id);
    }
  };

  return (
    <SocketContext.Provider value={{
      wsRef,
      connected,
      sendMessage,
      leaveConversation,
      joinedConversations: joinedConversations.current
    }}>
      {children}
    </SocketContext.Provider>
  );
};
