import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "../components/DashboardLayout";
import { LiveComments } from "../components/LiveComments";
import { classes, batches } from "../data/mockData";
import { useAuth } from "../contexts/AuthContext";
import { ArrowLeft, Clock, Calendar, Users } from "lucide-react";

export default function LiveClassPage() {
  const { batchId, classId } = useParams();
  const { isTeacher } = useAuth();

  const liveClass = classes.find((c) => c.id === classId && c.type === "live");
  const batch = batches.find((b) => b.id === batchId);

  if (!liveClass || !batch) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Live class not found</p>
          <Link
            to={isTeacher ? "/teacher/batches" : "/student/batches"}
            className="text-primary mt-4 inline-block"
          >
            Go back to batches
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const basePath = isTeacher ? "/teacher" : "/student";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <Link
          to={`${basePath}/batches/${batchId}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {batch.name}
        </Link>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {liveClass.isLive && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-destructive text-destructive-foreground animate-pulse">
                  LIVE NOW
                </span>
              )}
              <span className="text-sm text-muted-foreground">{batch.name}</span>
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              {liveClass.title}
            </h1>
            <p className="text-muted-foreground mt-1">{liveClass.description}</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{liveClass.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(liveClass.scheduledAt).toLocaleDateString("en-BD", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>{batch.students?.length || 0} enrolled</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="card-elevated overflow-hidden">
              <div className="aspect-video bg-sidebar">
                <iframe
                  src={liveClass.liveUrl}
                  className="w-full h-full"
                  allow="camera; microphone; fullscreen; speaker; display-capture"
                  title={liveClass.title}
                />
              </div>
              <div className="p-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  💡 Tip: Use full screen mode for the best experience. You can
                  ask questions in the live chat on the right.
                </p>
              </div>
            </div>
          </div>

          {/* Live Comments */}
          <div className="lg:col-span-1">
            <LiveComments classId={classId} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
