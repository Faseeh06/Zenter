"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LayoutDashboard, PlaySquare, FolderDot, Briefcase, Settings, LogOut, ShieldCheck } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    SidebarInset
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type NavItem = { title: string; icon: React.ComponentType<{ className?: string }>; href: string };
const baseNavItems: NavItem[] = [
    { title: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { title: "My Videos", icon: PlaySquare, href: "/dashboard/videos" },
    { title: "My Projects", icon: FolderDot, href: "/dashboard/projects" },
    { title: "Apply as Internee", icon: Briefcase, href: "/dashboard/internee" },
    { title: "Settings", icon: Settings, href: "/dashboard/settings" },
];

function LogOutButton() {
    return (
        <SidebarMenuButton
            asChild
            className="w-full justify-between hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
        >
            <Link href="/login" className="flex items-center gap-3" onClick={async (e) => {
                e.preventDefault();
                const supabase = createSupabaseBrowserClient();
                await supabase.auth.signOut();
                window.location.href = "/login";
            }}>
                <span className="flex items-center gap-3">
                    <LogOut className="w-4 h-4" />
                    <span>Log out</span>
                </span>
            </Link>
        </SidebarMenuButton>
    );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [profile, setProfile] = useState<{ full_name: string | null; avatar_url: string | null; role: string | null } | null>(null);

    useEffect(() => {
        const supabase = createSupabaseBrowserClient();
        const load = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            const { data: p } = await supabase.from("profiles").select("full_name, avatar_url, role").eq("id", user.id).single();
            setProfile(p ?? { full_name: user.email?.split("@")[0] ?? "User", avatar_url: null, role: null });
        };
        load();
    }, []);

    const navItems: NavItem[] = profile?.role === "admin"
        ? [...baseNavItems, { title: "Admin", icon: ShieldCheck, href: "/dashboard/admin/applications" }]
        : baseNavItems;

    const displayName = profile?.full_name?.trim() || "User";
    const initials = displayName.split(/\s+/).map((n) => n[0]).slice(0, 2).join("").toUpperCase() || "U";

    return (
        <SidebarProvider>
            <div className="flex h-screen bg-background w-full">
                {/* Sidebar */}
                <Sidebar className="border-r border-foreground/10 bg-background/50 backdrop-blur-md">
                    <SidebarHeader className="p-6">
                        <Link href="/" className="flex items-center gap-3">
                            <Image
                                src="/Logo/Light.png"
                                alt="Zenter Logo"
                                width={80}
                                height={28}
                                className="object-contain"
                            />
                            <span className="font-sans font-semibold tracking-[0.35em] text-[color:#2596be] text-xs uppercase leading-none">
                                ZENTER
                            </span>
                        </Link>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50 mb-2">
                                Menu
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {navItems.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={pathname === item.href}
                                                className={`group transition-all duration-300 relative overflow-hidden ${pathname === item.href
                                                    ? "bg-foreground/5 text-foreground hover:bg-foreground/10"
                                                    : "hover:bg-foreground/5 text-muted-foreground hover:text-foreground"
                                                    }`}
                                            >
                                                                <Link href={item.href} className="flex items-center gap-3 relative z-10 w-full py-1">
                                                    {pathname === item.href && (
                                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-foreground rounded-r-full -ml-2" />
                                                    )}
                                                    <item.icon className={`w-4 h-4 transition-colors ${pathname === item.href ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`} />
                                                    <span className={`font-medium ${pathname === item.href ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter className="p-4 border-t border-foreground/10">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <LogOutButton />
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>

                {/* Main Content Area */}
                <SidebarInset className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
                    {/* Top Navbar */}
                    <header className="h-[72px] border-b border-foreground/10 bg-background/50 backdrop-blur-xl flex items-center justify-between px-6 shrink-0 z-20 sticky top-0 transition-all">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all w-9 h-9" />
                            <div className="h-4 w-px bg-foreground/10" />
                            <h1 className="font-display text-xl tracking-tight hidden sm:block">
                                {navItems.find(i => i.href === pathname)?.title || "Dashboard"}
                            </h1>
                        </div>

                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium leading-none">{displayName}</p>
                                <p className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground mt-1">Free Tier</p>
                            </div>
                            <Avatar className="h-10 w-10 border-2 border-foreground/10 cursor-pointer hover:border-foreground/30 transition-colors shadow-sm">
                                <AvatarImage src={profile?.avatar_url ?? ""} alt="User avatar" />
                                <AvatarFallback className="bg-gradient-to-br from-foreground/10 to-foreground/5 font-display text-foreground">{initials}</AvatarFallback>
                            </Avatar>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="flex-1 overflow-y-auto p-6 lg:p-10 noise-overlay">
                        {children}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
