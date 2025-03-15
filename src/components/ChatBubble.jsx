"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Smile, Paperclip, User } from "lucide-react"
import "../styles/ChatBubble.css"
import Avatar from "./Avatar"

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! Welcome to ShopHub. How can I help you today?",
      sender: "agent",
      time: new Date(Date.now() - 1000 * 60).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      agentName: "Sarah",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [messages, isOpen])

  const sendMessage = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, userMessage])
    setInputValue("")

    // Show typing indicator
    setIsTyping(true)

    // Simulate agent response after a delay
    setTimeout(() => {
      const agentResponse = getAgentResponse(inputValue)
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: agentResponse,
          sender: "agent",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          agentName: "Sarah",
        },
      ])
      setIsTyping(false)
    }, 1500)
  }

  // Simple response logic based on keywords
  const getAgentResponse = (message) => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("shipping") || lowerMessage.includes("delivery")) {
      return "We offer free shipping on orders over $50. Standard delivery takes 3-5 business days."
    } else if (lowerMessage.includes("return") || lowerMessage.includes("refund")) {
      return "Our return policy allows returns within 30 days of purchase. Please visit our Returns page for more details."
    } else if (lowerMessage.includes("discount") || lowerMessage.includes("coupon") || lowerMessage.includes("promo")) {
      return "You can use code WELCOME10 for 10% off your first order! Also check our Deals page for current promotions."
    } else if (lowerMessage.includes("payment") || lowerMessage.includes("pay")) {
      return "We accept all major credit cards, PayPal, and Apple Pay. All transactions are secure and encrypted."
    } else if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hi there! How can I assist you with your shopping today?"
    } else if (lowerMessage.includes("thank")) {
      return "You're welcome! Is there anything else I can help you with?"
    } else if (lowerMessage.includes("bye") || lowerMessage.includes("goodbye")) {
      return "Thank you for chatting with us! Feel free to reach out if you have any other questions. Have a great day!"
    } else {
      return "Thank you for your message. How else can I assist you with your shopping experience today?"
    }
  }

  return (
    <div className="chat-bubble-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-agent-avatar">
                <Avatar seed="Sarah" type="customer" />
              </div>
              <div className="chat-agent-info">
                <h3>Customer Support</h3>
                <p>Sarah • Online</p>
              </div>
            </div>
            <button className="chat-close-btn" onClick={toggleChat} aria-label="Close chat">
              <X size={18} />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message ${message.sender === "user" ? "user-message" : "agent-message"}`}
              >
                {message.sender === "agent" && (
                  <div className="message-avatar">
                    <Avatar seed={message.agentName} type="customer" />
                  </div>
                )}
                <div className="message-content">
                  <div className="message-bubble">
                    <p>{message.text}</p>
                  </div>
                  <div className="message-meta">
                    {message.sender === "agent" && <span className="message-name">{message.agentName}</span>}
                    <span className="message-time">{message.time}</span>
                  </div>
                </div>
                {message.sender === "user" && (
                  <div className="message-avatar user-avatar">
                    <User size={18} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="chat-message agent-message">
                <div className="message-avatar">
                  <Avatar seed="Sarah" type="customer" />
                </div>
                <div className="message-content">
                  <div className="message-bubble typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input" onSubmit={sendMessage}>
            <button type="button" className="chat-attach-btn" aria-label="Attach file">
              <Paperclip size={18} />
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              onChange={handleInputChange}
              ref={inputRef}
            />
            <button type="button" className="chat-emoji-btn" aria-label="Add emoji">
              <Smile size={18} />
            </button>
            <button type="submit" className="chat-send-btn" aria-label="Send message">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <button
        className={`chat-bubble-button ${isOpen ? "active" : ""}`}
        onClick={toggleChat}
        aria-label="Chat with customer support"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  )
}

export default ChatBubble

