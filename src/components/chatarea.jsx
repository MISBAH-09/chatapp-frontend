import React, { useState, useEffect, useRef } from "react";
import {
  FaEllipsisV, FaInfoCircle, FaPaperPlane, FaMicrophone,
  FaPaperclip, FaPhone, FaSearch, FaVideo, FaArrowLeft,
  FaStop, FaTimes
} from "react-icons/fa";

import { getAllConversationMessages } from "../services/messageservices";

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

  const messagesEndRef = useRef(null);
  const wsRef = useRef(null);

  // ---------------- HELPERS ----------------
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  const convertAudioBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

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

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

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

      // Add new message with proper sender info
      setMessages((prev) => [...prev, {
        ...data,
        user_id: parseInt(localStorage.getItem("userId")) // Logged-in user id
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

      wsRef.current.send(JSON.stringify({
        type: messageType,
        body: messageText,
        media: base64,
      }));

      // Reset input
      setMessageText("");
      setSelectedImage(null);
      setImagePreview(null);
      setAudioBlob(null);
      setAudioPreview(null);

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
            <img
              src={activeconversation.profile ? `${Backend_url}${activeconversation.profile}` : "/defaultuser.JPG"}
              className="h-12 w-12 rounded-full border-2 border-black"
            />
            <div>
              <p className="text-lg tracking-wide font-semibold">
                {activeconversation.first_name} {activeconversation.last_name}
              </p>
              <p className="text-sm">{activeconversation.username}</p>
            </div>
          </div>
          <div className="flex gap-4 text-lg">
            <FaSearch /><FaPhone /><FaVideo /><FaInfoCircle />
          </div>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-3 space-y-3">
          {messages.map((message) => {
            const loggedUserId = parseInt(localStorage.getItem("userId"));
            const isMine = message.sender_id === loggedUserId;

            return (
              <div key={message.id}>
                <div className={`flex items-end gap-2 ${isMine ? "justify-end" : ""}`}>
                  {!isMine && (
                    <img
                      src={message.sender_profile ? `${Backend_url}${message.sender_profile}` : "/defaultuser.JPG"}
                      className="h-8 w-8 rounded-full"
                    />
                  )}

                  <div className="max-w-[60%]">
                    <p className={`text-xs text-gray-500 flex ${isMine ? "justify-end" : ""}`}>
                      {message.sender_first_name} • {formatTime(message.created_at)}
                    </p>

                    <div className={`p-2 rounded-xl text-sm ${isMine ? "bg-blue-100" : "bg-gray-200"}`}>
                      {message.type === "image" && (
                        <img src={`${Backend_url}${message.media_url}`} className="rounded-lg max-w-xs" />
                      )}
                      {message.type === "audio" && (
                        <audio controls src={`${Backend_url}${message.media_url}`}></audio>
                      )}
                      {message.type === "text" && message.body}
                    </div>
                  </div>

                  {isMine && (
                    <img
                      src={message.sender_profile ? `${Backend_url}${message.sender_profile}` : "/defaultuser.JPG"}
                      className="h-8 w-8 rounded-full"
                    />
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* IMAGE PREVIEW */}
        {imagePreview && (
          <div className="px-3 pb-2 bg-gray-100">
            <div className="relative w-32">
              <img src={imagePreview} className="rounded-lg border" />
              <button
                onClick={() => { setSelectedImage(null); setImagePreview(null); }}
                className="absolute top-1 right-1 text-red-400 text-xs px-2 rounded"
              ><FaTimes /></button>
            </div>
          </div>
        )}

        {/* AUDIO PREVIEW */}
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
            <input
              type="text"
              placeholder="Write message here"
              className="flex-1 px-4 py-2 border rounded-full outline-none"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyUp={(e) => { if(e.key==="Enter" && !isSending) sendmessage(); }}
            />
            <button title='Attach' onClick={() => document.getElementById("imageInput").click()}><FaPaperclip className="text-xl" /></button>
            {!isRecording && !audioPreview && (<button onClick={startRecording} title='Voice Message'><FaMicrophone className="text-xl" /></button>)}
            {isRecording && (<button onClick={stopRecording} className="text-red-600"><FaStop className='text-lg'></FaStop></button>)}
            <button onClick={sendmessage} disabled={isSending}><FaPaperPlane className={`text-xl ${isSending ? "text-gray-400" : "text-black-500"}`} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatArea;
