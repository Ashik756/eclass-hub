import { DashboardLayout } from "../components/DashboardLayout";
import { batches, classes, notes } from "../data/mockData";
import { useAuth } from "../contexts/AuthContext";
import { FileText, Download } from "lucide-react";

export default function StudentNotes() {
  const { user } = useAuth();

  const enrolledBatches = batches.filter((b) =>
    b.students?.includes(user?.id)
  );
  const batchIds = enrolledBatches.map((b) => b.id);
  const enrolledClasses = classes.filter((c) => batchIds.includes(c.batchId));
  const classIds = enrolledClasses.map((c) => c.id);
  const availableNotes = notes.filter((n) => classIds.includes(n.classId));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Study Notes
          </h1>
          <p className="text-muted-foreground">
            Access notes and resources from your classes
          </p>
        </div>

        {availableNotes.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {availableNotes.map((note) => {
              const classItem = classes.find((c) => c.id === note.classId);
              const batch = classItem
                ? batches.find((b) => b.id === classItem.batchId)
                : null;
              return (
                <div key={note.id} className="card-elevated p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-xs text-muted-foreground">
                            {batch?.name} • {classItem?.title}
                          </span>
                          <h3 className="font-semibold text-foreground mt-1">
                            {note.title}
                          </h3>
                        </div>
                        {note.pdfUrl && (
                          <a
                            href={note.pdfUrl}
                            className="shrink-0 p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                        {note.content}
                      </p>
                      <p className="text-xs text-muted-foreground mt-3">
                        Added on {new Date(note.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card-elevated p-8 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold text-foreground mb-2">
              No notes available
            </h3>
            <p className="text-sm text-muted-foreground">
              Notes will appear here when your teachers add them to classes
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
