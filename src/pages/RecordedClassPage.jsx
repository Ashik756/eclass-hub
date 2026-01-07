import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "../components/DashboardLayout";
import { classes, batches, notes } from "../data/mockData";
import { useAuth } from "../contexts/AuthContext";
import { ArrowLeft, Clock, Download, FileText } from "lucide-react";

export default function RecordedClassPage() {
  const { batchId, classId } = useParams();
  const { isTeacher } = useAuth();

  const recordedClass = classes.find(
    (c) => c.id === classId && c.type === "recorded"
  );
  const batch = batches.find((b) => b.id === batchId);
  const classNotes = notes.filter((n) => n.classId === classId);

  if (!recordedClass || !batch) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Class not found</p>
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
        <div>
          <span className="text-sm text-muted-foreground">{batch.name}</span>
          <h1 className="text-2xl font-display font-bold text-foreground mt-1">
            {recordedClass.title}
          </h1>
          <p className="text-muted-foreground mt-1">
            {recordedClass.description}
          </p>
          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{recordedClass.duration}</span>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="card-elevated overflow-hidden">
          <div className="aspect-video bg-sidebar">
            <iframe
              src={recordedClass.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={recordedClass.title}
            />
          </div>
        </div>

        {/* Class Notes */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Class Notes
          </h2>
          {classNotes.length > 0 ? (
            <div className="space-y-4">
              {classNotes.map((note) => (
                <div key={note.id} className="card-elevated p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">
                        {note.title}
                      </h3>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {note.content}
                      </p>
                      {note.pdfUrl && (
                        <a
                          href={note.pdfUrl}
                          className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-lg hover:bg-primary/20 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Download PDF
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card-elevated p-6 text-center">
              <FileText className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No notes available for this class
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
