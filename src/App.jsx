import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Public Pages
import HomePage from "./pages/HomePage";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Teacher Pages
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherBatches from "./pages/TeacherBatches";
import CreateBatch from "./pages/CreateBatch";
import TeacherLiveClasses from "./pages/TeacherLiveClasses";
import TeacherStudents from "./pages/TeacherStudents";

// Student Pages
import StudentDashboard from "./pages/StudentDashboard";
import StudentBatches from "./pages/StudentBatches";
import StudentLiveClasses from "./pages/StudentLiveClasses";
import StudentRecordings from "./pages/StudentRecordings";
import StudentNotes from "./pages/StudentNotes";
import StudentTests from "./pages/StudentTests";

// Shared Pages
import BatchDetail from "./pages/BatchDetail";
import LiveClassPage from "./pages/LiveClassPage";
import RecordedClassPage from "./pages/RecordedClassPage";
import TestPage from "./pages/TestPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Teacher Routes */}
          <Route path="/teacher" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherDashboard /></ProtectedRoute>} />
          <Route path="/teacher/batches" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherBatches /></ProtectedRoute>} />
          <Route path="/teacher/batches/create" element={<ProtectedRoute allowedRoles={["teacher"]}><CreateBatch /></ProtectedRoute>} />
          <Route path="/teacher/batches/:batchId" element={<ProtectedRoute allowedRoles={["teacher"]}><BatchDetail /></ProtectedRoute>} />
          <Route path="/teacher/batches/:batchId/live/:classId" element={<ProtectedRoute allowedRoles={["teacher"]}><LiveClassPage /></ProtectedRoute>} />
          <Route path="/teacher/batches/:batchId/class/:classId" element={<ProtectedRoute allowedRoles={["teacher"]}><RecordedClassPage /></ProtectedRoute>} />
          <Route path="/teacher/live" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherLiveClasses /></ProtectedRoute>} />
          <Route path="/teacher/students" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherStudents /></ProtectedRoute>} />
          <Route path="/teacher/tests/:testId" element={<ProtectedRoute allowedRoles={["teacher"]}><TestPage /></ProtectedRoute>} />

          {/* Student Routes */}
          <Route path="/student" element={<ProtectedRoute allowedRoles={["student"]}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/batches" element={<ProtectedRoute allowedRoles={["student"]}><StudentBatches /></ProtectedRoute>} />
          <Route path="/student/batches/:batchId" element={<ProtectedRoute allowedRoles={["student"]}><BatchDetail /></ProtectedRoute>} />
          <Route path="/student/batches/:batchId/live/:classId" element={<ProtectedRoute allowedRoles={["student"]}><LiveClassPage /></ProtectedRoute>} />
          <Route path="/student/batches/:batchId/class/:classId" element={<ProtectedRoute allowedRoles={["student"]}><RecordedClassPage /></ProtectedRoute>} />
          <Route path="/student/live" element={<ProtectedRoute allowedRoles={["student"]}><StudentLiveClasses /></ProtectedRoute>} />
          <Route path="/student/recordings" element={<ProtectedRoute allowedRoles={["student"]}><StudentRecordings /></ProtectedRoute>} />
          <Route path="/student/notes" element={<ProtectedRoute allowedRoles={["student"]}><StudentNotes /></ProtectedRoute>} />
          <Route path="/student/tests" element={<ProtectedRoute allowedRoles={["student"]}><StudentTests /></ProtectedRoute>} />
          <Route path="/student/tests/:testId" element={<ProtectedRoute allowedRoles={["student"]}><TestPage /></ProtectedRoute>} />

          {/* 404 */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
