"use client";

import { useState, FormEvent } from "react";
import { FadeIn } from "@/components/ui/Motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects } from "@/data/projects";

export function LeadForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="section-spacing bg-premium-dark relative overflow-hidden" aria-labelledby="lead-form-heading">
      <div className="absolute inset-0 bg-mesh-dark opacity-50" />
      <div className="container-main relative">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <SectionHeader
            label="Get in Touch"
            title="Let's Find Your Next Address."
            description="Share your requirements and our team will guide you to the right project."
            light
          />

          <FadeIn delay={0.1}>
            {submitted ? (
              <div className="glass-card text-center">
                <p className="text-lg font-semibold text-white">Thank you for your enquiry!</p>
                <p className="mt-2 text-white/70">Our team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="surface-card space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <input id="name" name="name" required placeholder="Name *" className="input-field" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="Phone *"
                    className="input-field"
                  />
                </div>
                <input id="email" name="email" type="email" placeholder="Email" className="input-field" />
                <div className="grid gap-4 md:grid-cols-2">
                  <select id="interested" name="interested" className="input-field">
                    <option value="">Interested In</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.slug}>
                        {p.name}
                      </option>
                    ))}
                    <option value="general">General Enquiry</option>
                  </select>
                  <select id="budget" name="budget" className="input-field">
                    <option value="">Budget</option>
                    <option value="under-20">Under ₹20 Lakhs</option>
                    <option value="20-40">₹20 – 40 Lakhs</option>
                    <option value="40-60">₹40 – 60 Lakhs</option>
                    <option value="above-60">Above ₹60 Lakhs</option>
                  </select>
                </div>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Message"
                  className="input-field resize-none"
                />
                <div className="flex flex-wrap gap-4 pt-2">
                  <button type="submit" className="btn-primary">
                    Request a Callback
                  </button>
                  <a href="/contact#site-visit" className="btn-secondary">
                    Schedule a Site Visit
                  </a>
                </div>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
