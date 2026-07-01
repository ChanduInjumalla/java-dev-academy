import { MessageSquare, Star, Trash2, Search } from 'lucide-react';
import { useChat, type ConversationSummary } from '../../store/useChat';
import { useState } from 'react';

export default function ConversationHistory() {
  const { conversations, loadConversation, deleteConversation, toggleFavorite } = useChat();
  const [search, setSearch] = useState('');

  const filtered = conversations.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  const favorites = filtered.filter(c => c.isFavorite);
  const regular = filtered.filter(c => !c.isFavorite);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString();
  };

  const renderConvo = (c: ConversationSummary) => (
    <div
      key={c.id}
      className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary cursor-pointer transition-all"
      onClick={() => loadConversation(c.id)}
    >
      <MessageSquare size={16} className="text-gray-500 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{c.title}</p>
        <p className="text-xs text-gray-500">{formatDate(c.updatedAt)} · {c._count.messages} msgs</p>
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); toggleFavorite(c.id); }}
          className="p-1 rounded hover:bg-background transition-colors"
        >
          <Star size={14} className={c.isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); deleteConversation(c.id); }}
          className="p-1 rounded hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2">
          <Search size={14} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-foreground placeholder:text-gray-500 outline-none flex-1"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
        {conversations.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare size={32} className="text-gray-600 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No conversations yet</p>
          </div>
        ) : (
          <>
            {favorites.length > 0 && (
              <>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 py-1">⭐ Favorites</p>
                {favorites.map(renderConvo)}
              </>
            )}
            {regular.length > 0 && (
              <>
                {favorites.length > 0 && <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 py-1 mt-2">Recent</p>}
                {regular.map(renderConvo)}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
