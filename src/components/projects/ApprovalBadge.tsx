import type { ApprovalType } from "@/types";

interface ApprovalBadgeProps {
  approvals: ApprovalType[];
}

export function ApprovalBadge({ approvals }: ApprovalBadgeProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {approvals.map((approval) => (
        <span key={approval} className="badge">
          {approval} Approved
        </span>
      ))}
    </div>
  );
}
