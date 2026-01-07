import { useState, useEffect, useCallback } from "react";

// Mock Socket implementation for demo purposes
// In production, replace with actual Socket.IO connection

let mockComments = [];
let listeners = [];

const notifyListeners = () => {
  listeners.forEach((listener) => listener([...mockComments]));
};

export function useSocket(classId) {
  const [comments, setComments] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Simulate connection
    const connectTimeout = setTimeout(() => {
      setConnected(true);
    }, 500);

    // Register listener
    const listener = (newComments) => {
      setComments(newComments.filter((c) => c.classId === classId));
    };
    listeners.push(listener);

    // Initial load
    setComments(mockComments.filter((c) => c.classId === classId));

    return () => {
      clearTimeout(connectTimeout);
      listeners = listeners.filter((l) => l !== listener);
    };
  }, [classId]);

  const sendComment = useCallback(
    (comment) => {
      const newComment = {
        id: Date.now().toString(),
        classId,
        ...comment,
        timestamp: new Date().toISOString(),
      };
      mockComments.push(newComment);
      notifyListeners();
    },
    [classId]
  );

  const deleteComment = useCallback((commentId) => {
    mockComments = mockComments.filter((c) => c.id !== commentId);
    notifyListeners();
  }, []);

  return {
    comments,
    connected,
    sendComment,
    deleteComment,
  };
}
