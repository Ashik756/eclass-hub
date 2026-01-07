import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
  Video,
  MessageCircle,
  FileText,
  ClipboardCheck,
  Users,
  Calendar,
  Download,
  BarChart,
  Shield,
  Smartphone,
  Globe,
  Zap,
  CheckCircle,
} from "lucide-react";

const mainFeatures = [
  {
    icon: Video,
    title: "Live Interactive Classes",
    description:
      "Real-time video classes with screen sharing, whiteboard, and interactive Q&A sessions. Teachers can demonstrate concepts clearly while students participate actively.",
    benefits: [
      "HD video streaming",
      "Screen sharing & whiteboard",
      "Real-time Q&A",
      "Class recordings available",
    ],
  },
  {
    icon: MessageCircle,
    title: "Real-time Live Comments",
    description:
      "Facebook Live-style comment system during live classes. Students can ask questions, share insights, and teachers can respond instantly.",
    benefits: [
      "Instant messaging",
      "Teacher moderation",
      "Comment history",
      "Reply threading",
    ],
  },
  {
    icon: FileText,
    title: "Comprehensive Study Notes",
    description:
      "Access detailed notes for every class. Download PDFs, review key concepts, and never miss important information.",
    benefits: [
      "PDF downloads",
      "Rich text formatting",
      "Organized by topic",
      "Offline access",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "MCQ Practice Tests",
    description:
      "Regular quizzes and tests to assess your understanding. Get instant results and track your progress over time.",
    benefits: [
      "Instant results",
      "Detailed explanations",
      "Progress tracking",
      "Timed tests",
    ],
  },
];

const additionalFeatures = [
  {
    icon: Users,
    title: "Batch Management",
    description: "Create and manage multiple batches with ease",
  },
  {
    icon: Calendar,
    title: "Class Scheduling",
    description: "Schedule live classes with automatic reminders",
  },
  {
    icon: Download,
    title: "Recorded Classes",
    description: "Access class recordings anytime, anywhere",
  },
  {
    icon: BarChart,
    title: "Progress Analytics",
    description: "Track student performance and engagement",
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Enterprise-grade security for your data",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Learn on any device, anytime",
  },
  {
    icon: Globe,
    title: "Bangla Support",
    description: "Full Bengali language support throughout",
  },
  {
    icon: Zap,
    title: "Fast & Reliable",
    description: "Optimized for Bangladesh internet speeds",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
        <div className="section-container text-center">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Powerful Features for
            <br />
            <span className="gradient-text">Modern Education</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Everything you need to create, manage, and deliver world-class
            online education. Built specifically for Bangladesh's education
            system.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="section-container">
          <div className="space-y-24">
            {mainFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                    {feature.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-center gap-3 text-foreground"
                      >
                        <CheckCircle className="w-5 h-5 text-success shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`aspect-video rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                    <feature.icon className="w-10 h-10 text-primary" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 bg-secondary/50">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              And Much More
            </h2>
            <p className="text-muted-foreground">
              Packed with features to make online teaching and learning seamless
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature) => (
              <div key={feature.title} className="card-elevated p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="section-container">
          <div className="card-elevated p-8 lg:p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-4">
              Ready to Transform Your Teaching?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of teachers who are already using শিক্ষক.io to
              deliver exceptional online education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity"
              >
                Start Teaching Today
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-border text-foreground font-medium rounded-xl hover:bg-secondary transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
