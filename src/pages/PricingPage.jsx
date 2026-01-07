import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CheckCircle, X } from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "Perfect for trying out the platform",
    price: { monthly: 0, yearly: 0 },
    features: [
      { text: "1 Batch", included: true },
      { text: "5 Students per batch", included: true },
      { text: "Live classes (limited)", included: true },
      { text: "Basic notes", included: true },
      { text: "MCQ tests", included: false },
      { text: "Recorded classes", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    description: "For individual teachers and tutors",
    price: { monthly: 999, yearly: 9999 },
    features: [
      { text: "5 Batches", included: true },
      { text: "50 Students per batch", included: true },
      { text: "Unlimited live classes", included: true },
      { text: "Advanced notes with PDF", included: true },
      { text: "MCQ tests", included: true },
      { text: "Recorded classes", included: true },
      { text: "Priority support", included: false },
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Institute",
    description: "For coaching centers and institutions",
    price: { monthly: 4999, yearly: 49999 },
    features: [
      { text: "Unlimited Batches", included: true },
      { text: "Unlimited Students", included: true },
      { text: "Unlimited live classes", included: true },
      { text: "Advanced notes with PDF", included: true },
      { text: "MCQ tests", included: true },
      { text: "Recorded classes", included: true },
      { text: "Priority support", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const faqs = [
  {
    question: "Can I try before buying?",
    answer:
      "Yes! We offer a 14-day free trial on all paid plans. No credit card required.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept bKash, Nagad, Rocket, and all major bank cards. You can also pay via bank transfer for yearly plans.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Absolutely! You can change your plan at any time. The difference will be prorated.",
  },
  {
    question: "Is there a discount for yearly plans?",
    answer:
      "Yes, you save approximately 2 months when you pay yearly instead of monthly.",
  },
  {
    question: "Do you offer discounts for educational institutions?",
    answer:
      "Yes, we offer special pricing for schools, colleges, and universities. Contact our sales team for more details.",
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
        <div className="section-container text-center">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your teaching needs. All plans include
            core features with no hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-1.5 bg-secondary rounded-xl">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !isYearly
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isYearly
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-success/20 text-success px-2 py-0.5 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative card-elevated p-8 ${
                  plan.popular ? "ring-2 ring-primary" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-display font-bold text-foreground">
                      ৳{isYearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    <span className="text-muted-foreground">
                      /{isYearly ? "year" : "month"}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature.text}
                      className="flex items-center gap-3 text-sm"
                    >
                      {feature.included ? (
                        <CheckCircle className="w-5 h-5 text-success shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground shrink-0" />
                      )}
                      <span
                        className={
                          feature.included
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/register"
                  className={`w-full inline-flex items-center justify-center py-3 rounded-xl font-medium transition-all ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "border-2 border-border text-foreground hover:bg-secondary"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary/50">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Have questions? We've got answers.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="card-elevated p-6">
                <h3 className="font-semibold text-foreground mb-2">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="section-container text-center">
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-4">
            Still Have Questions?
          </h2>
          <p className="text-muted-foreground mb-8">
            Our team is here to help you choose the right plan.
          </p>
          <a
            href="mailto:support@shikkhok.io"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            Contact Sales
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
