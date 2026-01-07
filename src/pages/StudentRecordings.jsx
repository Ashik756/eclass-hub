import { DashboardLayout } from "../components/DashboardLayout";
import { batches, classes } from "../data/mockData";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Video, Clock, Play } from "lucide-react";

export default function StudentRecordings() {
  const { user } = useAuth();

  const enrolledBatches = batches.filter((b) =>
    b.students?.includes(user?.id)
  );
  const batchIds = enrolledBatches.map((b) => b.id);
  const recordedClasses = classes.filter(
    (c) => c.type === "recorded" && batchIds.includes(c.batchId)
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Recorded Classes
          </h1>
          <p className="text-muted-foreground">
            Watch class recordings at your own pace
          </p>
        </div>

        {recordedClasses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recordedClasses.map((recording) => {
              const batch = batches.find((b) => b.id === recording.batchId);
              return (
                <Link
                  key={recording.id}
                  to={`/student/batches/${batch?.id}/class/${recording.id}`}
                  className="card-interactive overflow-hidden"
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 relative flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-primary-foreground ml-1" />
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-muted-foreground">
                      {batch?.name}
                    </span>
                    <h3 className="font-semibold text-foreground mt-1 line-clamp-1">
                      {recording.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {recording.description}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{recording.duration}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="card-elevated p-8 text-center">
            <Video className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold text-foreground mb-2">
              No recordings available
            </h3>
            <p className="text-sm text-muted-foreground">
              Recorded classes will appear here when your teachers add them
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
