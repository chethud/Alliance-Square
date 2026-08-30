import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { contact } from "@/data/company";
export function ContactAddressPanel() {
  return (
    <aside className="w-full self-start lg:sticky lg:top-28">
      <div className="surface-card space-y-10">
        <div>
          <h2 className="text-xl font-bold text-charcoal">Sales office</h2>
          <div className="mt-5 space-y-3 text-sm text-cool-gray">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" aria-hidden="true" />
              <span>
                {contact.salesOffice.address.map((line, i) => (
                  <span key={line}>
                    {line}
                    {i < contact.salesOffice.address.length - 1 && <br />}
                  </span>
                ))}
              </span>
            </p>
            <p className="flex gap-3">
              <Phone className="h-4 w-4 shrink-0 text-brand-cyan" aria-hidden="true" />
              <span>
                <a href={`tel:${contact.salesOffice.phone.replace(/-/g, "")}`} className="hover:text-brand-cyan">
                  {contact.salesOffice.phone}
                </a>
                {" / "}
                <a href={`tel:${contact.mobile[1]}`} className="hover:text-brand-cyan">
                  {contact.mobile[1]}
                </a>
              </span>
            </p>
            <p className="flex gap-3">
              <Mail className="h-4 w-4 shrink-0 text-brand-cyan" aria-hidden="true" />
              <a href={`mailto:${contact.email}`} className="hover:text-brand-cyan">
                {contact.email}
              </a>
            </p>
            <p className="flex gap-3">
              <Clock className="h-4 w-4 shrink-0 text-brand-cyan" aria-hidden="true" />
              <span>
                Office Hours: Monday to Sunday
                <br />
                10:00 AM - 7:00 PM
              </span>
            </p>
          </div>
        </div>

        <div className="divider-gradient" />

        <div>
          <h2 className="text-xl font-bold text-charcoal">Corporate office</h2>
          <div className="mt-5 space-y-3 text-sm text-cool-gray">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" aria-hidden="true" />
              <span>
                {contact.corporateOffice.address.map((line, i) => (
                  <span key={line}>
                    {line}
                    {i < contact.corporateOffice.address.length - 1 && <br />}
                  </span>
                ))}
              </span>
            </p>
            <p className="flex gap-3">
              <Phone className="h-4 w-4 shrink-0 text-brand-cyan" aria-hidden="true" />
              <a href={`tel:${contact.corporateOffice.phone.replace(/-/g, "")}`} className="hover:text-brand-cyan">
                {contact.corporateOffice.phone}
              </a>
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
