import { DashboardLayout } from "../components/DashboardLayout";
import { batches } from "../data/mockData";
import { useAuth } from "../contexts/AuthContext";
import { Users, Mail, Calendar } from "lucide-react";

export default function TeacherStudents() {
  const { user } = useAuth();

  const myBatches = batches.filter((b) => b.teacherId === user?.id);
  
  // Get unique students across all batches
  const allStudentIds = new Set();
  myBatches.forEach((b) => {
    b.students?.forEach((s) => allStudentIds.add(s));
  });

  const totalStudents = allStudentIds.size;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            My Students
          </h1>
          <p className="text-muted-foreground">
            View and manage students across your batches
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="stat-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold text-foreground">{totalStudents}</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Batches</p>
                <p className="text-2xl font-bold text-foreground">{myBatches.length}</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg per Batch</p>
                <p className="text-2xl font-bold text-foreground">
                  {myBatches.length > 0
                    ? Math.round(totalStudents / myBatches.length)
                    : 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Students by Batch */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Students by Batch
          </h2>
          {myBatches.length > 0 ? (
            myBatches.map((batch) => (
              <div key={batch.id} className="card-elevated p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{batch.name}</h3>
                    <p className="text-sm text-muted-foreground">{batch.subject}</p>
                  </div>
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
                    {batch.students?.length || 0} students
                  </span>
                </div>
                
                {batch.students && batch.students.length > 0 ? (
                  <div className="space-y-2">
                    {batch.students.map((studentId, index) => (
                      <div
                        key={studentId}
                        className="flex items-center gap-3 p-3 rounded-lg bg-secondary"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">
                            S{index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">
                            Student {studentId}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Enrolled
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No students enrolled yet. Share the invite code:{" "}
                    <code className="font-mono bg-muted px-2 py-0.5 rounded">
                      {batch.inviteCode}
                    </code>
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="card-elevated p-8 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                Create a batch first to enroll students
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
