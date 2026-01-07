import { useState } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { BatchCard } from "../components/BatchCard";
import { batches } from "../data/mockData";
import { useAuth } from "../contexts/AuthContext";
import { Search, Plus, BookOpen } from "lucide-react";

export default function StudentBatches() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [joinError, setJoinError] = useState("");

  const enrolledBatches = batches.filter(
    (b) =>
      b.students?.includes(user?.id) &&
      b.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleJoinBatch = () => {
    setJoinError("");
    const batch = batches.find(
      (b) => b.inviteCode.toLowerCase() === inviteCode.toLowerCase()
    );

    if (!batch) {
      setJoinError("Invalid invite code");
      return;
    }

    if (batch.students?.includes(user?.id)) {
      setJoinError("You're already enrolled in this batch");
      return;
    }

    // Add student to batch
    if (!batch.students) batch.students = [];
    batch.students.push(user?.id);

    setShowJoinModal(false);
    setInviteCode("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              My Courses
            </h1>
            <p className="text-muted-foreground">
              Access all your enrolled courses
            </p>
          </div>
          <button
            onClick={() => setShowJoinModal(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            Join Batch
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="input-field pl-12"
          />
        </div>

        {/* Batches Grid */}
        {enrolledBatches.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolledBatches.map((batch) => (
              <BatchCard key={batch.id} batch={batch} />
            ))}
          </div>
        ) : (
          <div className="card-elevated p-8 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold text-foreground mb-2">
              {search ? "No courses found" : "No courses yet"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {search
                ? "Try a different search term"
                : "Join a batch using an invite code to start learning"}
            </p>
            {!search && (
              <button
                onClick={() => setShowJoinModal(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" />
                Join Batch
              </button>
            )}
          </div>
        )}
      </div>

      {/* Join Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="card-elevated p-6 w-full max-w-md animate-scale-in">
            <h2 className="text-xl font-display font-bold text-foreground mb-2">
              Join a Batch
            </h2>
            <p className="text-muted-foreground mb-6">
              Enter the invite code provided by your teacher
            </p>

            {joinError && (
              <div className="p-3 mb-4 rounded-lg bg-destructive/10 text-destructive text-sm">
                {joinError}
              </div>
            )}

            <input
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
              placeholder="Enter invite code"
              className="input-field mb-4 text-center text-lg font-mono tracking-widest"
            />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowJoinModal(false);
                  setInviteCode("");
                  setJoinError("");
                }}
                className="flex-1 py-2.5 border-2 border-border text-foreground font-medium rounded-xl hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleJoinBatch}
                disabled={!inviteCode.trim()}
                className="flex-1 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
