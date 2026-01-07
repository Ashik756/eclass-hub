import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "../components/DashboardLayout";
import { ClassCard } from "../components/ClassCard";
import { batches, classes, tests, notes } from "../data/mockData";
import { useAuth } from "../contexts/AuthContext";
import {
  ArrowLeft,
  Users,
  Calendar,
  Copy,
  Check,
  Plus,
  Video,
  Radio,
  FileText,
  ClipboardCheck,
} from "lucide-react";

export default function BatchDetail() {
  const { batchId } = useParams();
  const { isTeacher } = useAuth();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("classes");

  const batch = batches.find((b) => b.id === batchId);
  const batchClasses = classes.filter((c) => c.batchId === batchId);
  const batchTests = tests.filter((t) => t.batchId === batchId);
  const batchNotes = notes.filter((n) =>
    batchClasses.some((c) => c.id === n.classId)
  );

  const liveClasses = batchClasses.filter((c) => c.type === "live");
  const recordedClasses = batchClasses.filter((c) => c.type === "recorded");

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(batch?.inviteCode || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!batch) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Batch not found</p>
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

  const tabs = [
    { id: "classes", label: "Classes", icon: Video, count: batchClasses.length },
    { id: "live", label: "Live", icon: Radio, count: liveClasses.length },
    { id: "notes", label: "Notes", icon: FileText, count: batchNotes.length },
    { id: "tests", label: "Tests", icon: ClipboardCheck, count: batchTests.length },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <Link
          to={`${basePath}/batches`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Batches
        </Link>

        {/* Batch Header */}
        <div className="card-elevated p-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: `linear-gradient(135deg, hsl(${
                    parseInt(batch.id) * 60
                  } 70% 50%), hsl(${parseInt(batch.id) * 60 + 30} 70% 60%))`,
                }}
              >
                <Video className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {batch.subject}
                </span>
                <h1 className="text-2xl font-display font-bold text-foreground mt-2">
                  {batch.name}
                </h1>
                <p className="text-muted-foreground mt-1">{batch.description}</p>

                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>{batch.students?.length || 0} Students</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Created {new Date(batch.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {isTeacher && (
              <div className="flex flex-col gap-2">
                <div className="p-3 bg-secondary rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">
                    Invite Code
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="text-lg font-mono font-bold text-foreground">
                      {batch.inviteCode}
                    </code>
                    <button
                      onClick={handleCopyInvite}
                      className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-success" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
                <Link
                  to={`${basePath}/batches/${batchId}/add-class`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Plus className="w-4 h-4" />
                  Add Class
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              <span
                className={`px-1.5 py-0.5 rounded text-xs ${
                  activeTab === tab.id
                    ? "bg-primary-foreground/20"
                    : "bg-muted"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {activeTab === "classes" && (
            <>
              {batchClasses.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {batchClasses.map((classItem) => (
                    <ClassCard
                      key={classItem.id}
                      classItem={classItem}
                      batchId={batchId}
                      isTeacher={isTeacher}
                    />
                  ))}
                </div>
              ) : (
                <div className="card-elevated p-8 text-center">
                  <Video className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No classes yet</p>
                </div>
              )}
            </>
          )}

          {activeTab === "live" && (
            <>
              {liveClasses.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {liveClasses.map((classItem) => (
                    <ClassCard
                      key={classItem.id}
                      classItem={classItem}
                      batchId={batchId}
                      isTeacher={isTeacher}
                    />
                  ))}
                </div>
              ) : (
                <div className="card-elevated p-8 text-center">
                  <Radio className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No live classes scheduled</p>
                </div>
              )}
            </>
          )}

          {activeTab === "notes" && (
            <>
              {batchNotes.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {batchNotes.map((note) => (
                    <div key={note.id} className="card-elevated p-5">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">
                            {note.title}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {note.content}
                          </p>
                          {note.pdfUrl && (
                            <a
                              href={note.pdfUrl}
                              className="inline-flex items-center gap-1 mt-2 text-sm text-primary hover:text-primary/80"
                            >
                              Download PDF
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card-elevated p-8 text-center">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No notes available</p>
                </div>
              )}
            </>
          )}

          {activeTab === "tests" && (
            <>
              {batchTests.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {batchTests.map((test) => (
                    <Link
                      key={test.id}
                      to={`${basePath}/tests/${test.id}`}
                      className="card-interactive p-5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
                          <ClipboardCheck className="w-5 h-5 text-success" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">
                            {test.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {test.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{test.questions.length} Questions</span>
                            <span>{test.duration} mins</span>
                            <span>{test.totalMarks} marks</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="card-elevated p-8 text-center">
                  <ClipboardCheck className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No tests available</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
