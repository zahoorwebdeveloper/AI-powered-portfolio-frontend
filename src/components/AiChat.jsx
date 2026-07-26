import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TiMessage } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import api from "../lib/axios";

function AiChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Send message
  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Show user's message immediately
    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);
    setIsTyping(true);

    try {
      const response = await api.post("/ai", {
        input,
      });

      const data = response.data;
      setIsTyping(false);
      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: data.ai,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: "Sorry, something went wrong. Please try again.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setIsTyping(false);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -8, 0],
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 2,
          },
        }}
        whileHover={{ scale: 1.05 }}
        className="fixed bottom-6 right-5 z-50"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FD6F00] shadow-2xl">
          {open ? (
            <IoClose className="text-white text-3xl" />
          ) : (
            <TiMessage className="text-white text-3xl" />
          )}
        </div>
      </motion.button>

      {/* Chatbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 50,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              y: 50,
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 22,
            }}
            style={{
              height: "min(720px, calc(100vh - 120px))",
            }}
            className="
              fixed
              bottom-24
              right-5
              z-70
              w-[95vw]
              max-w-[420px]
              bg-white
              rounded-3xl
              shadow-2xl
              border
              overflow-hidden
            "
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="h-16 shrink-0 bg-[#FD6F00] px-5 flex items-center justify-between text-white">
                <div>
                  <h2 className="font-semibold">AI Assistant</h2>
                  <p className="text-xs opacity-80">
                    Usually replies instantly
                  </p>
                </div>

                <button onClick={() => setOpen(false)}>
                  <IoClose size={24} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto bg-[#f8fafc] px-4 py-5 space-y-5">
                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {msg.sender === "ai" ? (
                        <div className="flex items-end gap-3">
                          {/* Avatar */}
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FD6F00] text-white font-semibold">
                            AI
                          </div>

                          {/* AI Message */}
                          <div className="max-w-[82%]">
                            <div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm border border-gray-100">
                              <p className="text-sm leading-6 text-gray-700 whitespace-pre-wrap">
                                {msg.text}
                              </p>
                            </div>

                            <p className="ml-2 mt-1 text-xs text-gray-400">
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-end">
                          <div className="max-w-[82%]">
                            <div className="rounded-2xl rounded-br-md bg-[#FD6F00] px-4 py-3 shadow text-white">
                              <p className="text-sm leading-6 whitespace-pre-wrap">
                                {msg.text}
                              </p>
                            </div>

                            <p className="mr-2 mt-1 text-right text-xs text-gray-400">
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {/* AI Typing */}
                  {isTyping && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-end gap-3"
                    >
                      {/* Avatar */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FD6F00] text-white font-semibold">
                        AI
                      </div>

                      {/* Typing Bubble */}
                      <div className="max-w-[220px] rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm border border-gray-100">
                        <p className="mb-2 text-xs font-medium text-gray-500">
                          AI is typing...
                        </p>

                        <div className="flex items-center gap-1">
                          <span
                            className="h-2 w-2 rounded-full bg-[#FD6F00] animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />

                          <span
                            className="h-2 w-2 rounded-full bg-[#FD6F00] animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />

                          <span
                            className="h-2 w-2 rounded-full bg-[#FD6F00] animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t bg-white p-4">
                <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    type="text"
                    placeholder="Ask me anything..."
                    className="flex-1 bg-transparent text-sm outline-none"
                  />

                  <button
                    onClick={handleSend}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FD6F00] text-white transition hover:scale-105"
                  >
                    <IoSend />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AiChat;
