import React, { useEffect, useState, useRef } from "react";
import { getAIConversation, sendMessage as sendAIMessage } from "../services/aiMessagesService";
import { marked } from "marked";
import { FaRobot, FaTimes, FaCircle } from "react-icons/fa";

function FloatingAi() {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
        scrollToBottom();
      }
    } catch (err) {
      console.error("Error fetching conversation:", err);
    }
  };

  useEffect(() => scrollToBottom(), [messages]);

  const addAiMessageTyping = async (fullText, tempId) => {
    let displayed = "";
    for (let char of fullText) {
      displayed += char;
      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? { ...m, text: displayed } : m))
      );
      await new Promise((r) => setTimeout(r, 20));
    }
  };

  const sendMessage = async () => {
    if (!messageText.trim() || isSending) return;

    const userMessage = { sender: "user", text: messageText, id: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setIsSending(true);

    const tempAiId = `ai-${Date.now()}`;
    setMessages((prev) => [...prev, { sender: "ai", text: "AI is typing...", id: tempAiId }]);

    const payload = {
      conversation_id: conversationId,
      message: messageText,
      is_sender: true,
    };

    try {
      const response = await sendAIMessage(payload);
      if (response.success) {
        const aiReply = response.messages.find((m) => m.sender === "ai");
        if (aiReply) await addAiMessageTyping(aiReply.text, tempAiId);
        else setMessages((prev) =>
          prev.map((m) => (m.id === tempAiId ? { ...m, text: "AI didn't return a response." } : m))
        );
      } else {
        setMessages((prev) =>
          prev.map((m) => (m.id === tempAiId ? { ...m, text: "Error sending message to AI." } : m))
        );
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) =>
        prev.map((m) => (m.id === tempAiId ? { ...m, text: "AI request failed." } : m))
      );
    }

    setMessageText("");
    setIsSending(false);
  };

  const handleOpen = () => {
    setShowModal(true);
    setTimeout(() => setOpen(true), 50);
    fetchConversation();
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setShowModal(false), 300);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleOpen}
        className="fixed bottom-20 right-6 z-50 bg-gradient-to-r from-yellow-400/90 to-yellow-600/90 w-16 h-16 flex items-center justify-center border-2 border-blue-900 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <FaRobot className="text-3xl text-white pb-1" />
      </button>

      {/* Chat Modal */}
      {showModal && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex flex-col bg-white w-[500px] h-[700px] shadow-xl border border-gray-300 rounded-xl overflow-hidden
            transform transition-all duration-300 ease-out
            ${open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-cyan-100">
            <h2 className="flex items-center gap-3 text-xl text-cyan-700 font-semibold">
              <FaRobot className="text-cyan-700 text-2xl" /> AI Assistant
            </h2>
            <button onClick={handleClose} className="text-xl hover:text-red-700 transition-colors">
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.length === 0 && <p className="text-gray-700">Loading...</p>}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {/* {msg.sender === "ai" && <FaCircle className="text-green-500 text-[10px] mt-2" />} */}
                <div
                  className={`p-3 rounded-2xl max-w-[75%] text-sm shadow-md ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-cyan-400/30 to-cyan-700/30 text-black"
                      : "bg-gradient-to-r from-yellow-200/40 to-yellow-400/50 text-black"
                  }`}
                  dangerouslySetInnerHTML={{ __html: marked(msg.text) }}
                />
                {/* {msg.sender === "user" && <FaCircle className="text-blue-500 text-[10px] mt-2" />} */}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2 p-3 border-t border-gray-300 bg-white">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={isSending}
            />
            <button
              onClick={sendMessage}
              disabled={isSending}
              className="bg-cyan-700 hover:bg-cyan-800 text-white px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default FloatingAi;