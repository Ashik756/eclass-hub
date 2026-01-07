import { useState } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { BatchCard } from "../components/BatchCard";
import { batches } from "../data/mockData";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";

export default function TeacherBatches() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  const myBatches = batches.filter(
    (b) =>
      b.teacherId === user?.id &&
      b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              My Batches
            </h1>
            <p className="text-muted-foreground">
              Manage all your batches and courses
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

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search batches..."
            className="input-field pl-12"
          />
        </div>

        {/* Batches Grid */}
        {myBatches.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myBatches.map((batch) => (
              <BatchCard key={batch.id} batch={batch} isTeacher />
            ))}
          </div>
        ) : (
          <div className="card-elevated p-8 text-center">
            <p className="text-muted-foreground">
              {search
                ? "No batches found matching your search"
                : "You haven't created any batches yet"}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
