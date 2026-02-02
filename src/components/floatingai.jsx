import React, { useEffect, useState, useRef } from "react";
import { getCurrentUser } from "../services/userService";
import { getAIConversation, sendMessage as sendAIMessage } from "../services/aiMessagesService";

function FloatingAi() {
  const [open, setOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch conversation when chat opens
  const fetchConversation = async () => {
    try {
      const response = await getAIConversation();
      if (response.success) {
        setConversationId(response.conversation_id);
        setMessages(
          response.messages.map((m) => ({
            sender: m.sender,
            text: m.text,
            id: m.id,
          }))
        );
      }
    } catch (err) {
      console.error("Error fetching conversation:", err);
    }
  };

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message to backend
  const sendMessage = async () => {
    if (!messageText.trim() || isSending) return;

    const userMessage = { sender: "user", text: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setIsSending(true);

    const payload = {
      conversation_id: conversationId,
      message: messageText,
      is_sender: true,
    };

    try {
      const response = await sendAIMessage(payload);
      if (response.success) {
        // Update messages with all backend messages including AI reply
        setMessages(
          response.messages.map((m) => ({
            sender: m.sender,
            text: m.text,
            id: m.id,
          }))
        );
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }

    setMessageText("");
    setIsSending(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => {
          setOpen(true);
          fetchConversation();
        }}
        className="fixed bottom-6 right-6 z-50 bg-cyan-700 text-white px-4 py-3 border-2 border-black rounded-full shadow-lg hover:scale-105 transition"
      >
        🤖 AI
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
          <div className="bg-white w-[400px] h-full flex flex-col shadow-xl">

            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b-2 border-black">
              <h2 className="text-xl text-cyan-700 font-mono font-semibold">AI Assistant</h2>
              <button onClick={() => setOpen(false)} className="text-gray-600 text-2xl">×</button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-gray-100 p-4 space-y-3">
              {messages.length === 0 && <p className="text-gray-700">Loading...</p>}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`p-3 rounded-xl max-w-[75%] text-sm ${
                      msg.sender === "user" ? "bg-blue-100" : "bg-gray-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t flex gap-2">
              <input
                type="text"
                placeholder="Chat with AI..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                disabled={isSending}
              />
              <button
                className="bg-cyan-700 text-white px-4 rounded-lg disabled:opacity-50"
                onClick={sendMessage}
                disabled={isSending}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FloatingAi;