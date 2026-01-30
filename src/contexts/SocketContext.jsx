import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { fetchAllUsers, getAllConversation } from "../services/messageservices";

export const SocketContext = createContext(null);
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children, onNotification }) => {
  const wsRef = useRef(null);
  const seenMessages = useRef(new Set());
  const joinedConversations = useRef(new Set());
  const reconnectTimeout = useRef(null);

  const [connected, setConnected] = useState(false);
  const [allusers, setAllUsers] = useState([]);
  const [allconversations, setAllConversation] = useState([]);

  const token = localStorage.getItem("userToken");
  const currentUserId = Number(localStorage.getItem("userId"));

  // ---------------- HELPER TO FORMAT CONVERSATIONS ----------------
  const formatConversations = (conversations) => {
    return (conversations || []).map(c => {
      const latestMsgTime = c.latest_message_time || c.created_at || new Date().toISOString();
      let displayUser = null;
      if (!c.is_group && c.participants && c.participants.length > 0) {
        displayUser = c.participants.find(p => p.id !== currentUserId) || c.participants[0];
      }
      return {
        ...c,
        latest_message_time: latestMsgTime,
        displayUser,
      };
    }).sort((a, b) => new Date(b.latest_message_time) - new Date(a.latest_message_time));
  };

  // ---------------- INITIAL DATA LOAD ----------------
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const usersResp = await fetchAllUsers();
        setAllUsers(usersResp.data || []);

        const convResp = await getAllConversation();
        setAllConversation(formatConversations(convResp.data));
      } catch (err) {
        console.error("[ERROR] Initial data load failed:", err);
      }
    };
    loadInitialData();
  }, []);

  // ---------------- REFRESH FUNCTION ----------------
  const refreshConversations = async () => {
    try {
      const res = await getAllConversation();
      setAllConversation(formatConversations(res.data));
    } catch (err) {
      console.error("[ERROR] Refresh conversations failed:", err);
    }
  };

  // ---------------- SOCKET CONNECTION ----------------
  const connectSocket = () => {
    if (!token) return;
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket(`ws://localhost:8000/ws/global/?token=${token}`);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      console.log("[WS] Connected ✅");
      ws.send(JSON.stringify({ type: "fetch_all_users" }));
      ws.send(JSON.stringify({ type: "get_all_conversations" }));
    };

    ws.onclose = () => {
      setConnected(false);
      console.warn("[WS] Disconnected. Reconnecting in 2s...");
      wsRef.current = null;

      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
      reconnectTimeout.current = setTimeout(connectSocket, 2000);
    };

    ws.onerror = (err) => console.error("[WS ERROR]", err);

    ws.onmessage = (event) => {
      let data;
      try { data = JSON.parse(event.data); } catch { return; }

      // ---------------- NOTIFICATIONS ----------------
      if (["text", "image", "audio"].includes(data.type) && data.sender_id !== currentUserId) {
        const msgKey = `${data.conversation_id}-${data.id}`;
        if (!seenMessages.current.has(msgKey)) {
          seenMessages.current.add(msgKey);

          toast(
            <div className="flex flex-col cursor-pointer" onClick={() => onNotification?.(data.conversation_id)}>
              <span className="font-semibold text-sm">{data.sender_first_name} {data.sender_last_name}</span>
              <span className="text-xs text-gray-600 truncate">
                {data.type === "text" ? `${data.body?.slice(0,25)}${data.body?.length>25?"...":""}` : `Sent a ${data.type}`}
              </span>
            </div>
          );

          refreshConversations();

          if (seenMessages.current.size > 50) {
            const first = seenMessages.current.values().next().value;
            seenMessages.current.delete(first);
          }
        }
      }

      // ---------------- STATE UPDATES ----------------
      switch (data.type) {
        case "fetch_all_users":
        case "user_list_update":
          setAllUsers(data.data || []);
          break;

        case "get_all_conversations":
        case "conversation_update":
          setAllConversation(formatConversations(data.data));
          break;

        default:
          break;
      }
    };
  };

  useEffect(() => {
    connectSocket();
    return () => {
      wsRef.current?.close();
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
    };
  }, [token, currentUserId]);

  // ---------------- SEND MESSAGE ----------------
  const sendMessage = async ({ conversation_id, body, msg_type="text", media }) => {
    if (wsRef.current?.readyState !== WebSocket.OPEN) return;

    if (conversation_id && !joinedConversations.current.has(conversation_id)) {
      wsRef.current.send(JSON.stringify({ type: "join_conversation", conversation_id }));
      joinedConversations.current.add(conversation_id);
    }

    wsRef.current.send(JSON.stringify({ type: "chat_message", conversation_id, body, msg_type, media }));

    await refreshConversations();
  };

  return (
    <SocketContext.Provider value={{
      wsRef,
      connected,
      sendMessage,
      allusers,
      allconversations,
      refreshConversations,
      joinedConversations: joinedConversations.current
    }}>
      {children}
    </SocketContext.Provider>
  );
};