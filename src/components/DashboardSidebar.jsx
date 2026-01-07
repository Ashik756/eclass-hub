import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  Video,
  FileText,
  ClipboardCheck,
  Users,
  Settings,
  LogOut,
  Plus,
  Radio,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const teacherLinks = [
  { href: "/teacher", label: "Dashboard", icon: LayoutDashboard },
  { href: "/teacher/batches", label: "My Batches", icon: BookOpen },
  { href: "/teacher/batches/create", label: "Create Batch", icon: Plus },
  { href: "/teacher/live", label: "Live Classes", icon: Radio },
  { href: "/teacher/students", label: "Students", icon: Users },
];

const studentLinks = [
  { href: "/student", label: "Dashboard", icon: LayoutDashboard },
  { href: "/student/batches", label: "My Courses", icon: BookOpen },
  { href: "/student/live", label: "Live Classes", icon: Radio },
  { href: "/student/recordings", label: "Recordings", icon: Video },
  { href: "/student/notes", label: "Notes", icon: FileText },
  { href: "/student/tests", label: "Tests", icon: ClipboardCheck },
];

export function DashboardSidebar() {
  const { user, logout, isTeacher } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = isTeacher ? teacherLinks : studentLinks;

  const isActive = (path) => {
    if (path === "/teacher" || path === "/student") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg">
            শিক্ষক<span className="text-primary">.io</span>
          </span>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-sidebar-accent flex items-center justify-center">
            <span className="text-lg font-semibold text-sidebar-primary">
              {user?.name?.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-medium text-sm">{user?.name}</p>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                isTeacher
                  ? "bg-primary/20 text-primary"
                  : "bg-accent/20 text-accent"
              }`}
            >
              {isTeacher ? "Teacher" : "Student"}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            onClick={() => setIsOpen(false)}
            className={`nav-link ${isActive(link.href) ? "nav-link-active" : ""}`}
          >
            <link.icon className="w-5 h-5" />
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-1">
        <Link
          to="/"
          className="nav-link text-sidebar-foreground/60 hover:text-sidebar-foreground"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
        <button
          onClick={logout}
          className="nav-link w-full text-destructive/80 hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-sidebar text-sidebar-foreground h-16 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg">শিক্ষক.io</span>
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`dashboard-sidebar fixed lg:sticky top-0 left-0 h-screen w-64 flex flex-col z-50 transform transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
