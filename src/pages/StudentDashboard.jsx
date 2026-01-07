import { DashboardLayout } from "../components/DashboardLayout";
import { BatchCard } from "../components/BatchCard";
import { StatCard } from "../components/StatCard";
import { batches, classes, tests, testResults } from "../data/mockData";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Radio,
  Video,
  ClipboardCheck,
  ArrowRight,
  Plus,
} from "lucide-react";

export default function StudentDashboard() {
  const { user } = useAuth();

  const enrolledBatches = batches.filter((b) =>
    b.students?.includes(user?.id)
  );
  const batchIds = enrolledBatches.map((b) => b.id);

  const upcomingLiveClasses = classes.filter(
    (c) => c.type === "live" && batchIds.includes(c.batchId)
  );
  const recordedClasses = classes.filter(
    (c) => c.type === "recorded" && batchIds.includes(c.batchId)
  );
  const availableTests = tests.filter((t) => batchIds.includes(t.batchId));
  const completedTests = testResults.filter((r) => r.studentId === user?.id);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
            Welcome back, {user?.name}! 📚
          </h1>
          <p className="text-muted-foreground mt-1">
            Continue your learning journey where you left off.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Enrolled Courses"
            value={enrolledBatches.length}
            icon={BookOpen}
            color="primary"
          />
          <StatCard
            title="Live Classes"
            value={upcomingLiveClasses.length}
            icon={Radio}
            color="destructive"
          />
          <StatCard
            title="Recorded Classes"
            value={recordedClasses.length}
            icon={Video}
            color="success"
          />
          <StatCard
            title="Tests Completed"
            value={`${completedTests.length}/${availableTests.length}`}
            icon={ClipboardCheck}
            color="accent"
          />
        </div>

        {/* My Courses */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              My Courses
            </h2>
            <Link
              to="/student/batches"
              className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {enrolledBatches.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrolledBatches.slice(0, 3).map((batch) => (
                <BatchCard key={batch.id} batch={batch} />
              ))}
            </div>
          ) : (
            <div className="card-elevated p-8 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground mb-2">
                No courses yet
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Join a batch using an invite code to start learning
              </p>
              <Link
                to="/student/join"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" />
                Join Batch
              </Link>
            </div>
          )}
        </div>

        {/* Upcoming Live Classes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Upcoming Live Classes
            </h2>
            <Link
              to="/student/live"
              className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {upcomingLiveClasses.length > 0 ? (
            <div className="space-y-3">
              {upcomingLiveClasses.slice(0, 3).map((liveClass) => {
                const batch = batches.find((b) => b.id === liveClass.batchId);
                return (
                  <Link
                    key={liveClass.id}
                    to={`/student/batches/${batch?.id}/live/${liveClass.id}`}
                    className="card-interactive p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                        <Radio className="w-6 h-6 text-destructive" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">
                          {liveClass.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {batch?.name} •{" "}
                          {new Date(liveClass.scheduledAt).toLocaleDateString(
                            "en-BD",
                            {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                    {liveClass.isLive && (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-destructive text-destructive-foreground animate-pulse">
                        JOIN NOW
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="card-elevated p-6 text-center">
              <Radio className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No upcoming live classes
              </p>
            </div>
          )}
        </div>

        {/* Pending Tests */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Available Tests
            </h2>
            <Link
              to="/student/tests"
              className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {availableTests.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {availableTests.slice(0, 2).map((test) => {
                const batch = batches.find((b) => b.id === test.batchId);
                const isCompleted = completedTests.some(
                  (r) => r.testId === test.id
                );
                return (
                  <Link
                    key={test.id}
                    to={`/student/tests/${test.id}`}
                    className="card-interactive p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                        <ClipboardCheck className="w-5 h-5 text-accent" />
                      </div>
                      {isCompleted && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-success/10 text-success">
                          Completed
                        </span>
                      )}
                    </div>
                    <h4 className="font-medium text-foreground mb-1">
                      {test.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {batch?.name}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{test.questions.length} Questions</span>
                      <span>{test.duration} mins</span>
                      <span>{test.totalMarks} marks</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="card-elevated p-6 text-center">
              <ClipboardCheck className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No tests available yet
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
