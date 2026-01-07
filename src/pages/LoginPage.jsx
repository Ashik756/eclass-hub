import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { GraduationCap, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password");
      setLoading(false);
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      const redirectPath =
        from || (result.user.role === "teacher" ? "/teacher" : "/student");
      navigate(redirectPath, { replace: true });
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              শিক্ষক<span className="text-primary">.io</span>
            </span>
          </Link>

          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Welcome back!
          </h1>
          <p className="text-muted-foreground mb-8">
            Enter your credentials to access your account
          </p>

          {/* Demo Credentials */}
          <div className="p-4 mb-6 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-sm font-medium text-foreground mb-2">
              Demo Credentials:
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                <strong>Teacher:</strong> teacher@shikkhok.com / teacher123
              </p>
              <p>
                <strong>Student:</strong> student@shikkhok.com / student123
              </p>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-4 mb-6 rounded-xl bg-destructive/10 text-destructive">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-sm text-primary hover:text-primary/80"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-medium hover:text-primary/80"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Decoration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-sidebar to-sidebar/90 items-center justify-center p-12">
        <div className="max-w-lg text-center text-sidebar-foreground">
          <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-sidebar-accent flex items-center justify-center">
            <GraduationCap className="w-12 h-12 text-sidebar-primary" />
          </div>
          <h2 className="text-3xl font-display font-bold mb-4">
            Start Your Learning Journey
          </h2>
          <p className="text-sidebar-foreground/70">
            Join thousands of students and teachers who are transforming
            education in Bangladesh. Live classes, interactive content, and
            personalized learning - all in one place.
          </p>
        </div>
      </div>
    </div>
  );
}
