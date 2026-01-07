import { useState, useEffect, useRef } from "react";
import { useSocket } from "../hooks/useSocket";
import { useAuth } from "../contexts/AuthContext";
import { Send, Trash2, Wifi, WifiOff } from "lucide-react";

export function LiveComments({ classId }) {
  const { user, isTeacher } = useAuth();
  const { comments, connected, sendComment, deleteComment } = useSocket(classId);
  const [message, setMessage] = useState("");
  const commentsEndRef = useRef(null);

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    sendComment({
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      message: message.trim(),
    });
    setMessage("");
  };

  const handleDelete = (commentId) => {
    deleteComment(commentId);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-BD", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-card rounded-xl border border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Live Chat</h3>
        <div className="flex items-center gap-2">
          {connected ? (
            <div className="flex items-center gap-1.5 text-success text-xs">
              <Wifi className="w-3.5 h-3.5" />
              <span>Connected</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-destructive text-xs">
              <WifiOff className="w-3.5 h-3.5" />
              <span>Connecting...</span>
            </div>
          )}
        </div>
      </div>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96 scrollbar-hide">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No comments yet. Start the conversation!
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className={`flex gap-3 ${
                comment.userId === user?.id ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  comment.userRole === "teacher"
                    ? "bg-primary/20 text-primary"
                    : "bg-accent/20 text-accent"
                }`}
              >
                <span className="text-xs font-semibold">
                  {comment.userName?.charAt(0)}
                </span>
              </div>

              <div
                className={`max-w-[75%] ${
                  comment.userId === user?.id ? "text-right" : ""
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-foreground">
                    {comment.userName}
                  </span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded ${
                      comment.userRole === "teacher"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {comment.userRole === "teacher" ? "Teacher" : "Student"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(comment.timestamp)}
                  </span>
                </div>

                <div
                  className={`p-3 rounded-xl text-sm ${
                    comment.userId === user?.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {comment.message}
                </div>

                {isTeacher && comment.userId !== user?.id && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="mt-1 text-xs text-destructive hover:text-destructive/80 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={commentsEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-border flex gap-2"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="input-field flex-1"
        />
        <button
          type="submit"
          disabled={!message.trim() || !connected}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
