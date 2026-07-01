import { useState, useEffect } from 'react';
import { MessageSquare, Send, User } from 'lucide-react';
import toast from 'react-hot-toast';

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    username: string;
  };
}

export default function DiscussionForum({ dayNumber }: { dayNumber: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments/day/${dayNumber}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data.comments);
      }
    } catch (error) {
      console.error('Failed to fetch comments', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [dayNumber]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ day: dayNumber, content: newComment })
      });

      if (res.ok) {
        setNewComment('');
        toast.success('Comment posted!');
        fetchComments(); // refresh
      } else {
        toast.error('Failed to post comment.');
      }
    } catch (error) {
      toast.error('An error occurred.');
    }
  };

  return (
    <div className="mt-12 bg-card border border-border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
        <MessageSquare className="text-primary" size={24} />
        <h3 className="text-xl font-bold text-foreground">Discussion Forum</h3>
      </div>

      {/* Post a comment */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col gap-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Ask a question or share your thoughts about this day..."
            className="w-full bg-background border border-border rounded-xl p-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px] resize-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
              Post
            </button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {loading ? (
          <p className="text-gray-500 text-center">Loading discussions...</p>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
            <p>No comments yet. Be the first to start the discussion!</p>
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="flex gap-4 p-4 rounded-xl hover:bg-background/50 transition-colors border border-transparent hover:border-border">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <User size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-foreground">{comment.user.name}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()} {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed text-sm">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
