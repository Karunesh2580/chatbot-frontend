import React, { useState } from "react";

function Chat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("https://chatbot-backend-1-n1nf.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error("Backend error");
      }

      const data = await res.json();
      setMessages([...messages, { user: prompt, bot: data.response }]);
    } catch (error) {
      setMessages([...messages, { user: prompt, bot: "⚠️ Error connecting to backend" }]);
    }

    setPrompt("");
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Segoe UI, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>🤖 My Unique Chatbot</h2>

      <div style={{ background: "white", borderRadius: "10px", padding: "15px", height: "350px", overflowY: "auto", marginBottom: "15px" }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: "12px" }}>
            <div style={{ background: "#DCF8C6", padding: "10px", borderRadius: "15px", maxWidth: "80%", marginBottom: "5px" }}>
              <b>You:</b> {msg.user}
            </div>
            <div style={{ background: "#F1F0F0", padding: "10px", borderRadius: "15px", maxWidth: "80%" }}>
              <b>Bot:</b> {msg.bot}
            </div>
          </div>
        ))}
        {loading && <p style={{ fontStyle: "italic", color: "gray" }}>Bot is thinking...</p>}
      </div>

      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "1px solid #ccc" }}
        />
        <button onClick={sendMessage} style={{ marginLeft: "10px", padding: "10px 20px", background: "#667eea", color: "white", border: "none", borderRadius: "10px" }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
