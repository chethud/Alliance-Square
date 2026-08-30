import Image from "next/image";
import Link from "next/link";
import { brandLogo } from "@/data/images";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label="Alliance Square Properties - Home"
    >
      <Image
        src={brandLogo}
        alt="Alliance Square Property Management & Consultants"
        width={220}
        height={56}
        className="h-9 w-auto md:h-10"
        priority
      />
    </Link>
  );
}
