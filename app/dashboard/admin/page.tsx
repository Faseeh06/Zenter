import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminHomePage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl md:text-4xl font-display tracking-tight mb-2">Admin Panel</h1>
        <p className="text-muted-foreground">Manage applications and users.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/dashboard/admin/applications" className="border border-foreground/10 rounded-xl p-6 hover:border-foreground/30 transition-colors bg-background/50">
          <h2 className="text-xl font-display mb-2">Internee Applications</h2>
          <p className="text-sm text-muted-foreground">Review, approve, or reject internship applications.</p>
        </Link>
        <Link href="/dashboard/admin/users" className="border border-foreground/10 rounded-xl p-6 hover:border-foreground/30 transition-colors bg-background/50">
          <h2 className="text-xl font-display mb-2">Users</h2>
          <p className="text-sm text-muted-foreground">View all users and application status.</p>
        </Link>
      </div>
    </div>
  );
}

