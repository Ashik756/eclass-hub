import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { DashboardLayout } from "../components/DashboardLayout";
import { useClasses } from "@/hooks/useClasses";
import { Video, Radio, FileText, ArrowLeft, Loader2 } from "lucide-react";

export default function AddClass() {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const { createClass } = useClasses(batchId);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    class_type: "recorded",
    video_url: "",
    live_url: "",
    scheduled_at: "",
    duration: "",
  });

  const classTypes = [
    { id: "recorded", label: "Recorded Class", icon: Video, description: "Pre-recorded video lesson" },
    { id: "live", label: "Live Class", icon: Radio, description: "Real-time interactive session" },
    { id: "notes", label: "Notes Only", icon: FileText, description: "Text and PDF materials" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await createClass(formData);

    if (result.success) {
      navigate(`/teacher/batches/${batchId}`);
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <Link
          to={`/teacher/batches/${batchId}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Batch
        </Link>

        <div className="card-elevated p-6 lg:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Video className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                Add New Class
              </h1>
              <p className="text-muted-foreground">
                Create a new class for your students
              </p>
            </div>
          </div>

          {error && (
            <div className="p-4 mb-6 rounded-xl bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Class Type Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Class Type *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {classTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, class_type: type.id })}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      formData.class_type === type.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <type.icon
                      className={`w-6 h-6 mx-auto mb-2 ${
                        formData.class_type === type.id
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                    <p
                      className={`text-sm font-medium ${
                        formData.class_type === type.id
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {type.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., Introduction to Mechanics"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe what students will learn..."
                rows={3}
                className="input-field resize-none"
              />
            </div>

            {formData.class_type === "recorded" && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Video URL *
                </label>
                <input
                  type="url"
                  value={formData.video_url}
                  onChange={(e) =>
                    setFormData({ ...formData, video_url: e.target.value })
                  }
                  placeholder="https://www.youtube.com/embed/..."
                  className="input-field"
                  required={formData.class_type === "recorded"}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use YouTube embed URL format
                </p>
              </div>
            )}

            {formData.class_type === "live" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Live Class URL *
                  </label>
                  <input
                    type="url"
                    value={formData.live_url}
                    onChange={(e) =>
                      setFormData({ ...formData, live_url: e.target.value })
                    }
                    placeholder="https://meet.jit.si/your-room"
                    className="input-field"
                    required={formData.class_type === "live"}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Use Jitsi Meet or similar embed-compatible platform
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Scheduled Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.scheduled_at}
                    onChange={(e) =>
                      setFormData({ ...formData, scheduled_at: e.target.value })
                    }
                    className="input-field"
                    required={formData.class_type === "live"}
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                placeholder="e.g., 45 mins"
                className="input-field"
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
                className="flex-1 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Class"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
