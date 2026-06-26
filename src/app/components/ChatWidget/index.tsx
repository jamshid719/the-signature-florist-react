import React, { useState, useRef, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import ChatIcon from "@mui/icons-material/Chat";
import GeminiService from "../../services/GeminiService";

interface Message {
  role: "ai" | "user";
  text: string;
}

const INITIAL_MESSAGE: Message = {
  role: "ai",
  text: "Hi! I'm the Florist Assistant 🌸 Ask me anything about our flowers, prices, collections, or how to place an order!",
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const geminiRef = useRef<GeminiService | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // GeminiService instance — faqat bir marta yaratiladi
  if (!geminiRef.current) {
    geminiRef.current = new GeminiService();
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setIsLoading(true);

    try {
      const aiText = await geminiRef.current!.sendMessage(text);
      setMessages((prev) => [...prev, { role: "ai", text: aiText }]);
    } catch (err) {
      console.error("ChatWidget Gemini error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Sorry, I couldn't connect right now. Please try again in a moment." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chat-widget-container">
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-avatar">🌷</div>
            <div className="chat-header-info">
              <span className="chat-header-name">Florist Assistant</span>
              <div className="chat-header-status">
                <span className="chat-online-dot" />
                <span>Online · Replies instantly</span>
              </div>
            </div>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)}>
              <CloseIcon fontSize="small" />
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg chat-msg-${msg.role}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="chat-typing">
                <span />
                <span />
                <span />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input-row">
            <input
              className="chat-input"
              placeholder="Ask about our flowers..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              maxLength={500}
            />
            <button
              className="chat-send-btn"
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
            >
              <SendIcon style={{ fontSize: 16 }} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button className="chat-toggle-btn" onClick={() => setIsOpen((prev) => !prev)}>
        <ChatIcon style={{ fontSize: 18 }} />
        ASK AI
      </button>
    </div>
  );
}
