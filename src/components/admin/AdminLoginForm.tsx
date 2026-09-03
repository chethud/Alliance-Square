"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setPending(false);
    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error || "Could not sign in.");
      return;
    }
    router.push(searchParams.get("from") || "/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4">
      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-cool-gray">
          Password
        </span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full border border-light-gray bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-cyan"
          autoComplete="current-password"
          required
        />
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        className="w-full bg-brand-cyan px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-deep-blue disabled:opacity-60"
        disabled={pending}
      >
        {pending ? "Signing in…" : "Continue"}
      </button>
    </form>
  );
}
