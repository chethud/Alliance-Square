"use client";

import { useState, FormEvent } from "react";

interface SiteVisitFormProps {
  projectName?: string;
}

export function SiteVisitForm({ projectName }: SiteVisitFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="surface-card border-brand-cyan/30 text-center">
        <p className="text-lg font-semibold text-charcoal">Site visit request received!</p>
        <p className="mt-2 text-cool-gray">We&apos;ll confirm your appointment shortly.</p>
      </div>
    );
  }

  return (
    <form id="site-visit" onSubmit={handleSubmit} className="surface-card space-y-4">
      <h3 className="text-2xl font-bold text-charcoal">Schedule a Site Visit</h3>
      {projectName && <p className="text-sm text-cool-gray">Project: {projectName}</p>}
      <input id="sv-name" name="name" required placeholder="Name *" className="input-field" />
      <input id="sv-phone" name="phone" type="tel" required placeholder="Phone *" className="input-field" />
      <input id="sv-date" name="date" type="date" className="input-field" />
      <textarea
        id="sv-message"
        name="message"
        rows={3}
        placeholder="Message"
        className="input-field resize-none"
      />
      <button type="submit" className="btn-primary w-full">
        Schedule Visit
      </button>
    </form>
  );
}
