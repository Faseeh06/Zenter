import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type ProfileRow = {
  id: string;
  full_name: string | null;
  role: string | null;
  created_at: string | null;
};

type ApplicationRow = {
  user_id: string;
  status: string | null;
  created_at: string | null;
};

export default async function AdminUsersPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, role, created_at")
    .order("created_at", { ascending: false });

  const { data: applications } = await supabase
    .from("internee_applications")
    .select("user_id, status, created_at")
    .order("created_at", { ascending: false });

  const appByUser = new Map<string, ApplicationRow>();
  for (const app of (applications ?? []) as ApplicationRow[]) {
    if (!appByUser.has(app.user_id)) {
      appByUser.set(app.user_id, app);
    }
  }

  const rows = (profiles ?? []).map((p: ProfileRow) => {
    const app = appByUser.get(p.id);
    return {
      id: p.id,
      name: p.full_name ?? "—",
      role: p.role ?? "student",
      created_at: p.created_at ? new Date(p.created_at).toLocaleDateString() : "—",
      application: app ? (app.status ?? "pending") : "not_applied",
    };
  });

  const appliedCount = rows.filter((r) => r.application !== "not_applied").length;
  const notAppliedCount = rows.length - appliedCount;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto flex flex-col h-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display tracking-tight mb-2">Users</h1>
          <p className="text-muted-foreground">All users and internship application status.</p>
        </div>
        <div className="flex gap-2 text-sm font-mono text-muted-foreground">
          <span className="px-3 border-r border-foreground/10">Total: {rows.length}</span>
          <span className="px-3 border-r border-foreground/10">Applied: {appliedCount}</span>
          <span className="px-3">Not applied: {notAppliedCount}</span>
        </div>
      </div>

      <div className="overflow-x-auto border border-foreground/10 rounded-xl bg-background/50">
        <table className="w-full text-sm text-left align-middle">
          <thead className="text-xs uppercase bg-foreground/[0.02] border-b border-foreground/10 text-muted-foreground font-mono">
            <tr>
              <th className="px-6 py-4 font-medium tracking-widest">Name</th>
              <th className="px-6 py-4 font-medium tracking-widest">Role</th>
              <th className="px-6 py-4 font-medium tracking-widest">Joined</th>
              <th className="px-6 py-4 font-medium tracking-widest">Application</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground/5 bg-background/20 backdrop-blur-sm">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-foreground/[0.02] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">{row.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-muted-foreground capitalize">{row.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-muted-foreground font-mono text-xs">{row.created_at}</td>
                <td className="px-6 py-4 whitespace-nowrap text-muted-foreground capitalize">
                  {row.application.replace("_", " ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

