import Image from "next/image";
import Link from "next/link";
import { brandLogo, brandLogoLight } from "@/data/images";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
}

export function Logo({ className, variant = "default" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label="Alliance Square Properties - Home"
    >
      <Image
        src={variant === "light" ? brandLogoLight : brandLogo}
        alt="Alliance Square Property Management & Consultants"
        width={220}
        height={56}
        className={cn("h-9 w-auto md:h-10")}
        priority
      />
    </Link>
  );
}
