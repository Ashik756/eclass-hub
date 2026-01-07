import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Target, Heart, Users, Award } from "lucide-react";

const team = [
  {
    name: "Dr. Md. Rafiqul Islam",
    role: "Founder & CEO",
    bio: "Former professor at BUET with 20+ years in education technology",
  },
  {
    name: "Fatema Begum",
    role: "Head of Education",
    bio: "Curriculum expert with experience at leading coaching centers",
  },
  {
    name: "Tanvir Ahmed",
    role: "CTO",
    bio: "Ex-Google engineer passionate about ed-tech innovation",
  },
  {
    name: "Nusrat Jahan",
    role: "Head of Operations",
    bio: "MBA from IBA, specializing in education management",
  },
];

const values = [
  {
    icon: Target,
    title: "Mission",
    description:
      "To democratize quality education in Bangladesh by connecting students with the best teachers, regardless of location or economic background.",
  },
  {
    icon: Heart,
    title: "Passion",
    description:
      "We believe every student deserves access to world-class education. Our passion drives us to innovate and improve continuously.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Building a supportive community of learners and educators who help each other succeed and grow together.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We strive for excellence in everything we do, from our platform to our content to our customer support.",
  },
];

const milestones = [
  { year: "2020", event: "শিক্ষক.io was founded during the pandemic" },
  { year: "2021", event: "Reached 10,000 students milestone" },
  { year: "2022", event: "Launched live class features with real-time chat" },
  { year: "2023", event: "Expanded to 50,000+ students across Bangladesh" },
  { year: "2024", event: "Introduced MCQ testing and advanced analytics" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
        <div className="section-container text-center">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Transforming Education
            <br />
            <span className="gradient-text">Across Bangladesh</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            শিক্ষক.io was born from a simple belief: every student in Bangladesh
            deserves access to quality education, no matter where they live.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  When the COVID-19 pandemic hit in 2020, millions of students
                  in Bangladesh suddenly lost access to their classrooms. Schools
                  and coaching centers closed, but the need for education remained.
                </p>
                <p>
                  That's when a group of educators and technologists came together
                  with a vision: to create a platform that would bring the best
                  teachers in Bangladesh directly to students' homes.
                </p>
                <p>
                  Today, শিক্ষক.io serves over 50,000 students across the country,
                  from Dhaka to remote villages in Sylhet. Our platform has helped
                  thousands of students achieve their academic goals, with a 95%
                  success rate in HSC and SSC examinations.
                </p>
              </div>
            </div>
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <div className="text-center p-8">
                <p className="text-6xl font-display font-bold gradient-text mb-2">
                  50K+
                </p>
                <p className="text-muted-foreground">Students Empowered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/50">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="card-elevated p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-muted-foreground">
              From a small startup to Bangladesh's leading ed-tech platform
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 pt-3">
                  <p className="text-foreground">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-secondary/50">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground">
              The passionate people behind শিক্ষক.io
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="card-elevated p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent" />
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-primary mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="section-container text-center">
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-4">
            Join Our Mission
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Whether you're a student looking to learn or a teacher wanting to
            share your knowledge, we'd love to have you on board.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
            <a
              href="mailto:careers@shikkhok.io"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-border text-foreground font-medium rounded-xl hover:bg-secondary transition-colors"
            >
              We're Hiring
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
