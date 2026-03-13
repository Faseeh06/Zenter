"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, PlaySquare, FolderDot, Briefcase, Settings, LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";

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
import { Separator } from "@/components/ui/separator";

const navItems = [
    { title: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { title: "My Videos", icon: PlaySquare, href: "/dashboard/videos" },
    { title: "My Projects", icon: FolderDot, href: "/dashboard/projects" },
    { title: "Apply as Internee", icon: Briefcase, href: "/dashboard/internee" },
    { title: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <SidebarProvider>
            <div className="flex h-screen bg-background w-full">
                {/* Sidebar */}
                <Sidebar className="border-r border-foreground/10 bg-background/50 backdrop-blur-md">
                    <SidebarHeader className="p-6">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-xl font-display tracking-tight">Zenter</span>
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
                                                className={`group transition-all ${pathname === item.href
                                                        ? "bg-foreground text-background hover:bg-foreground/90 hover:text-background"
                                                        : "hover:bg-foreground/5 text-muted-foreground hover:text-foreground"
                                                    }`}
                                            >
                                                <Link href={item.href} className="flex items-center gap-3">
                                                    <item.icon className={`w-4 h-4 ${pathname === item.href ? "text-background" : "text-muted-foreground group-hover:text-foreground"}`} />
                                                    <span>{item.title}</span>
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
                                <SidebarMenuButton
                                    asChild
                                    className="w-full justify-between hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                                >
                                    <Link href="/login" className="flex items-center gap-3">
                                        <span className="flex items-center gap-3">
                                            <LogOut className="w-4 h-4" />
                                            <span>Log out</span>
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>

                {/* Main Content Area */}
                <SidebarInset className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
                    {/* Top Navbar */}
                    <header className="h-16 border-b border-foreground/10 bg-background/50 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-10">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all" />
                            <div className="h-4 w-px bg-foreground/10" />
                            <h1 className="font-display text-lg hidden sm:block">
                                {navItems.find(i => i.href === pathname)?.title || "Dashboard"}
                            </h1>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium leading-none">John Doe</p>
                                <p className="text-xs font-mono text-muted-foreground mt-1">demo@zenter.com</p>
                            </div>
                            <Avatar className="h-9 w-9 border border-foreground/10">
                                <AvatarImage src="" alt="User avatar" />
                                <AvatarFallback className="bg-foreground/5 font-display">JD</AvatarFallback>
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
