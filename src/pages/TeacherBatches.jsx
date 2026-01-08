import { useState } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { BatchCard } from "../components/BatchCard";
import { useBatches } from "@/hooks/useBatches";
import { Link } from "react-router-dom";
import { Plus, Search, Loader2 } from "lucide-react";

export default function TeacherBatches() {
  const { batches, loading } = useBatches();
  const [search, setSearch] = useState("");

  const filteredBatches = batches.filter((b) =>
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
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredBatches.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBatches.map((batch) => (
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
