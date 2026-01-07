import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
  GraduationCap,
  Video,
  MessageCircle,
  FileText,
  ClipboardCheck,
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Play,
} from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Live Classes",
    description: "Interactive live sessions with real-time Q&A and discussions",
  },
  {
    icon: MessageCircle,
    title: "Real-time Chat",
    description: "Engage with teachers and peers during live classes",
  },
  {
    icon: FileText,
    title: "Study Notes",
    description: "Access comprehensive notes and downloadable resources",
  },
  {
    icon: ClipboardCheck,
    title: "MCQ Tests",
    description: "Practice with quizzes and get instant results",
  },
];

const stats = [
  { value: "50,000+", label: "Active Students" },
  { value: "500+", label: "Expert Teachers" },
  { value: "1,000+", label: "Courses" },
  { value: "95%", label: "Success Rate" },
];

const testimonials = [
  {
    name: "সাবিনা আক্তার",
    role: "HSC Student",
    content:
      "শিক্ষক.io এর মাধ্যমে আমি HSC Physics এ A+ পেয়েছি। লাইভ ক্লাসগুলো অসাধারণ!",
    rating: 5,
  },
  {
    name: "মোঃ রাকিব হাসান",
    role: "SSC Student",
    content:
      "Math ভয় ছিল, কিন্তু এখন আমার favourite subject। Teachers অনেক helpful।",
    rating: 5,
  },
  {
    name: "ফাতিমা খাতুন",
    role: "Parent",
    content:
      "আমার ছেলের পড়াশোনায় অনেক উন্নতি হয়েছে। ঘরে বসেই ভালো শিক্ষা পাচ্ছে।",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="section-container py-20 lg:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                বাংলাদেশের #১ অনলাইন শিক্ষা প্ল্যাটফর্ম
              </div>

              <h1 className="text-4xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6">
                ঘরে বসে শিখুন
                <br />
                <span className="gradient-text">দেশসেরা শিক্ষকদের</span>
                <br />
                কাছ থেকে
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                HSC, SSC এবং বিশ্ববিদ্যালয় ভর্তি পরীক্ষার জন্য সবচেয়ে বিশ্বস্ত
                অনলাইন শিক্ষা প্ল্যাটফর্ম। লাইভ ক্লাস, নোটস এবং প্র্যাকটিস টেস্ট।
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity shadow-lg"
                >
                  Start Learning Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/features"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-border text-foreground font-medium rounded-xl hover:bg-secondary transition-colors"
                >
                  <Play className="w-5 h-5" />
                  Watch Demo
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-accent">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    50,000+ happy students
                  </p>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="relative z-10 bg-card rounded-2xl shadow-2xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-medium text-foreground">HSC Physics: Mechanics</p>
                  <p className="text-sm text-muted-foreground">Live class starting soon</p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />

              <div className="absolute top-4 -left-8 bg-card rounded-xl shadow-lg p-3 animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">Live Now</p>
                    <p className="text-xs text-muted-foreground">256 students</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 -right-6 bg-card rounded-xl shadow-lg p-3 animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">A+ Results</p>
                    <p className="text-xs text-muted-foreground">95% success</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-sidebar text-sidebar-foreground">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl lg:text-4xl font-display font-bold text-sidebar-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-sidebar-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-muted-foreground">
              আমাদের প্ল্যাটফর্মে আছে সব ধরনের শিক্ষা সামগ্রী যা আপনার সাফল্যের
              জন্য প্রয়োজন
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="card-elevated p-6 text-center group hover:border-primary/30 border border-transparent transition-colors"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
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

      {/* Testimonials Section */}
      <section className="py-20 bg-secondary/50">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              What Our Students Say
            </h2>
            <p className="text-muted-foreground">
              হাজার হাজার শিক্ষার্থী এবং অভিভাবকদের বিশ্বাস অর্জন করেছি
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="card-elevated p-6 space-y-4"
              >
                <div className="flex items-center gap-1 text-accent">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-foreground">{testimonial.content}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent" />
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="section-container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sidebar to-sidebar/90 text-sidebar-foreground p-8 lg:p-16 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-50" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-sidebar-foreground/80 mb-8">
                আজই যোগ দিন এবং পান ফ্রি ট্রায়াল ক্লাস। কোন ক্রেডিট কার্ড
                প্রয়োজন নেই।
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sidebar-accent text-sidebar-foreground font-semibold rounded-xl hover:bg-sidebar-accent/80 transition-colors"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
