import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { DashboardLayout } from "../components/DashboardLayout";
import { tests, testResults, batches } from "../data/mockData";
import { useAuth } from "../contexts/AuthContext";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

export default function TestPage() {
  const { testId } = useParams();
  const { user, isTeacher } = useAuth();
  const navigate = useNavigate();

  const test = tests.find((t) => t.id === testId);
  const batch = test ? batches.find((b) => b.id === test.batchId) : null;
  const existingResult = testResults.find(
    (r) => r.testId === testId && r.studentId === user?.id
  );

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(!!existingResult);
  const [result, setResult] = useState(existingResult);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  if (!test || !batch) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Test not found</p>
          <Link
            to={isTeacher ? "/teacher" : "/student/tests"}
            className="text-primary mt-4 inline-block"
          >
            Go back
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const handleSubmit = () => {
    let score = 0;
    const answerArray = [];

    test.questions.forEach((q, index) => {
      const userAnswer = answers[index];
      answerArray.push(userAnswer);
      if (userAnswer === q.correctAnswer) {
        score += test.totalMarks / test.questions.length;
      }
    });

    const newResult = {
      id: Date.now().toString(),
      testId: test.id,
      studentId: user?.id,
      answers: answerArray,
      score: Math.round(score),
      submittedAt: new Date().toISOString(),
    };

    testResults.push(newResult);
    setResult(newResult);
    setSubmitted(true);
  };

  const basePath = isTeacher ? "/teacher" : "/student";

  if (isTeacher) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Link
            to={`${basePath}/batches/${batch.id}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {batch.name}
          </Link>

          <div className="card-elevated p-6">
            <h1 className="text-2xl font-display font-bold text-foreground mb-2">
              {test.title}
            </h1>
            <p className="text-muted-foreground mb-4">{test.description}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{test.questions.length} Questions</span>
              <span>{test.duration} mins</span>
              <span>{test.totalMarks} marks</span>
            </div>
          </div>

          <div className="space-y-4">
            {test.questions.map((q, index) => (
              <div key={q.id} className="card-elevated p-5">
                <p className="font-medium text-foreground mb-3">
                  {index + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className={`p-3 rounded-lg border ${
                        optIndex === q.correctAnswer
                          ? "border-success bg-success/5"
                          : "border-border"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {optIndex === q.correctAnswer && (
                          <CheckCircle className="w-4 h-4 text-success" />
                        )}
                        <span>{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (submitted && result) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto space-y-6">
          <Link
            to="/student/tests"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tests
          </Link>

          <div className="card-elevated p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground mb-2">
              Test Completed!
            </h1>
            <p className="text-muted-foreground mb-6">
              You have successfully completed the test.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-secondary rounded-xl">
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Your Score</p>
                <p className="text-3xl font-display font-bold text-foreground">
                  {result.score}/{test.totalMarks}
                </p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Percentage</p>
                <p className="text-3xl font-display font-bold text-foreground">
                  {Math.round((result.score / test.totalMarks) * 100)}%
                </p>
              </div>
            </div>
          </div>

          {/* Review Answers */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              Review Answers
            </h2>
            {test.questions.map((q, index) => {
              const userAnswer = result.answers[index];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div key={q.id} className="card-elevated p-5">
                  <div className="flex items-start gap-2 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    )}
                    <p className="font-medium text-foreground">
                      {index + 1}. {q.question}
                    </p>
                  </div>
                  <div className="space-y-2 ml-7">
                    {q.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-lg border ${
                          optIndex === q.correctAnswer
                            ? "border-success bg-success/5"
                            : optIndex === userAnswer && !isCorrect
                            ? "border-destructive bg-destructive/5"
                            : "border-border"
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <Link
          to="/student/tests"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tests
        </Link>

        {/* Test Header */}
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-sm text-muted-foreground">{batch.name}</span>
              <h1 className="text-xl font-display font-bold text-foreground">
                {test.title}
              </h1>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 text-accent rounded-lg">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{test.duration} mins</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{test.questions.length} Questions</span>
            <span>{test.totalMarks} Total Marks</span>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2">
          {test.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                index === currentQuestion
                  ? "bg-primary text-primary-foreground"
                  : answers[index] !== undefined
                  ? "bg-success/20 text-success"
                  : "bg-secondary text-muted-foreground hover:bg-muted"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Current Question */}
        <div className="card-elevated p-6">
          <p className="text-lg font-medium text-foreground mb-6">
            {currentQuestion + 1}. {test.questions[currentQuestion].question}
          </p>
          <div className="space-y-3">
            {test.questions[currentQuestion].options.map((option, optIndex) => (
              <button
                key={optIndex}
                onClick={() =>
                  setAnswers({ ...answers, [currentQuestion]: optIndex })
                }
                className={`w-full p-4 rounded-xl border text-left transition-colors ${
                  answers[currentQuestion] === optIndex
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm ${
                      answers[currentQuestion] === optIndex
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground"
                    }`}
                  >
                    {String.fromCharCode(65 + optIndex)}
                  </span>
                  <span className="text-foreground">{option}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="px-4 py-2 border-2 border-border text-foreground font-medium rounded-xl hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentQuestion === test.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== test.questions.length}
              className="px-6 py-2 bg-success text-success-foreground font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Test
            </button>
          ) : (
            <button
              onClick={() =>
                setCurrentQuestion(
                  Math.min(test.questions.length - 1, currentQuestion + 1)
                )
              }
              className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity"
            >
              Next
            </button>
          )}
        </div>

        {Object.keys(answers).length !== test.questions.length && (
          <div className="flex items-center gap-2 p-4 bg-accent/10 rounded-xl text-accent">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm">
              Answer all {test.questions.length} questions to submit the test.{" "}
              {test.questions.length - Object.keys(answers).length} remaining.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
