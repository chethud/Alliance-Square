import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { isAdminSession } from "@/lib/cms/auth";
import { loadCmsContent } from "@/lib/cms/content";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminSession())) {
    redirect("/admin/login");
  }

  const initial = await loadCmsContent();
  return <AdminDashboard initial={initial} />;
}
