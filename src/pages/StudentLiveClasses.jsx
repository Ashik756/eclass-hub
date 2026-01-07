import { DashboardLayout } from "../components/DashboardLayout";
import { batches, classes } from "../data/mockData";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Radio, Calendar, Clock } from "lucide-react";

export default function StudentLiveClasses() {
  const { user } = useAuth();

  const enrolledBatches = batches.filter((b) =>
    b.students?.includes(user?.id)
  );
  const batchIds = enrolledBatches.map((b) => b.id);
  const liveClasses = classes.filter(
    (c) => c.type === "live" && batchIds.includes(c.batchId)
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Live Classes
          </h1>
          <p className="text-muted-foreground">
            Join live sessions and interact with your teachers
          </p>
        </div>

        {liveClasses.length > 0 ? (
          <div className="space-y-4">
            {liveClasses.map((liveClass) => {
              const batch = batches.find((b) => b.id === liveClass.batchId);
              return (
                <Link
                  key={liveClass.id}
                  to={`/student/batches/${batch?.id}/live/${liveClass.id}`}
                  className="card-interactive p-5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        liveClass.isLive
                          ? "bg-destructive/10"
                          : "bg-primary/10"
                      }`}
                    >
                      <Radio
                        className={`w-7 h-7 ${
                          liveClass.isLive ? "text-destructive" : "text-primary"
                        }`}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {liveClass.isLive && (
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-destructive text-destructive-foreground animate-pulse">
                            LIVE NOW
                          </span>
                        )}
                        <span className="text-sm text-muted-foreground">
                          {batch?.name}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground">
                        {liveClass.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {liveClass.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {new Date(liveClass.scheduledAt).toLocaleDateString(
                              "en-BD",
                              {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>
                            {new Date(liveClass.scheduledAt).toLocaleTimeString(
                              "en-BD",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </div>
                        <span>{liveClass.duration}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    className={`px-4 py-2 font-medium rounded-lg transition-colors ${
                      liveClass.isLive
                        ? "bg-destructive text-destructive-foreground hover:opacity-90"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                  >
                    {liveClass.isLive ? "Join Now" : "View Details"}
                  </button>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="card-elevated p-8 text-center">
            <Radio className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold text-foreground mb-2">
              No live classes scheduled
            </h3>
            <p className="text-sm text-muted-foreground">
              Live classes will appear here when your teachers schedule them
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
