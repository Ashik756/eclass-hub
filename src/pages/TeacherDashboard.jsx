import { DashboardLayout } from "../components/DashboardLayout";
import { BatchCard } from "../components/BatchCard";
import { StatCard } from "../components/StatCard";
import { batches, classes } from "../data/mockData";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { BookOpen, Users, Radio, Video, Plus, ArrowRight } from "lucide-react";

export default function TeacherDashboard() {
  const { user } = useAuth();

  const myBatches = batches.filter((b) => b.teacherId === user?.id);
  const totalStudents = myBatches.reduce(
    (acc, b) => acc + (b.students?.length || 0),
    0
  );
  const liveClasses = classes.filter(
    (c) =>
      c.type === "live" &&
      myBatches.some((b) => b.id === c.batchId)
  );
  const recordedClasses = classes.filter(
    (c) =>
      c.type === "recorded" &&
      myBatches.some((b) => b.id === c.batchId)
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your classes today.
            </p>
          </div>
          <Link
            to="/teacher/batches/create"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            Create Batch
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Batches"
            value={myBatches.length}
            icon={BookOpen}
            color="primary"
          />
          <StatCard
            title="Total Students"
            value={totalStudents}
            icon={Users}
            color="accent"
          />
          <StatCard
            title="Live Classes"
            value={liveClasses.length}
            icon={Radio}
            color="destructive"
          />
          <StatCard
            title="Recorded Classes"
            value={recordedClasses.length}
            icon={Video}
            color="success"
          />
        </div>

        {/* Recent Batches */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Your Batches
            </h2>
            <Link
              to="/teacher/batches"
              className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {myBatches.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myBatches.slice(0, 3).map((batch) => (
                <BatchCard key={batch.id} batch={batch} isTeacher />
              ))}
            </div>
          ) : (
            <div className="card-elevated p-8 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground mb-2">
                No batches yet
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create your first batch to start teaching
              </p>
              <Link
                to="/teacher/batches/create"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" />
                Create Batch
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
              to="/teacher/live"
              className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
            >
              Manage
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {liveClasses.length > 0 ? (
            <div className="space-y-3">
              {liveClasses.slice(0, 3).map((liveClass) => {
                const batch = batches.find((b) => b.id === liveClass.batchId);
                return (
                  <div
                    key={liveClass.id}
                    className="card-elevated p-4 flex items-center justify-between"
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
                        LIVE NOW
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="card-elevated p-6 text-center">
              <Radio className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No upcoming live classes scheduled
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
