import { Link } from "react-router-dom";
import { Video, Radio, Clock, FileText } from "lucide-react";

export function ClassCard({ classItem, batchId, isTeacher = false }) {
  const isLive = classItem.type === "live";
  const basePath = isTeacher ? "/teacher" : "/student";
  const linkPath = isLive
    ? `${basePath}/batches/${batchId}/live/${classItem.id}`
    : `${basePath}/batches/${batchId}/class/${classItem.id}`;

  return (
    <Link to={linkPath} className="card-interactive block p-5">
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            isLive
              ? "bg-destructive/10 text-destructive"
              : "bg-primary/10 text-primary"
          }`}
        >
          {isLive ? <Radio className="w-6 h-6" /> : <Video className="w-6 h-6" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {isLive && classItem.isLive && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-destructive text-destructive-foreground animate-pulse">
                LIVE NOW
              </span>
            )}
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                isLive
                  ? "bg-destructive/10 text-destructive"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {isLive ? "Live Class" : "Recorded"}
            </span>
          </div>

          <h4 className="font-semibold text-foreground mb-1 truncate">
            {classItem.title}
          </h4>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {classItem.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{classItem.duration}</span>
            </div>
            {isLive && classItem.scheduledAt && (
              <div className="flex items-center gap-1">
                <span>
                  {new Date(classItem.scheduledAt).toLocaleDateString("en-BD", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
