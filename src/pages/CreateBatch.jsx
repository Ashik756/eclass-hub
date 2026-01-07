import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../components/DashboardLayout";
import { useAuth } from "../contexts/AuthContext";
import { BookOpen, ArrowLeft } from "lucide-react";
import { batches } from "../data/mockData";
import { Link } from "react-router-dom";

export default function CreateBatch() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    subject: "",
  });

  const subjects = [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "English",
    "Bangla",
    "ICT",
    "General Science",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newBatch = {
      id: Date.now().toString(),
      ...formData,
      teacherId: user.id,
      teacherName: user.name,
      thumbnail: null,
      students: [],
      createdAt: new Date().toISOString().split("T")[0],
      inviteCode: formData.name.substring(0, 4).toUpperCase() + Date.now().toString().slice(-4),
    };

    batches.push(newBatch);
    navigate(`/teacher/batches/${newBatch.id}`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <Link
          to="/teacher/batches"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Batches
        </Link>

        <div className="card-elevated p-6 lg:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                Create New Batch
              </h1>
              <p className="text-muted-foreground">
                Set up a new batch for your students
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Batch Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., HSC Physics 2024"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Subject *
              </label>
              <select
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="input-field"
                required
              >
                <option value="">Select a subject</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe what students will learn in this batch..."
                rows={4}
                className="input-field resize-none"
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 py-3 border-2 border-border text-foreground font-medium rounded-xl hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Batch"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
