import { Navbar } from "@/components/layout/Navbar";
import { SafeWheelsBranding } from "@/components/layout/SafeWheelsBranding";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <SafeWheelsBranding />
      <Footer />
      <FloatingActions />
    </>
  );
}
