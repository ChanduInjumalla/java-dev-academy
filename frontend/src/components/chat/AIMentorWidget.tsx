import { Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../../store/useChat';
import ChatPopup from './ChatPopup';

export default function AIMentorWidget() {
  const { isOpen, isMinimized, toggleOpen } = useChat();

  return (
    <>
      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && !isMinimized && <ChatPopup />}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={toggleOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen
            ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30'
            : 'bg-gradient-to-br from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-purple-500/30'
        }`}
      >
        {isOpen ? (
          <span className="text-white text-xl font-bold">✕</span>
        ) : (
          <>
            <Bot size={24} className="text-white" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-purple-500/30 animate-ping opacity-75" />
          </>
        )}
      </motion.button>

      {/* Minimized indicator */}
      {isMinimized && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed bottom-[84px] right-6 z-[60] bg-card border border-border rounded-xl px-3 py-2 shadow-lg cursor-pointer"
          onClick={toggleOpen}
        >
          <p className="text-xs text-gray-400">
            <Bot size={14} className="inline text-purple-400 mr-1" />
            Chat minimized — click to restore
          </p>
        </motion.div>
      )}
    </>
  );
}
