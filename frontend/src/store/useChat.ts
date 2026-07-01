import { create } from 'zustand';

export type ChatMode = 'learn' | 'code-review' | 'debug' | 'quiz' | 'revision' | 'interview' | 'notes-assistant';

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface ConversationSummary {
  id: string;
  title: string;
  mode: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  _count: { messages: number };
}

interface ChatStore {
  isOpen: boolean;
  isMinimized: boolean;
  messages: Message[];
  conversationId: string | null;
  conversations: ConversationSummary[];
  mode: ChatMode;
  isStreaming: boolean;
  showHistory: boolean;

  toggleOpen: () => void;
  minimize: () => void;
  restore: () => void;
  sendMessage: (text: string) => Promise<void>;
  clearChat: () => void;
  loadConversation: (id: string) => Promise<void>;
  deleteConversation: (id: string) => Promise<void>;
  renameConversation: (id: string, title: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  setMode: (mode: ChatMode) => void;
  fetchConversations: () => Promise<void>;
  setShowHistory: (show: boolean) => void;
}

const getToken = () => localStorage.getItem('token');

export const useChat = create<ChatStore>((set, get) => ({
  isOpen: false,
  isMinimized: false,
  messages: [],
  conversationId: null,
  conversations: [],
  mode: 'learn',
  isStreaming: false,
  showHistory: false,

  toggleOpen: () => {
    const { isOpen, isMinimized } = get();
    if (isMinimized) {
      set({ isMinimized: false, isOpen: true });
    } else {
      set({ isOpen: !isOpen });
    }
  },

  minimize: () => set({ isMinimized: true, isOpen: false }),
  restore: () => set({ isMinimized: false, isOpen: true }),

  setMode: (mode) => set({ mode }),
  setShowHistory: (show) => set({ showHistory: show }),

  clearChat: () => set({ messages: [], conversationId: null }),

  sendMessage: async (text: string) => {
    const token = getToken();
    if (!token) return;

    const { mode, conversationId, messages } = get();

    // Add user message immediately
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    // Add placeholder AI message for streaming
    const aiMsg: Message = {
      id: `ai-${Date.now()}`,
      role: 'model',
      content: '',
      timestamp: new Date(),
    };

    set({ messages: [...messages, userMsg, aiMsg], isStreaming: true });

    try {
      // Get page context from the other store
      const { usePageContext } = await import('./usePageContext');
      const pageContext = usePageContext.getState();

      const response = await fetch((import.meta.env.VITE_API_URL || '') + '/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: text,
          conversationId,
          mode,
          pageContext: {
            phase: pageContext.phase,
            day: pageContext.day,
            topic: pageContext.topic,
            lesson: pageContext.lesson,
            code: pageContext.code,
            question: pageContext.question,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Chat request failed');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error('No response body');

      let newConversationId = conversationId;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split('\n').filter(l => l.startsWith('data: '));

        for (const line of lines) {
          try {
            const data = JSON.parse(line.slice(6));

            if (data.done && data.conversationId) {
              newConversationId = data.conversationId;
            } else if (data.text) {
              // Append chunk to the last AI message
              set((state) => {
                const msgs = [...state.messages];
                const lastMsg = msgs[msgs.length - 1];
                if (lastMsg && lastMsg.role === 'model') {
                  msgs[msgs.length - 1] = { ...lastMsg, content: lastMsg.content + data.text };
                }
                return { messages: msgs };
              });
            } else if (data.error) {
              set((state) => {
                const msgs = [...state.messages];
                const lastMsg = msgs[msgs.length - 1];
                if (lastMsg && lastMsg.role === 'model') {
                  msgs[msgs.length - 1] = { ...lastMsg, content: 'Sorry, something went wrong. Please try again.' };
                }
                return { messages: msgs };
              });
            }
          } catch (e) {
            // Skip malformed lines
          }
        }
      }

      set({ conversationId: newConversationId, isStreaming: false });

      // Refresh conversations list
      get().fetchConversations();

    } catch (error) {
      console.error('Chat error:', error);
      set((state) => {
        const msgs = [...state.messages];
        const lastMsg = msgs[msgs.length - 1];
        if (lastMsg && lastMsg.role === 'model' && lastMsg.content === '') {
          msgs[msgs.length - 1] = { ...lastMsg, content: 'Failed to connect to AI. Please check your connection and try again.' };
        }
        return { messages: msgs, isStreaming: false };
      });
    }
  },

  fetchConversations: async () => {
    const token = getToken();
    if (!token) return;
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || '') + '/api/chat/conversations', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        set({ conversations: data });
      }
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    }
  },

  loadConversation: async (id: string) => {
    const token = getToken();
    if (!token) return;
    try {
      const res = await fetch(`/api/chat/conversations/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        set({
          conversationId: data.id,
          mode: data.mode as ChatMode,
          messages: data.messages.map((m: any) => ({
            id: m.id,
            role: m.role,
            content: m.content,
            timestamp: new Date(m.createdAt),
          })),
          showHistory: false,
        });
      }
    } catch (error) {
      console.error('Failed to load conversation:', error);
    }
  },

  deleteConversation: async (id: string) => {
    const token = getToken();
    if (!token) return;
    try {
      await fetch(`/api/chat/conversations/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      set((state) => ({
        conversations: state.conversations.filter(c => c.id !== id),
        ...(state.conversationId === id ? { conversationId: null, messages: [] } : {}),
      }));
    } catch (error) {
      console.error('Failed to delete conversation:', error);
    }
  },

  renameConversation: async (id: string, title: string) => {
    const token = getToken();
    if (!token) return;
    try {
      await fetch(`/api/chat/conversations/${id}/rename`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ title }),
      });
      set((state) => ({
        conversations: state.conversations.map(c => c.id === id ? { ...c, title } : c),
      }));
    } catch (error) {
      console.error('Failed to rename conversation:', error);
    }
  },

  toggleFavorite: async (id: string) => {
    const token = getToken();
    if (!token) return;
    try {
      const res = await fetch(`/api/chat/conversations/${id}/favorite`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const { isFavorite } = await res.json();
        set((state) => ({
          conversations: state.conversations.map(c => c.id === id ? { ...c, isFavorite } : c),
        }));
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  },
}));
