import React, { useState, useEffect, useRef } from "react";
import {
  FaEllipsisV, FaInfoCircle, FaPaperPlane, FaMicrophone,
  FaPaperclip, FaPhone, FaSearch, FaVideo, FaArrowLeft,
  FaStop, FaTimes ,FaCheck
} from "react-icons/fa";
import { convertToBase64 ,convertAudioBlobToBase64 , formatTime } from "./helpermethods";
import { getAllConversationMessages ,delMessage ,updMessage } from "../services/messageservices";

function ChatArea({ conversationid, activeconversation, onBack, onMessageSent }) {
  const Backend_url = "http://localhost:8000/media/";

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
  const [originalMessageText, setOriginalMessageText] = useState(""); // to restore if cancel


  const messagesEndRef = useRef(null);
  const wsRef = useRef(null);
  const menuRef = useRef(null);

  // ---------------- HELPERS ----------------

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
    } catch(err) {
      console.error("Mic error:", err);
    }
  };

  const stopRecording = () => { mediaRecorder?.stop(); setIsRecording(false); };
  const cancelRecording = () => { setAudioBlob(null); setAudioPreview(null); setIsRecording(false); };

  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); };

  // ---------------- INITIAL LOAD ----------------
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

  // Click outside to close menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // ---------------- WEBSOCKET ----------------
  useEffect(() => {
    if(!conversationid) return;
    const token = localStorage.getItem("userToken");
    if(!token) return;

    const wsUrl = `ws://localhost:8000/ws/chat/${conversationid}/?token=${token}`;
    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onopen = () => console.log("WebSocket connected");
    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, {
        ...data,
        user_id: parseInt(localStorage.getItem("userId"))
      }]);
      if(onMessageSent) onMessageSent();
    };
    wsRef.current.onerror = (err) => console.error("WebSocket error", err);
    wsRef.current.onclose = () => console.log("WebSocket disconnected");

    return () => wsRef.current?.close();
  }, [conversationid]);

  // ---------------- SEND MESSAGE ----------------
  const sendmessage = async () => {
    if(isSending) return;
    if(!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    if(!messageText.trim() && !selectedImage && !audioBlob) return;

    setIsSending(true);
    try {
      let base64 = "";
      let messageType = "text";
      if(selectedImage) {
        base64 = await convertToBase64(selectedImage);
        messageType = "image";
      } else if(audioBlob) {
        base64 = await convertAudioBlobToBase64(audioBlob);
        messageType = "audio";
      }
      wsRef.current.send(JSON.stringify({ type: messageType, body: messageText, media: base64 }));
      setMessageText(""); setSelectedImage(null); setImagePreview(null);
      setAudioBlob(null); setAudioPreview(null);
    } finally { setIsSending(false); }
  };

  const handleDelete = async (message_id) => {
    try {
      await delMessage(message_id);
      setMenuOpenId(null);
    } catch (err) { console.error("Delete failed", err); }
  };

  const handleUpdate = (message_id ,message_body) => {
    setEditingMessageId(message_id);       // which message is being edited
    setMessageText(message_body);          // fill input bar with current message
    setOriginalMessageText(message_body);  // backup original text
    setMenuOpenId(null);                   // close menu
  };


  const confirmUpdate = async () => {
  if (!editingMessageId || !messageText.trim()) return;

  try {
    setIsSending(true);
    console.log("id ", editingMessageId)
    console.log("wertyuert",messageText)
    // Call your backend API to update message
    await updMessage(editingMessageId, messageText); 

    // Optimistically update message locally
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === editingMessageId ? { ...msg, body: messageText } : msg
      )
    );

    // Reset input
    setMessageText("");
    setEditingMessageId(null);
    setOriginalMessageText("");
  } catch (err) {
    console.error("Update failed", err);
  } finally {
    setIsSending(false);
  }
};



  if(!conversationid || !activeconversation) {
    return (
      <div className="flex flex-1 bg-gray-100 h-full w-full pl-1 ">
        <div className="w-full flex flex-col h-full items-center justify-center">
          <img src="/logo.png" className="h-40 w-40 rounded-full" />
          <p className="text-[50px] font-serif">Dreams Chat</p>
          <p className="text-xl font-mono">Start Messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 pl-1 bg-gray-200 h-full w-full">
      <div className="w-full flex flex-col bg-white h-full">

        {/* HEADER */}
        <div className="flex items-center h-14 border-b px-3 bg-cyan-500 shrink-0">
          <button onClick={onBack} className="md:hidden mr-2 text-xl"><FaArrowLeft /></button>
          <div className="flex items-center gap-2 flex-1">
            <img src={activeconversation.profile ? `${Backend_url}${activeconversation.profile}` : "/defaultuser.JPG"} className="h-12 w-12 rounded-full border-2 border-black" />
            <div>
              <p className="text-lg tracking-wide font-semibold">{activeconversation.first_name} {activeconversation.last_name}</p>
              <p className="text-sm">{activeconversation.username}</p>
            </div>
          </div>
          <div className="flex gap-4 text-lg"><FaSearch /><FaPhone /><FaVideo /><FaInfoCircle /></div>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-3 space-y-3">
          {messages.map((message) => {
            const loggedUserId = parseInt(localStorage.getItem("userId"));
            const isMine = message.sender_id === loggedUserId;

            return (
              <div key={message.id} className={`flex items-end gap-2 ${isMine ? "justify-end" : ""}`}>

                {!isMine && (
                  <img src={message.sender_profile ? `${Backend_url}${message.sender_profile}` : "/defaultuser.JPG"} className="h-8 w-8 rounded-full" />
                )}

                <div className="relative max-w-[60%] group">

                  <p className={`text-xs text-gray-500 flex ${isMine ? "justify-end" : ""}`}>
                    {message.sender_first_name} • {formatTime(message.created_at)}
                    {
                    message.created_at!== message.updated_at && (
                      <span className="text-xs text-gray-500 ml-2">Edited</span>
                    )}
                  </p>
                 
                  <div className={`relative p-2 rounded-xl text-sm ${isMine ? "bg-blue-100" : "bg-gray-200"}`}>
                    {message.status === "delete" ? (
                      <span className="italic text-gray-500">This message was deleted by {message.sender_first_name}</span>
                    ) : (
                      <>
                        {message.type === "image" && (
                          <img
                            src={`${Backend_url}${message.media_url}`}
                            className="rounded-lg max-w-[200px] max-h-[200px] object-cover"
                            alt="sent image"
                          />
                        )}

                        {message.type === "audio" && <audio controls src={`${Backend_url}${message.media_url}`} />}
                        {message.type === "text" && message.body}
                      </>
                    )}

                    {message.status !== "delete" && isMine &&(
                      <button
                        ref={menuRef}
                        onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpenId === message.id ? null : message.id); }}
                        className={`absolute top-1/2 -translate-y-1/2 ${isMine ? "-left-6" : "-right-6"}`}
                      >
                        <FaEllipsisV />
                      </button>
                    )}

                    {menuOpenId === message.id && (
                      <div onClick={(e) => e.stopPropagation()} className={`absolute top-1 mt-2 z-50 ${isMine ? "-left-28" : "-right-28"} bg-white shadow-lg rounded-md text-sm w-24`}>
                        <button className="block w-full text-left px-3 py-2 hover:bg-gray-100" onClick={() => handleUpdate(message.id , message.body)}>Update</button>
                        <button className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-red-500" onClick={() => handleDelete(message.id)}>Delete</button>
                      </div>
                    )}
                  </div>
                  
                </div>

                {isMine && (
                  <img src={message.sender_profile ? `${Backend_url}${message.sender_profile}` : "/defaultuser.JPG"} className="h-8 w-8 rounded-full" />
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* IMAGE & AUDIO PREVIEW */}
        {imagePreview && (
          <div className="px-3 pb-2 bg-gray-100">
            <div className="relative w-32">
              <img src={imagePreview} className="rounded-lg border" />
              <button onClick={() => { setSelectedImage(null); setImagePreview(null); }} className="absolute top-1 right-1 text-red-400 text-xs px-2 rounded"><FaTimes /></button>
            </div>
          </div>
        )}

        {audioPreview && (
          <div className="flex items-center gap-2 px-3 pb-2 bg-gray-100">
            <audio controls src={audioPreview} className='border-2 border-black rounded-full'></audio>
            <button onClick={cancelRecording} className="text-red-500 text-2xl rounded"><FaTimes /></button>
            <button onClick={sendmessage} disabled={isSending} className={`px-2 rounded text-2xl ${isSending ? "bg-gray-400" : "text-cyan-500"}`}><FaPaperPlane /></button>
          </div>
        )}

        {/* INPUT */}
        <div className="border-t p-3 bg-cyan-500 shrink-0">
          <div className="flex items-center gap-2">
            {/* Attach button (always visible) */}
            <input
              type="file"
              accept="image/*"
              id="imageInput"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if(file) { setSelectedImage(file); setImagePreview(URL.createObjectURL(file)); }
              }}
            />
            <button title='Attach' onClick={() => document.getElementById("imageInput").click()}>
              <FaPaperclip className="text-xl" />
            </button>

            {/* Text input */}
            <input
              type="text"
              placeholder="Write message here"
              className="flex-1 px-4 py-2 border rounded-full outline-none"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyUp={(e) => {
                if(e.key === "Enter" && !isSending){
                  if(editingMessageId){
                    confirmUpdate();
                  } else {
                    sendmessage();
                  }
                }
              }}
            />

            {/* Microphone (hide if recording or editing) */}
            {!isRecording && !audioPreview && !editingMessageId && (
              <button onClick={startRecording} title='Voice Message'>
                <FaMicrophone className="text-xl" />
              </button>
            )}
            {isRecording && (
              <button onClick={stopRecording} className="text-red-600">
                <FaStop className='text-lg' />
              </button>
            )}

            {/* Send / Update button */}
            <button
              onClick={editingMessageId ? confirmUpdate : sendmessage}
              disabled={isSending}
            >
              {editingMessageId ? <FaCheck className="text-xl text-green-600" /> : <FaPaperPlane className="text-xl" />}
            </button>

            {/* Cancel editing */}
            {editingMessageId && (
              <button
                onClick={() => {
                  setMessageText("");           // empty input
                  setEditingMessageId(null);    // exit edit mode
                  setOriginalMessageText("");   // clear backup
                  setSelectedImage(null);       // optional: clear attached image
                  setImagePreview(null);        // optional: clear preview
                }}
                className="text-red-500 ml-2"
              >
                <FaTimes />
              </button>
            )}


          </div>
        </div>


      </div>
    </div>
  );
}

export default ChatArea;
