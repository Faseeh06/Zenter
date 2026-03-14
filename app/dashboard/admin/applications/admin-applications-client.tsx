"use client";

import { useRouter } from "next/navigation";
import { Search, Eye, MoreVertical, ShieldCheck, Mail, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type App = {
    id: string;
    name: string;
    skills: string;
    portfolio_url: string;
    message: string;
    status: string;
    created_at: string;
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "accepted":
            return "text-green-500 bg-green-500/10 border-green-500/20";
        case "in review":
        case "interviews":
            return "text-orange-500 bg-orange-500/10 border-orange-500/20";
        case "pending":
            return "text-blue-500 bg-blue-500/10 border-blue-500/20";
        case "rejected":
            return "text-muted-foreground bg-foreground/5 border-foreground/10";
        default:
            return "text-muted-foreground bg-foreground/5 border-foreground/10";
    }
};

export function AdminApplicationsClient({ applications }: { applications: App[] }) {
    const router = useRouter();

    const handleStatus = async (applicationId: string, newStatus: string) => {
        const supabase = createSupabaseBrowserClient();
        await supabase
            .from("internee_applications")
            .update({ status: newStatus })
            .eq("id", applicationId);
        router.refresh();
    };

    const pendingCount = applications.filter((a) => a.status === "pending").length;
    const inReviewCount = applications.filter((a) => a.status === "in_progress" || a.status === "in review").length;

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <span className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                        <ShieldCheck className="w-4 h-4 text-orange-500" />
                        Admin Only
                    </span>
                    <h1 className="text-3xl md:text-4xl font-display tracking-tight mb-2">Internee Applications</h1>
                    <p className="text-muted-foreground mb-4">
                        Review incoming internship candidates and update application status.
                    </p>
                </div>
            </div>

            <Card className="bg-background/50 border-foreground/10 rounded-xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-foreground/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-foreground/[0.02]">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name..."
                            className="pl-9 bg-background border-foreground/20 rounded-md focus-visible:ring-1 focus-visible:ring-foreground"
                        />
                    </div>
                    <div className="flex gap-2 text-sm font-mono text-muted-foreground">
                        <span className="px-3 border-r border-foreground/10">Total: {applications.length}</span>
                        <span className="px-3 border-r border-foreground/10 text-orange-500">In Review: {inReviewCount}</span>
                        <span className="px-3">Pending: {pendingCount}</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left align-middle">
                        <thead className="text-xs uppercase bg-foreground/[0.02] border-b border-foreground/10 text-muted-foreground font-mono">
                            <tr>
                                <th className="px-6 py-4 font-medium tracking-widest">Candidate</th>
                                <th className="px-6 py-4 font-medium tracking-widest">Skills / Role</th>
                                <th className="px-6 py-4 font-medium tracking-widest">Date Applied</th>
                                <th className="px-6 py-4 font-medium tracking-widest">Status</th>
                                <th className="px-6 py-4 font-medium tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-foreground/5 bg-background/20 backdrop-blur-sm">
                            {applications.map((app) => (
                                <tr key={app.id} className="hover:bg-foreground/[0.02] transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-foreground">{app.name}</div>
                                        {app.portfolio_url && (
                                            <a href={app.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-xs font-mono hover:underline">
                                                Portfolio
                                            </a>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground max-w-[200px] truncate">
                                        {app.skills}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground font-mono text-xs">
                                        {app.created_at}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-mono border capitalize ${getStatusColor(app.status)}`}>
                                            {app.status.replace("_", " ")}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-foreground/5 hover:text-foreground">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-background/80 backdrop-blur border-foreground/10 font-mono text-xs w-40">
                                                <DropdownMenuItem
                                                    className="cursor-pointer text-green-500 focus:bg-green-500/10 focus:text-green-500"
                                                    onSelect={() => handleStatus(app.id, "accepted")}
                                                >
                                                    Approve
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                                                    onSelect={() => handleStatus(app.id, "rejected")}
                                                >
                                                    Reject
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {applications.length === 0 && (
                <p className="text-center text-muted-foreground py-10">No applications yet.</p>
            )}
        </>
    );
}
