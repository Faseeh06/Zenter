import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdminApplicationsClient } from "./admin-applications-client";

export default async function AdminApplicationsPage() {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "admin") {
        redirect("/dashboard");
    }

    const { data: applications } = await supabase
        .from("internee_applications")
        .select("id, user_id, skills, portfolio_url, message, status, created_at, profiles(full_name)")
        .order("created_at", { ascending: false });

    const list = (applications ?? []).map((a: {
        id: string;
        user_id: string;
        skills: string | null;
        portfolio_url: string | null;
        message: string | null;
        status: string | null;
        created_at: string | null;
        profiles: { full_name: string | null } | null;
    }) => ({
        id: a.id,
        name: a.profiles?.full_name ?? "—",
        skills: a.skills ?? "—",
        portfolio_url: a.portfolio_url ?? "",
        message: a.message ?? "",
        status: a.status ?? "pending",
        created_at: a.created_at ? new Date(a.created_at).toLocaleDateString() : "—",
    }));

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto flex flex-col h-full">
            <AdminApplicationsClient applications={list} />
        </div>
    );
}
