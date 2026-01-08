import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export function useTests(batchId) {
  const { profile } = useAuth();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTests = useCallback(async () => {
    if (!batchId) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("tests")
        .select(`
          *,
          questions:test_questions(count)
        `)
        .eq("batch_id", batchId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTests(data || []);
    } catch (err) {
      console.error("Error fetching tests:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [batchId]);

  useEffect(() => {
    fetchTests();
  }, [fetchTests]);

  const createTest = async (testData) => {
    try {
      const { questions, ...testInfo } = testData;

      // Create test
      const { data: test, error: testError } = await supabase
        .from("tests")
        .insert({
          ...testInfo,
          batch_id: batchId,
        })
        .select()
        .single();

      if (testError) throw testError;

      // Create questions
      if (questions && questions.length > 0) {
        const questionsWithTestId = questions.map((q, index) => ({
          ...q,
          test_id: test.id,
          order_index: index,
        }));

        const { error: questionsError } = await supabase
          .from("test_questions")
          .insert(questionsWithTestId);

        if (questionsError) throw questionsError;
      }

      await fetchTests();
      return { success: true, test };
    } catch (err) {
      console.error("Error creating test:", err);
      return { success: false, error: err.message };
    }
  };

  const getTest = async (testId) => {
    try {
      const { data: test, error: testError } = await supabase
        .from("tests")
        .select(`
          *,
          batch:batches(id, name, teacher_id),
          questions:test_questions(*)
        `)
        .eq("id", testId)
        .single();

      if (testError) throw testError;

      // Check if student has already submitted
      if (profile?.role === "student") {
        const { data: result } = await supabase
          .from("test_results")
          .select("*")
          .eq("test_id", testId)
          .eq("student_id", profile.id)
          .maybeSingle();

        return { success: true, test, existingResult: result };
      }

      return { success: true, test };
    } catch (err) {
      console.error("Error fetching test:", err);
      return { success: false, error: err.message };
    }
  };

  const submitTest = async (testId, answers) => {
    try {
      // Fetch questions to calculate score
      const { data: questions } = await supabase
        .from("test_questions")
        .select("id, correct_answer")
        .eq("test_id", testId)
        .order("order_index");

      const { data: test } = await supabase
        .from("tests")
        .select("total_marks")
        .eq("id", testId)
        .single();

      // Calculate score
      let correctCount = 0;
      questions.forEach((q, index) => {
        if (answers[index] === q.correct_answer) {
          correctCount++;
        }
      });

      const score = Math.round(
        (correctCount / questions.length) * test.total_marks
      );

      // Submit result
      const { data: result, error } = await supabase
        .from("test_results")
        .insert({
          test_id: testId,
          student_id: profile.id,
          answers,
          score,
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, result };
    } catch (err) {
      console.error("Error submitting test:", err);
      return { success: false, error: err.message };
    }
  };

  return {
    tests,
    loading,
    error,
    createTest,
    getTest,
    submitTest,
    refetch: fetchTests,
  };
}
