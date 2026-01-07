import { DashboardLayout } from "../components/DashboardLayout";
import { batches, tests, testResults } from "../data/mockData";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { ClipboardCheck, CheckCircle, Clock } from "lucide-react";

export default function StudentTests() {
  const { user } = useAuth();

  const enrolledBatches = batches.filter((b) =>
    b.students?.includes(user?.id)
  );
  const batchIds = enrolledBatches.map((b) => b.id);
  const availableTests = tests.filter((t) => batchIds.includes(t.batchId));
  const completedResults = testResults.filter((r) => r.studentId === user?.id);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            My Tests
          </h1>
          <p className="text-muted-foreground">
            Take quizzes and track your progress
          </p>
        </div>

        {availableTests.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {availableTests.map((test) => {
              const batch = batches.find((b) => b.id === test.batchId);
              const result = completedResults.find((r) => r.testId === test.id);
              const isCompleted = !!result;

              return (
                <Link
                  key={test.id}
                  to={`/student/tests/${test.id}`}
                  className="card-interactive p-5"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isCompleted ? "bg-success/10" : "bg-accent/10"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-success" />
                      ) : (
                        <ClipboardCheck className="w-6 h-6 text-accent" />
                      )}
                    </div>
                    {isCompleted && (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-success/10 text-success">
                        Score: {result.score}/{test.totalMarks}
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold text-foreground mb-1">
                    {test.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {batch?.name}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {test.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
                    <span>{test.questions.length} Questions</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{test.duration} mins</span>
                    </div>
                    <span>{test.totalMarks} marks</span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="card-elevated p-8 text-center">
            <ClipboardCheck className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold text-foreground mb-2">
              No tests available
            </h3>
            <p className="text-sm text-muted-foreground">
              Tests will appear here when your teachers create them
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
