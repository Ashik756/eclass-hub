import { Link } from "react-router-dom";
import { Users, BookOpen, Calendar } from "lucide-react";

export function BatchCard({ batch, isTeacher = false }) {
  const linkPath = isTeacher
    ? `/teacher/batches/${batch.id}`
    : `/student/batches/${batch.id}`;

  return (
    <Link to={linkPath} className="card-interactive block p-6">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, hsl(${
              parseInt(batch.id) * 60
            } 70% 50%), hsl(${parseInt(batch.id) * 60 + 30} 70% 60%))`,
          }}
        >
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
          {batch.subject}
        </span>
      </div>

      <h3 className="font-semibold text-lg mb-2 text-foreground">{batch.name}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {batch.description}
      </p>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4" />
          <span>{batch.students?.length || 0} Students</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <span>{new Date(batch.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {!isTeacher && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Instructor: <span className="font-medium text-foreground">{batch.teacherName}</span>
          </p>
        </div>
      )}
    </Link>
  );
}
