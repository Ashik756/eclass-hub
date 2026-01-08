import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export function useLiveComments(classId) {
  const { profile } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    if (!classId) return;

    try {
      const { data, error } = await supabase
        .from("live_comments")
        .select(`
          *,
          user:profiles!live_comments_user_id_fkey(id, name, role)
        `)
        .eq("class_id", classId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  }, [classId]);

  useEffect(() => {
    fetchComments();

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`comments-${classId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "live_comments",
          filter: `class_id=eq.${classId}`,
        },
        async (payload) => {
          if (payload.eventType === "INSERT") {
            // Fetch the complete comment with user data
            const { data } = await supabase
              .from("live_comments")
              .select(`
                *,
                user:profiles!live_comments_user_id_fkey(id, name, role)
              `)
              .eq("id", payload.new.id)
              .single();

            if (data) {
              setComments((prev) => [...prev, data]);
            }
          } else if (payload.eventType === "DELETE") {
            setComments((prev) =>
              prev.filter((comment) => comment.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [classId, fetchComments]);

  const sendComment = async (message) => {
    if (!profile || !message.trim()) return { success: false };

    try {
      const { error } = await supabase.from("live_comments").insert({
        class_id: classId,
        user_id: profile.id,
        message: message.trim(),
      });

      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.error("Error sending comment:", err);
      return { success: false, error: err.message };
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const { error } = await supabase
        .from("live_comments")
        .delete()
        .eq("id", commentId);

      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.error("Error deleting comment:", err);
      return { success: false, error: err.message };
    }
  };

  return {
    comments,
    loading,
    sendComment,
    deleteComment,
  };
}
