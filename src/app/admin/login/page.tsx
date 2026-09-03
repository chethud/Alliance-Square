import { Suspense } from "react";
import { Logo } from "@/components/ui/Logo";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-[minmax(280px,42%)_1fr]">
      <section className="relative hidden overflow-hidden bg-navy-deep px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(at 20% 10%, rgba(0,169,232,0.35) 0px, transparent 50%), radial-gradient(at 90% 90%, rgba(196,169,98,0.18) 0px, transparent 46%)",
          }}
        />
        <Logo variant="light" className="relative" />
        <div className="relative max-w-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-cyan">
            Alliance Square
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight">
            Content
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Edit Insights, testimonials, layouts, homepage stats, and the hero video.
          </p>
        </div>
        <p className="relative text-xs text-white/40">For Alliance Square editors only.</p>
      </section>

      <section className="flex items-center justify-center px-5 py-16">
        <div className="w-full max-w-sm">
          <div className="lg:hidden">
            <Logo />
          </div>
          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-cyan lg:mt-0">
            Sign in
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">Open the CMS</h2>
          <p className="mt-2 text-sm text-cool-gray">Enter the editor password to continue.</p>
          <Suspense>
            <AdminLoginForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
