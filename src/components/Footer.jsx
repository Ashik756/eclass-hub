import { Link } from "react-router-dom";
import { GraduationCap, Facebook, Youtube, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">
                শিক্ষক<span className="text-primary">.io</span>
              </span>
            </Link>
            <p className="text-sidebar-foreground/70 text-sm">
              বাংলাদেশের সবচেয়ে বিশ্বস্ত অনলাইন শিক্ষা প্ল্যাটফর্ম। ঘরে বসে শিখুন দেশসেরা শিক্ষকদের কাছ থেকে।
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-sidebar-accent flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-sidebar-accent flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Features", "Pricing", "About"].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase() === "home" ? "" : link.toLowerCase()}`}
                    className="text-sidebar-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h4 className="font-semibold mb-4">For Students</h4>
            <ul className="space-y-2">
              {["Browse Courses", "Join Live Class", "Practice Tests", "Study Notes"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sidebar-foreground/70 hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-sidebar-foreground/70">
                <Mail className="w-4 h-4" />
                support@shikkhok.io
              </li>
              <li className="flex items-center gap-3 text-sm text-sidebar-foreground/70">
                <Phone className="w-4 h-4" />
                +880 1700-000000
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sidebar-border mt-8 pt-8 text-center text-sm text-sidebar-foreground/60">
          <p>© 2024 শিক্ষক.io - All rights reserved. Made with ❤️ in Bangladesh</p>
        </div>
      </div>
    </footer>
  );
}
