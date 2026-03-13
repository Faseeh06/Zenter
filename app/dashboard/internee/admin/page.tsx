"use client";

import { Search, Eye, MoreVertical, ShieldCheck, Mail, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const mockApplications = [
    {
        id: "ap_1",
        name: "John Doe",
        email: "john@zenter.com",
        role: "Frontend Developer Intern",
        appliedDate: "Today",
        status: "In Review",
    },
    {
        id: "ap_2",
        name: "Alice Chen",
        email: "alice@zenter.com",
        role: "UI/UX Design Intern",
        appliedDate: "Oct 24, 2025",
        status: "Pending",
    },
    {
        id: "ap_3",
        name: "Marcus Johnson",
        email: "marcus@example.com",
        role: "Backend Developer Intern",
        appliedDate: "Oct 22, 2025",
        status: "Interviews",
    },
    {
        id: "ap_4",
        name: "Elena Rodriguez",
        email: "elena@example.com",
        role: "Full-Stack Developer Intern",
        appliedDate: "Oct 20, 2025",
        status: "Accepted",
    },
    {
        id: "ap_5",
        name: "David Kim",
        email: "david@example.com",
        role: "Frontend Developer Intern",
        appliedDate: "Oct 18, 2025",
        status: "Rejected",
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "Accepted":
            return "text-green-500 bg-green-500/10 border-green-500/20";
        case "In Review":
        case "Interviews":
            return "text-orange-500 bg-orange-500/10 border-orange-500/20";
        case "Pending":
            return "text-blue-500 bg-blue-500/10 border-blue-500/20";
        case "Rejected":
            return "text-muted-foreground bg-foreground/5 border-foreground/10";
        default:
            return "text-muted-foreground bg-foreground/5 border-foreground/10";
    }
};

export default function AdminInterneePage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto flex flex-col h-full">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <span className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
                        <ShieldCheck className="w-4 h-4 text-orange-500" />
                        Admin Only
                    </span>
                    <h1 className="text-3xl md:text-4xl font-display tracking-tight mb-2">Internee Applications</h1>
                    <p className="text-muted-foreground mb-4">
                        Review incoming internship candidates, modify application status, and dispatch messaging.
                    </p>
                </div>
            </div>

            <Card className="bg-background/50 border-foreground/10 rounded-xl overflow-hidden flex flex-col">
                {/* Top bar controls */}
                <div className="p-4 border-b border-foreground/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-foreground/[0.02]">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name or email..."
                            className="pl-9 bg-background border-foreground/20 rounded-md focus-visible:ring-1 focus-visible:ring-foreground"
                        />
                    </div>
                    <div className="flex gap-2 text-sm font-mono text-muted-foreground">
                        <span className="px-3 border-r border-foreground/10">Total: 5</span>
                        <span className="px-3 border-r border-foreground/10 text-orange-500">In Review: 2</span>
                        <span className="px-3">Pending: 1</span>
                    </div>
                </div>

                {/* Desktop Data Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left align-middle">
                        <thead className="text-xs uppercase bg-foreground/[0.02] border-b border-foreground/10 text-muted-foreground font-mono">
                            <tr>
                                <th className="px-6 py-4 font-medium tracking-widest">Candidate</th>
                                <th className="px-6 py-4 font-medium tracking-widest">Target Role</th>
                                <th className="px-6 py-4 font-medium tracking-widest">Date Applied</th>
                                <th className="px-6 py-4 font-medium tracking-widest">Status</th>
                                <th className="px-6 py-4 font-medium tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-foreground/5 bg-background/20 backdrop-blur-sm">
                            {mockApplications.map((app) => (
                                <tr key={app.id} className="hover:bg-foreground/[0.02] transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-foreground">{app.name}</div>
                                        <div className="text-muted-foreground text-xs font-mono">{app.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                                        {app.role}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground font-mono text-xs">
                                        {app.appliedDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-mono border ${getStatusColor(app.status)}`}>
                                            {app.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Mail className="h-4 w-4" />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Eye className="h-4 w-4" />
                                            </Button>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-foreground/5 hover:text-foreground">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-background/80 backdrop-blur border-foreground/10 font-mono text-xs w-40">
                                                    <DropdownMenuItem className="cursor-pointer hover:bg-foreground/5 focus:bg-foreground/5">
                                                        <ArrowUpRight className="mr-2 h-3 w-3" /> Update Status
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer text-green-500 focus:bg-green-500/10 focus:text-green-500">
                                                        Approve
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
                                                        Reject
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

        </div>
    );
}
