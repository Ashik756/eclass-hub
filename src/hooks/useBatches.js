import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export function useBatches() {
  const { profile } = useAuth();
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBatches = useCallback(async () => {
    if (!profile) return;
    
    setLoading(true);
    try {
      let query = supabase.from("batches").select(`
        *,
        teacher:profiles!batches_teacher_id_fkey(id, name, email),
        enrollments:batch_enrollments(count)
      `);

      if (profile.role === "teacher") {
        query = query.eq("teacher_id", profile.id);
      } else {
        // For students, get batches they're enrolled in
        const { data: enrollments } = await supabase
          .from("batch_enrollments")
          .select("batch_id")
          .eq("student_id", profile.id);

        const batchIds = enrollments?.map((e) => e.batch_id) || [];
        if (batchIds.length === 0) {
          setBatches([]);
          setLoading(false);
          return;
        }
        query = query.in("id", batchIds);
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) throw error;
      setBatches(data || []);
    } catch (err) {
      console.error("Error fetching batches:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

  const createBatch = async (batchData) => {
    try {
      const inviteCode = batchData.name.substring(0, 4).toUpperCase() + 
        Date.now().toString().slice(-6);

      const { data, error } = await supabase
        .from("batches")
        .insert({
          ...batchData,
          teacher_id: profile.id,
          invite_code: inviteCode,
        })
        .select()
        .single();

      if (error) throw error;
      
      await fetchBatches();
      return { success: true, batch: data };
    } catch (err) {
      console.error("Error creating batch:", err);
      return { success: false, error: err.message };
    }
  };

  const joinBatch = async (inviteCode) => {
    try {
      // Find batch by invite code
      const { data: batch, error: batchError } = await supabase
        .from("batches")
        .select("id")
        .eq("invite_code", inviteCode.toUpperCase())
        .maybeSingle();

      if (batchError) throw batchError;
      if (!batch) {
        return { success: false, error: "Invalid invite code" };
      }

      // Check if already enrolled
      const { data: existing } = await supabase
        .from("batch_enrollments")
        .select("id")
        .eq("batch_id", batch.id)
        .eq("student_id", profile.id)
        .maybeSingle();

      if (existing) {
        return { success: false, error: "Already enrolled in this batch" };
      }

      // Enroll student
      const { error: enrollError } = await supabase
        .from("batch_enrollments")
        .insert({
          batch_id: batch.id,
          student_id: profile.id,
        });

      if (enrollError) throw enrollError;

      await fetchBatches();
      return { success: true };
    } catch (err) {
      console.error("Error joining batch:", err);
      return { success: false, error: err.message };
    }
  };

  const getBatch = async (batchId) => {
    try {
      const { data, error } = await supabase
        .from("batches")
        .select(`
          *,
          teacher:profiles!batches_teacher_id_fkey(id, name, email),
          enrollments:batch_enrollments(
            student:profiles!batch_enrollments_student_id_fkey(id, name, email)
          )
        `)
        .eq("id", batchId)
        .single();

      if (error) throw error;
      return { success: true, batch: data };
    } catch (err) {
      console.error("Error fetching batch:", err);
      return { success: false, error: err.message };
    }
  };

  return {
    batches,
    loading,
    error,
    createBatch,
    joinBatch,
    getBatch,
    refetch: fetchBatches,
  };
}
