import React, { useState, useEffect, useRef } from "react";
import { useSocket } from "../contexts/SocketContext";
import { toast } from "react-toastify";
import {
  FaEllipsisV, FaInfoCircle, FaPaperPlane, FaMicrophone,
  FaPaperclip, FaPhone, FaSearch, FaVideo, FaArrowLeft,
  FaStop, FaTimes, FaCheck
} from "react-icons/fa";

import { convertToBase64, convertAudioBlobToBase64, formatTime } from "./helpermethods";
import { getAllConversationMessages, updMessage, delMessage } from "../services/messageservices";
const Backend_url = import.meta.env.VITE_BACKEND_URL;

function ChatArea({ conversationid, activeconversation, onBack }) {
  const [showSearchbar, setshowSearchbar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [originalMessageText, setOriginalMessageText] = useState("");

  const messagesEndRef = useRef(null);
  const searchRef = useRef(null);

  const { wsRef, sendMessage, connected } = useSocket();

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });

  // ---------------- Fetch messages ----------------
  const getMessages = async () => {
    if (!conversationid) return;
    try {
      const response = await getAllConversationMessages(conversationid);
      setMessages(response.data);
    } catch(err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => { if(conversationid) getMessages(); }, [conversationid]);
  useEffect(() => { scrollToBottom(); }, [messages]);

  // ---------------- Highlight search ----------------
  const highlightText = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? <mark key={i} className="bg-yellow-300">{part}</mark> : part
    );
  };

  // ---------------- Listen global / conversation messages ----------------
  useEffect(() => {
    if (!wsRef.current) return;

    const handleMessage = (event) => {
      let raw;
      try { raw = JSON.parse(event.data); } catch { return; }
      if (!raw.conversation_id || !raw.sender_id) return;

      const message = { ...raw, type: raw.type === "chat_message" ? raw.msg_type : raw.type };

      if (message.conversation_id !== conversationid) return;

      setMessages((prev) => {
        const tempIndex = prev.findIndex(msg => msg.id.toString().startsWith("temp-") && msg.body === message.body);
        if (tempIndex !== -1) {
          const newArr = [...prev];
          newArr[tempIndex] = message;
          return newArr;
        }
        if (prev.some(msg => msg.id === message.id)) return prev;
        return [...prev, message];
      });
    };

    wsRef.current.addEventListener("message", handleMessage);
    return () => wsRef.current?.removeEventListener("message", handleMessage);
  }, [conversationid, wsRef]);

  // ---------------- Send message with optimistic UI ----------------
  const sendmessage = async () => {
    if (isSending) return;
    if (!connected) { toast("Socket not connected yet!"); return; }
    if (!messageText.trim() && !selectedImage && !audioBlob) return;

    setIsSending(true);

    try {
      let base64 = "";
      let messageType = "text";

      if (selectedImage) {
        base64 = await convertToBase64(selectedImage);
        messageType = "image";
      } else if (audioBlob) {
        base64 = await convertAudioBlobToBase64(audioBlob);
        messageType = "audio";
      }

      const tempId = `temp-${Date.now()}`;
      const tempMessage = {
        id: tempId,
        type: messageType,
        body: messageText,
        media_url: messageType !== "text" ? base64 : null,
        conversation_id: conversationid,
        sender_id: parseInt(localStorage.getItem("userId")),
        sender_first_name: localStorage.getItem("userFirstName"),
        status: "active",
        is_edited: false,
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, tempMessage]);
      scrollToBottom();

      sendMessage({
        type: "chat_message",
        conversation_id: conversationid,
        body: messageText,
        msg_type: messageType,
        media: base64
      });

      setMessageText("");
      setSelectedImage(null);
      setImagePreview(null);
      setAudioBlob(null);
      setAudioPreview(null);
    } finally {
      setIsSending(false);
    }
  };

  // ---------------- Record audio ----------------
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      let chunks = [];
      recorder.ondataavailable = (e) => { if(e.data.size>0) chunks.push(e.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioPreview(URL.createObjectURL(blob));
        chunks = [];
      };
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch(err) { console.error("Mic error:", err); }
  };
  const stopRecording = () => { mediaRecorder?.stop(); setIsRecording(false); };
  const cancelRecording = () => { setAudioBlob(null); setAudioPreview(null); setIsRecording(false); };

  // ---------------- Click outside handlers ----------------
  useEffect(() => {
    const handleClickOutside = (e) => {
      setMenuOpenId(null); // close menu if click anywhere outside
      if (searchRef.current && !searchRef.current.contains(e.target)) setshowSearchbar(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // ---------------- Delete / Update ----------------
  const handleDelete = async (message_id) => {
    try { 
      await delMessage(message_id); 
      setMessages(prev => prev.map(msg => msg.id === message_id ? { ...msg, status: "delete" } : msg));
    } 
    catch (err) { console.error("Delete failed", err); }
    finally { setMenuOpenId(null); }
  };

  const handleUpdate = (message_id ,message_body) => {
    setEditingMessageId(message_id);
    setMessageText(message_body);
    setOriginalMessageText(message_body);
    setMenuOpenId(null);
  };

  const confirmUpdate = async () => {
    if (!editingMessageId || !messageText.trim()) return;
    try {
      setIsSending(true);
      await updMessage(editingMessageId, messageText); 
      setMessages(prev => prev.map(msg => msg.id === editingMessageId ? { ...msg, body: messageText, is_edited: true } : msg));
      setMessageText(""); setEditingMessageId(null); setOriginalMessageText("");
    } catch (err) { console.error("Update failed", err); } 
    finally { setIsSending(false); }
  };

  // ---------------- UI ----------------
  if(!conversationid || !activeconversation) {
    return (
      <div className="flex flex-1 bg-gray-100 h-full w-full pl-1 font-manrope">
        <div className="w-full flex flex-col h-full items-center justify-center">
          <img src="/logo.png" className="h-40 w-40 rounded-full" />
          <p className="text-[40px]">Dreams Chat</p>
          <p className="text-xl tracking-widest">Start Messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 pl-1 bg-gray-200 h-full w-full font-manrope">
      <div className="w-full flex flex-col bg-white h-full">

        {/* HEADER */}
        <div className="flex items-center h-14 border-b px-3 bg-gradient-to-r from-cyan-400/50 to-cyan-700/50 shrink-0 relative">
          <button onClick={onBack} className="md:hidden mr-2 text-xl">
            <FaArrowLeft />
          </button>

          <div className="flex items-center gap-2 flex-1">
            <img
              src={activeconversation.profile ? `${Backend_url}${activeconversation.profile}` : "/defaultuser.JPG"}
              className="h-12 w-12 rounded-full border-2 border-black"
            />
            <div className="truncate">
              <p className="text-lg tracking-wide font-semibold truncate">{activeconversation.title || "Chat"}</p>
            </div>
          </div>

          <div className="flex gap-4 text-lg">
            <FaSearch onClick={(e)=>{e.stopPropagation(); setshowSearchbar(prev=>!prev)}} className="cursor-pointer" />
            <FaPhone />
            <FaVideo />
            <FaInfoCircle />
          </div>

          {showSearchbar && (
            <div ref={searchRef} onClick={e=>e.stopPropagation()} className="absolute top-full right-0 w-full max-w-md mx-auto z-50 p-2 rounded shadow-lg flex items-center bg-white">
              <input type="text" placeholder="Search messages" value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}
                className="w-full rounded text-black border-2 border-black placeholder-gray-400 px-10 py-2 focus:outline-none focus:ring-2 focus:ring-black"/>
              <FaSearch className="absolute right-8 top-1/2 -translate-y-1/2 text-black"/>
            </div>
          )}
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-3 space-y-3">
          {messages.map(message => {
            const loggedUserId = parseInt(localStorage.getItem("userId"));
            const isMine = message.sender_id === loggedUserId;

            return (
              <div key={message.id} className={`flex items-end gap-2 ${isMine ? "justify-end" : ""}`}>
                {!isMine && <img src={message.sender_profile ? `${Backend_url}${message.sender_profile}` : "/defaultuser.JPG"} className="h-8 w-8 rounded-full" />}
                <div className="relative max-w-[60%] group">
                  <p className={`text-xs text-gray-500 flex ${isMine ? "justify-end" : ""}`}>
                    {message.sender_first_name || "User"} • {formatTime(message.created_at)}
                    {message.is_edited && <span className="text-xs text-gray-500 ml-2">Edited</span>}
                  </p>

                  <div className={`relative p-2 rounded-xl text-sm ${isMine ? "bg-blue-100" : "bg-gray-200"}`}>
                    {message.status === "delete" ? (
                      <span className="italic text-gray-500">This message was deleted by {message.sender_first_name}</span>
                    ) : (
                      <>
                        {message.type === "image" && <img src={message.media_url?.startsWith("http") ? message.media_url : `${Backend_url}${message.media_url}`} className="rounded-lg max-w-[200px] max-h-[200px] object-cover" alt="sent image"/>}
                        {message.type === "audio" && message.media_url && <audio controls src={`${Backend_url}${message.media_url}`} onLoadedData={scrollToBottom}/>}
                        {message.type === "text" && <span>{highlightText(message.body, searchTerm)}</span>}
                      </>
                    )}

                    {message.status !== "delete" && isMine && (
                      <button onClick={(e)=>{e.stopPropagation(); setMenuOpenId(menuOpenId===message.id?null:message.id)}} className="absolute top-1/2 -translate-y-1/2 -left-6">
                        <FaEllipsisV />
                      </button>
                    )}

                    {menuOpenId === message.id && (
                      <div onClick={e=>e.stopPropagation()} className="absolute top-1 mt-2 -left-28 z-50 bg-white shadow-lg rounded-md text-sm w-24">
                        <button className="block w-full text-left px-3 py-2 hover:bg-gray-100" onClick={() => handleUpdate(message.id , message.body)}>Update</button>
                        <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-red-500" onClick={() => handleDelete(message.id)}>Delete</button>
                      </div>
                    )}
                  </div>
                </div>

                {isMine && <img src={message.sender_profile ? `${Backend_url}${message.sender_profile}` : "/defaultuser.JPG"} className="h-8 w-8 rounded-full" />}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="border-t p-3 bg-gradient-to-r from-cyan-400/50 to-cyan-700/50 shrink-0">
          <div className="flex items-center gap-2">
            <input type="file" accept="image/*" id="imageInput" className="hidden" onChange={(e)=>{const file=e.target.files[0];if(file){setSelectedImage(file); setImagePreview(URL.createObjectURL(file))}}}/>
            <button title='Attach' onClick={()=>document.getElementById("imageInput").click()}><FaPaperclip className="text-xl" /></button>

            <input type="text" placeholder="Write message here" className="flex-1 px-4 py-2 border rounded-full outline-none" value={messageText} onChange={e=>setMessageText(e.target.value)}
              onKeyUp={(e)=>{if(e.key==="Enter"&&!isSending){editingMessageId?confirmUpdate():sendmessage()}}}
            />

            {!isRecording && !audioPreview && !editingMessageId && <button onClick={startRecording} title='Voice Message'><FaMicrophone className="text-xl" /></button>}
            {isRecording && <button onClick={stopRecording} className="text-red-600"><FaStop className='text-lg'/></button>}

            <button onClick={editingMessageId?confirmUpdate:sendmessage} disabled={isSending}>
              {editingMessageId?<FaCheck className="text-xl text-green-600"/>:<FaPaperPlane className="text-xl"/>}
            </button>

            {editingMessageId && <button onClick={()=>{setMessageText(""); setEditingMessageId(null); setOriginalMessageText(""); setSelectedImage(null); setImagePreview(null)}} className="text-red-500 ml-2"><FaTimes/></button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatArea;