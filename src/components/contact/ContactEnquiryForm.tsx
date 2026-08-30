"use client";

import { useState, FormEvent } from "react";

export function ContactEnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="surface-card w-full self-start border-brand-cyan/30 text-center">
        <p className="text-lg font-semibold text-charcoal">Thank you for your message!</p>
        <p className="mt-2 text-cool-gray">Our team will contact you shortly.</p>
      </div>
    );
  }

  return (
    <div className="surface-card w-full self-start">
      <h2 className="text-3xl font-bold text-charcoal">Send us a message</h2>
      <form id="general_enquiry" onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <input
            id="customer_name"
            name="customer_name"
            type="text"
            required
            maxLength={20}
            placeholder="Your Name"
            className="input-field"
          />
          <input
            id="customer_mobile"
            name="customer_mobile"
            type="tel"
            required
            maxLength={10}
            placeholder="Your Mobile Number"
            className="input-field"
          />
        </div>
        <input
          id="customer_email"
          name="customer_email"
          type="email"
          placeholder="Your Email ID (Optional)"
          className="input-field"
        />
        <textarea
          id="customer_message"
          name="customer_message"
          required
          rows={5}
          placeholder="Message"
          className="input-field resize-none"
        />
        <label className="flex items-start gap-3 text-sm text-cool-gray">
          <input
            type="checkbox"
            name="select_callback_agree"
            value="1"
            required
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 accent-brand-cyan"
          />
          <span>I agree to receive a callback / email / messages for more updates</span>
        </label>
        <button type="submit" className="btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
