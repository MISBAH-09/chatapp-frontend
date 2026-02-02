import React, { useState } from "react";

/* Simple rule-based chatbot */
function chatbotReply(message) {
  const msg = message.toLowerCase();

  if (msg.includes("hi") || msg.includes("hello")) {
    return "Hey 👋 How can I help?";
  }
  if (msg.includes("chat")) {
    return "This floating AI chat is still in demo mode 🤖";
  }

  return 0;
}

function FloatingAi() {
  const [open, setOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi 👋 I’m your AI assistant." }
  ]);

  const sendMessage = () => {
    if (!messageText.trim()) return;

    const userMessage = { sender: "user", text: messageText };
    const aiMessage = {
      sender: "ai",
      text: chatbotReply(messageText)
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setMessageText("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
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
              <h2 className="text-xl text-cyan-700 font-mono font-semibold">
                AI Assistant
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-gray-100 p-4 space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl max-w-[75%] text-sm ${
                      msg.sender === "user"
                        ? "bg-blue-100"
                        : "bg-gray-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
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
              />
              <button
                className="bg-cyan-700 text-white px-4 rounded-lg"
                onClick={sendMessage}
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