import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useClasses(batchId) {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClasses = useCallback(async () => {
    if (!batchId) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("classes")
        .select("*")
        .eq("batch_id", batchId)
        .order("order_index", { ascending: true });

      if (error) throw error;
      setClasses(data || []);
    } catch (err) {
      console.error("Error fetching classes:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [batchId]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const createClass = async (classData) => {
    try {
      const { data, error } = await supabase
        .from("classes")
        .insert({
          ...classData,
          batch_id: batchId,
        })
        .select()
        .single();

      if (error) throw error;
      
      await fetchClasses();
      return { success: true, class: data };
    } catch (err) {
      console.error("Error creating class:", err);
      return { success: false, error: err.message };
    }
  };

  const updateClass = async (classId, updates) => {
    try {
      const { error } = await supabase
        .from("classes")
        .update(updates)
        .eq("id", classId);

      if (error) throw error;
      
      await fetchClasses();
      return { success: true };
    } catch (err) {
      console.error("Error updating class:", err);
      return { success: false, error: err.message };
    }
  };

  const deleteClass = async (classId) => {
    try {
      const { error } = await supabase
        .from("classes")
        .delete()
        .eq("id", classId);

      if (error) throw error;
      
      await fetchClasses();
      return { success: true };
    } catch (err) {
      console.error("Error deleting class:", err);
      return { success: false, error: err.message };
    }
  };

  const getClass = async (classId) => {
    try {
      const { data, error } = await supabase
        .from("classes")
        .select(`
          *,
          notes(*),
          batch:batches(
            id,
            name,
            teacher_id,
            teacher:profiles!batches_teacher_id_fkey(id, name)
          )
        `)
        .eq("id", classId)
        .single();

      if (error) throw error;
      return { success: true, class: data };
    } catch (err) {
      console.error("Error fetching class:", err);
      return { success: false, error: err.message };
    }
  };

  return {
    classes,
    loading,
    error,
    createClass,
    updateClass,
    deleteClass,
    getClass,
    refetch: fetchClasses,
  };
}
