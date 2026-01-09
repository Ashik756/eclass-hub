import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  Video,
  FileText,
  ClipboardCheck,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export function DashboardLayout({ children }) {
  const { user, logout, isTeacher } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const teacherLinks = [
    { to: "/teacher", label: "Dashboard", icon: LayoutDashboard },
    { to: "/teacher/batches", label: "Batches", icon: BookOpen },
    { to: "/teacher/live", label: "Live Classes", icon: Video },
    { to: "/teacher/students", label: "Students", icon: Users },
  ];

  const studentLinks = [
    { to: "/student", label: "Dashboard", icon: LayoutDashboard },
    { to: "/student/batches", label: "My Batches", icon: BookOpen },
    { to: "/student/live", label: "Live Classes", icon: Video },
    { to: "/student/recordings", label: "Recordings", icon: Video },
    { to: "/student/notes", label: "Notes", icon: FileText },
    { to: "/student/tests", label: "Tests", icon: ClipboardCheck },
  ];

  const links = isTeacher ? teacherLinks : studentLinks;

  const isActive = (path) => {
    if (path === "/teacher" || path === "/student") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-100 border-r border-gray-200 transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                eClass Hub
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? "bg-gray-200 text-primary"
                    : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-gray-200">
            <div className="mb-3 px-4">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="text-lg font-bold text-gray-900">eClass Hub</span>
            <div className="w-10" />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
