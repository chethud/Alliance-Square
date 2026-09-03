import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const inputClass =
  "mt-1.5 w-full border border-light-gray bg-white px-3 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-brand-cyan";
export const labelClass = "block text-[11px] font-semibold uppercase tracking-[0.14em] text-cool-gray";

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}

export function ImageField({
  label,
  value,
  onPathChange,
  onFile,
}: {
  label: string;
  value: string;
  onPathChange: (value: string) => void;
  onFile: (file: File) => void;
}) {
  return (
    <div>
      <span className={labelClass}>{label}</span>
      <div className="mt-1.5 flex flex-col gap-3 sm:flex-row">
        <div className="h-28 w-full shrink-0 overflow-hidden border border-light-gray bg-elevated sm:w-40">
          {value ? (
            // Preview paths come from the CMS upload API.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center px-3 text-center text-[11px] uppercase tracking-[0.12em] text-cool-gray">
              No image
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <input className={`${inputClass} mt-0`} value={value} onChange={(event) => onPathChange(event.target.value)} />
          <input
            type="file"
            accept="image/*"
            className="mt-2 block w-full text-sm text-cool-gray file:mr-3 file:border-0 file:bg-charcoal file:px-3 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:tracking-[0.12em] file:text-white"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) onFile(file);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function ItemList({
  heading,
  count,
  addLabel,
  onAdd,
  children,
}: {
  heading: string;
  count: number;
  addLabel: string;
  onAdd: () => void;
  children: ReactNode;
}) {
  return (
    <div className="flex max-h-[40vh] min-h-0 w-full flex-col border-b border-light-gray bg-white lg:max-h-none lg:w-[300px] lg:shrink-0 lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between gap-3 border-b border-light-gray px-4 py-3">
        <p className="text-sm font-semibold text-charcoal">
          {heading}
          <span className="ml-2 font-normal text-cool-gray">{count}</span>
        </p>
        <button
          type="button"
          onClick={onAdd}
          className="text-[12px] font-semibold uppercase tracking-[0.12em] text-brand-cyan hover:text-deep-blue"
        >
          {addLabel}
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}

export function ListRow({
  selected,
  title,
  meta,
  onClick,
}: {
  selected: boolean;
  title: string;
  meta?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full border-l-2 px-4 py-3.5 text-left transition-colors",
        selected
          ? "border-brand-cyan bg-brand-cyan/[0.07]"
          : "border-transparent hover:bg-off-white"
      )}
    >
      <span className="line-clamp-2 block text-sm font-semibold text-charcoal">{title}</span>
      {meta ? (
        <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-cool-gray">
          {meta}
        </span>
      ) : null}
    </button>
  );
}

export function EditorPane({
  title,
  note,
  children,
  footer,
}: {
  title: string;
  note?: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-off-white">
      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 lg:px-10 lg:py-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-charcoal">{title}</h2>
          {note ? <p className="mt-1.5 text-sm text-cool-gray">{note}</p> : null}
          <div className="mt-8 space-y-5">{children}</div>
        </div>
      </div>
      <div className="border-t border-light-gray bg-white px-5 py-3 lg:px-10">{footer}</div>
    </div>
  );
}

export function SaveRow({
  saving,
  saveLabel,
  onSave,
  dangerLabel,
  onDanger,
}: {
  saving: boolean;
  saveLabel: string;
  onSave: () => void;
  dangerLabel?: string;
  onDanger?: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-x-5 gap-y-2">
      <button
        type="button"
        className="bg-brand-cyan px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-deep-blue disabled:opacity-60"
        disabled={saving}
        onClick={onSave}
      >
        {saving ? "Saving…" : saveLabel}
      </button>
      {dangerLabel && onDanger ? (
        <button type="button" className="text-sm text-cool-gray hover:text-red-600" onClick={onDanger}>
          {dangerLabel}
        </button>
      ) : null}
    </div>
  );
}
