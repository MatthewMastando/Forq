import React, { useEffect, useState, useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { useRecipes } from '../context/RecipeContext';
import { SendIcon, SmileIcon, ImageIcon, AtSignIcon } from 'lucide-react';
interface CommentSectionProps {
  recipeId: string;
  comments: any[];
  users: any[];
}
export const CommentSection: React.FC<CommentSectionProps> = ({
  recipeId,
  comments,
  users
}) => {
  const {
    currentUser,
    isAuthenticated
  } = useAuth();
  const {
    addComment
  } = useRecipes();
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  // Simple emoji picker
  const emojis = ['😋', '👨‍🍳', '🍕', '🍔', '🍗', '🍖', '🥗', '🍝', '🍜', '🍲', '🍰', '🧁', '🍩', '❤️', '👍', '🔥'];
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim() && currentUser) {
      setIsSubmitting(true);
      // Simulate network delay for animation
      setTimeout(() => {
        addComment({
          recipeId,
          authorId: currentUser.id,
          content: commentText,
          createdAt: new Date().toISOString() // Add this line to properly initialize the timestamp
        });
        setCommentText('');
        setIsSubmitting(false);
      }, 800);
    }
  };
  const addEmoji = (emoji: string) => {
    setCommentText(prev => prev + emoji);
    setShowEmoji(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
        setShowEmoji(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const getUserById = (id: string) => {
    return users.find(user => user.id === id);
  };
  return <div className="mt-8 animate-fade-in" style={{
    animationDelay: '0.4s'
  }}>
      <h2 className="text-xl font-semibold text-[#0F172A] mb-4">Comments</h2>
      {isAuthenticated && currentUser && <form onSubmit={handleSubmitComment} className="mb-6 glass-card p-4">
          <div className="relative">
            <textarea ref={textareaRef} id="comment" rows={3} className="form-input shadow-sm block w-full focus:ring-[#6366F1] focus:border-[#6366F1] sm:text-sm border border-[#E2E8F0] rounded-md" placeholder="Add a comment..." value={commentText} onChange={e => setCommentText(e.target.value)}></textarea>
            <div className="absolute bottom-2 left-2 flex space-x-2">
              <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="text-gray-400 hover:text-[#6366F1] transition-colors">
                <SmileIcon className="h-5 w-5" />
              </button>
              <button type="button" className="text-gray-400 hover:text-[#6366F1] transition-colors">
                <ImageIcon className="h-5 w-5" />
              </button>
              <button type="button" className="text-gray-400 hover:text-[#6366F1] transition-colors">
                <AtSignIcon className="h-5 w-5" />
              </button>
            </div>
            {/* Emoji picker */}
            {showEmoji && <div ref={emojiRef} className="absolute bottom-12 left-0 bg-white rounded-lg shadow-lg p-2 z-10 animate-scale-up">
                <div className="grid grid-cols-8 gap-1">
                  {emojis.map((emoji, index) => <button key={index} type="button" onClick={() => addEmoji(emoji)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
                      {emoji}
                    </button>)}
                </div>
              </div>}
          </div>
          <div className="mt-2 flex justify-end">
            <button type="submit" disabled={isSubmitting || !commentText.trim()} className={`inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white transition-all duration-300 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : commentText.trim() ? 'btn-primary bg-[#6366F1]/80 hover:bg-[#6366F1]' : 'bg-gray-400 cursor-not-allowed'}`}>
              {isSubmitting ? <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div> : <SendIcon className="h-4 w-4 mr-2" />}
              Post Comment
            </button>
          </div>
        </form>}
      <div className="space-y-6 stagger-children">
        {comments.length > 0 ? comments.map(comment => {
        const author = getUserById(comment.authorId);
        return <div key={comment.id} className="glass-card p-4 hover:shadow-md transition-all duration-300">
                <div className="flex items-start">
                  <img className="h-10 w-10 rounded-full ring-1 ring-[#6366F1]/30 mr-3" src={author?.avatar} alt={author?.name} />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="text-sm font-medium text-[#0F172A]">
                        {author?.name}
                      </h3>
                      <span className="ml-2 text-xs text-[#64748B]">
                        {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true
                  })}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[#334155]">
                      {comment.content}
                    </p>
                    <div className="mt-2 flex space-x-4">
                      <button className="text-xs text-[#64748B] hover:text-[#6366F1] transition-colors">
                        Like
                      </button>
                      <button className="text-xs text-[#64748B] hover:text-[#6366F1] transition-colors">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>;
      }) : <p className="text-[#64748B] text-center py-4 glass-card">
            No comments yet. Be the first to share your thoughts!
          </p>}
      </div>
    </div>;
};