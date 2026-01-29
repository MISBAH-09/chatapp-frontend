import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { fetchAllUsers, getAllConversation } from "../services/messageservices";

export const SocketContext = createContext(null);
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children, onNotification }) => {
  const wsRef = useRef(null);
  const seenMessages = useRef(new Set());
  const joinedConversations = useRef(new Set());

  const [connected, setConnected] = useState(false);
  const [allusers, setAllUsers] = useState([]);
  const [allconversations, setAllConversation] = useState([]);

  const token = localStorage.getItem("userToken");
  const currentUserId = Number(localStorage.getItem("userId"));

  // ---------------- Fetch initial data ----------------
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const usersResp = await fetchAllUsers();
        setAllUsers(usersResp.data);
        console.debug("Initial users loaded:", usersResp.data);

        const convResp = await getAllConversation();
        setAllConversation(convResp.data);
        console.debug("Initial conversations loaded:", convResp.data);
      } catch (err) {
        console.error("Error fetching initial data:", err);
      }
    };
    fetchInitialData();
  }, []);

  // ---------------- Initialize WebSocket ----------------
  useEffect(() => {
    if (!token) return;

    const wsUrl = `ws://localhost:8000/ws/global/?token=${token}`;

    const initSocket = () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) return;

      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        setConnected(true);
        console.log("WebSocket connected ✅");

        // Request initial server data
        ws.send(JSON.stringify({ type: "fetch_all_users" }));
        ws.send(JSON.stringify({ type: "get_all_conversations" }));
        console.debug("Requested initial user & conversation data");
      };

      ws.onclose = () => {
        setConnected(false);
        wsRef.current = null;
        console.warn("WebSocket closed. Reconnecting...");
        setTimeout(initSocket, 2000);
      };

      ws.onerror = (err) => console.error("WebSocket error:", err);

      ws.onmessage = (event) => {
        let data;
        try {
          data = JSON.parse(event.data);
        } catch {
          return;
        }
        console.debug("WS message received:", data);

        // ---------------- Handle notifications ----------------
        if (["text", "image", "audio"].includes(data.type) && data.sender_id !== currentUserId) {
          const msgKey = `${data.conversation_id}-${data.id}`;
          if (!seenMessages.current.has(msgKey)) {
            seenMessages.current.add(msgKey);

            console.debug("Firing toast for incoming message:", data);
            toast(
              <div
                className="flex flex-col cursor-pointer"
                onClick={() => onNotification?.(data.conversation_id)}
              >
                <span className="font-semibold text-sm">{data.sender_first_name} {data.sender_last_name}</span>
                <span className="text-xs text-gray-600 truncate">
                  {data.type === "text" ? `${data.body?.slice(0,25)}${data.body?.length>25?"...":""}` : `Sent a ${data.type}`}
                </span>
              </div>
            );

            if (seenMessages.current.size > 50) {
              const first = seenMessages.current.values().next().value;
              seenMessages.current.delete(first);
            }
          }
        }

        // ---------------- Update users / conversations ----------------
        switch (data.type) {
          case "fetch_all_users":
          case "user_list_update":
            console.debug("Updating user list from WS");
            setAllUsers(data.data || []);
            break;

          case "get_all_conversations":
          case "conversation_update":
            console.debug("Updating conversation list from WS");
            setAllConversation(data.data || []);
            break;

          case "chat_message_event":
            console.debug("Updating conversation with new chat_message_event:", data);
            setAllConversation(prev => {
              const convIndex = prev.findIndex(c => c.conversation_id === data.conversation_id);
              if (convIndex !== -1) {
                const updated = [...prev];
                updated[convIndex].latest_message_body = data.body;
                updated[convIndex].latest_message_time = data.created_at;
                return updated.sort((a,b) => new Date(b.latest_message_time) - new Date(a.latest_message_time));
              }
              return prev;
            });
            break;

          case "connected_users":
            console.debug("Updating online users list:", data.users);
            setAllUsers(prev =>
              prev.map(u => ({ ...u, online: data.users.includes(u.id) }))
            );
            break;

          default:
            console.debug("Unhandled WS type:", data.type, data);
        }
      };

      wsRef.current = ws;
    };

    initSocket();
    return () => wsRef.current?.close();
  }, [token, currentUserId, onNotification]);

  // ---------------- Send message utility ----------------
  const sendMessage = ({ conversation_id, body, msg_type = "text", media }) => {
    console.debug("sendMessage called:", { conversation_id, body, msg_type });
    if (wsRef.current?.readyState !== WebSocket.OPEN) {
      console.warn("WebSocket not ready, cannot send message");
      return;
    }

    if (conversation_id && !joinedConversations.current.has(conversation_id)) {
      console.debug("Joining conversation:", conversation_id);
      wsRef.current.send(JSON.stringify({ type: "join_conversation", conversation_id }));
      joinedConversations.current.add(conversation_id);
    }

    wsRef.current.send(JSON.stringify({ type: "chat_message", conversation_id, body, msg_type, media }));
    console.debug("Message sent to WS:", { conversation_id, body, msg_type });
  };

  return (
    <SocketContext.Provider
      value={{
        wsRef,
        connected,
        sendMessage,
        allusers,
        allconversations,
        joinedConversations: joinedConversations.current,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};