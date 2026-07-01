import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, History, Plus, Bot } from 'lucide-react';
import { useChat } from '../../store/useChat';
import { useAuth } from '../../context/AuthContext';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ModeSelector from './ModeSelector';
import SuggestedActions from './SuggestedActions';
import ConversationHistory from './ConversationHistory';

export default function ChatPopup() {
  const { user } = useAuth();
  const {
    messages, isStreaming, mode, showHistory,
    minimize, toggleOpen, sendMessage, clearChat,
    setMode, setShowHistory, fetchConversations
  } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch conversations when history panel opens
  useEffect(() => {
    if (showHistory) fetchConversations();
  }, [showHistory]);

  const handleSend = (text: string) => {
    sendMessage(text);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="fixed bottom-24 right-6 z-[60]
        w-[420px] h-[600px] max-h-[80vh]
        max-[768px]:bottom-0 max-[768px]:right-0 max-[768px]:left-0 max-[768px]:w-full max-[768px]:h-[85vh] max-[768px]:rounded-none max-[768px]:rounded-t-3xl
        bg-card border border-border rounded-3xl shadow-2xl
        flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <Bot size={20} className="text-purple-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Java Mentor</h3>
            <p className="text-[11px] text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
              Online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={clearChat} className="p-2 rounded-lg hover:bg-secondary text-gray-500 hover:text-foreground transition-colors" title="New Chat">
            <Plus size={16} />
          </button>
          <button onClick={() => setShowHistory(!showHistory)} className="p-2 rounded-lg hover:bg-secondary text-gray-500 hover:text-foreground transition-colors" title="Chat History">
            <History size={16} />
          </button>
          <button onClick={minimize} className="p-2 rounded-lg hover:bg-secondary text-gray-500 hover:text-foreground transition-colors" title="Minimize">
            <Minus size={16} />
          </button>
          <button onClick={toggleOpen} className="p-2 rounded-lg hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-colors" title="Close">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="border-b border-border">
        <ModeSelector current={mode} onChange={setMode} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* History Panel */}
        {showHistory && (
          <div className="w-full border-r border-border bg-card">
            <ConversationHistory />
          </div>
        )}

        {/* Chat Area */}
        {!showHistory && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4">
                    <Bot size={32} className="text-purple-400" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Hello, {user?.name || 'Developer'}! 👋</h3>
                  <p className="text-sm text-gray-500 text-center mb-6 max-w-xs">
                    I'm your Java Mentor. Ask me anything about your current lesson, coding problems, or interview prep!
                  </p>
                  <SuggestedActions onSelect={handleSend} />
                </div>
              ) : (
                <>
                  {messages.map((msg, i) => (
                    <ChatMessage
                      key={msg.id}
                      message={msg}
                      isStreaming={isStreaming && i === messages.length - 1 && msg.role === 'model'}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Suggested actions after AI response */}
            {messages.length > 0 && !isStreaming && messages[messages.length - 1]?.role === 'model' && (
              <div className="border-t border-border">
                <div className="flex gap-2 p-2 overflow-x-auto custom-scrollbar">
                  {['Explain more', 'Give an example', 'Quiz me'].map(s => (
                    <button
                      key={s}
                      onClick={() => handleSend(s)}
                      className="px-3 py-1.5 rounded-full bg-secondary/50 text-xs text-gray-400 hover:text-foreground hover:bg-secondary transition-all whitespace-nowrap border border-border/50"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <ChatInput onSend={handleSend} disabled={isStreaming} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
