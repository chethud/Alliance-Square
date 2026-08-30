import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/Motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { apartments } from "@/data/apartments";

export function ApartmentListing() {
  return (
    <section className="section-spacing bg-white" aria-labelledby="apartments-heading">
      <div className="container-main">
        <SectionHeader
          label="Apartments"
          title="Apartment Listing"
          description="Explore premium apartments for sale in Mysuru from Alliance Square Properties."
        />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {apartments.map((apt, index) => (
            <FadeIn key={apt.id} delay={index * 0.1}>
              <Link href="/contact" className="premium-card group block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={apt.heroImage}
                    alt={apt.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
                  <span className="badge absolute left-5 top-5 bg-white/90 text-charcoal">Sale</span>
                </div>
                <div className="p-7">
                  <h3 className="text-3xl font-bold text-charcoal">{apt.name}</h3>
                  <p className="mt-2 text-xl font-bold text-charcoal">{apt.priceLabel}</p>
                  <p className="mt-2 text-sm text-cool-gray">{apt.tagline}</p>
                  <span className="link-arrow mt-5">Enquire Now →</span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
