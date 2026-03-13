"use client";

import { useState } from "react";
import { Loader2, User, Key, Bell, Shield, UploadCloud, Github, Twitter, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setSuccessMsg(null);

        // Mock network request
        setTimeout(() => {
            setIsLoading(false);
            setSuccessMsg("Settings saved successfully.");
            setTimeout(() => setSuccessMsg(null), 3000);
        }, 1200);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto pb-10">
            {/* Header section */}
            <div>
                <h1 className="text-3xl md:text-4xl font-display tracking-tight mb-2">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account settings, profile information, and preferences.
                </p>
            </div>

            <Tabs defaultValue="profile" className="space-y-8">
                <TabsList className="bg-background/50 border border-foreground/10 p-1 w-full flex flex-wrap h-auto justify-start sticky top-0 z-20 backdrop-blur-md pb-0 pt-0">
                    <TabsTrigger value="profile" className="font-mono text-xs uppercase tracking-widest px-4 py-3 h-auto data-[state=active]:bg-foreground/5 data-[state=active]:shadow-none rounded-sm">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                    </TabsTrigger>
                    <TabsTrigger value="account" className="font-mono text-xs uppercase tracking-widest px-4 py-3 h-auto data-[state=active]:bg-foreground/5 data-[state=active]:shadow-none rounded-sm">
                        <Shield className="w-4 h-4 mr-2" />
                        Account
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="font-mono text-xs uppercase tracking-widest px-4 py-3 h-auto data-[state=active]:bg-foreground/5 data-[state=active]:shadow-none rounded-sm">
                        <Bell className="w-4 h-4 mr-2" />
                        Notifications
                    </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-8 focus-visible:outline-none focus-visible:ring-0">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 border-b border-l border-foreground/5 pointer-events-none bg-foreground/[0.02]" />

                        <div className="space-y-8 relative z-10">
                            <div className="flex items-center gap-6 pb-8 border-b border-foreground/10">
                                <Avatar className="w-24 h-24 border-2 border-foreground/10">
                                    <AvatarImage src="" />
                                    <AvatarFallback className="text-2xl font-display bg-foreground/5">JD</AvatarFallback>
                                </Avatar>
                                <div className="space-y-3">
                                    <h3 className="font-display text-xl tracking-tight">Profile Picture</h3>
                                    <div className="flex flex-wrap gap-3">
                                        <Button type="button" variant="outline" className="h-10 rounded-full border-foreground/20 hover:bg-foreground/5 font-mono text-xs">
                                            <UploadCloud className="w-4 h-4 mr-2" />
                                            Upload New
                                        </Button>
                                        <Button type="button" variant="ghost" className="h-10 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive font-mono text-xs">
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label htmlFor="firstName" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">First Name</Label>
                                    <Input
                                        id="firstName"
                                        defaultValue="John"
                                        required
                                        className="bg-transparent border-foreground/20 h-14 rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="lastName" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        defaultValue="Doe"
                                        required
                                        className="bg-transparent border-foreground/20 h-14 rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="emailUpdate" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Public Email</Label>
                                <Input
                                    id="emailUpdate"
                                    type="email"
                                    defaultValue="demo@zenter.com"
                                    className="bg-transparent border-foreground/20 h-14 rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground"
                                />
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="bio" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Short Bio</Label>
                                <Textarea
                                    id="bio"
                                    defaultValue="Full-stack developer passionate about building excellent software that improves the lives of those around me."
                                    className="bg-transparent border-foreground/20 min-h-[120px] rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground resize-y"
                                />
                                <p className="text-xs text-muted-foreground">Brief description for your showcase portfolio. HTML is not allowed.</p>
                            </div>

                            <div className="space-y-6 pt-6 border-t border-foreground/10">
                                <h3 className="font-display text-xl tracking-tight">Social Links</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded bg-foreground/5 flex items-center justify-center shrink-0 border border-foreground/10">
                                            <ExternalLink className="w-5 h-5 text-muted-foreground" />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <Input
                                                placeholder="https://yoursite.com"
                                                className="bg-transparent border-foreground/20 h-10 rounded-sm focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground w-full font-mono text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded bg-foreground/5 flex items-center justify-center shrink-0 border border-foreground/10">
                                            <Github className="w-5 h-5 text-muted-foreground" />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <Input
                                                placeholder="https://github.com/username"
                                                defaultValue="https://github.com/johndoe"
                                                className="bg-transparent border-foreground/20 h-10 rounded-sm focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground w-full font-mono text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded bg-foreground/5 flex items-center justify-center shrink-0 border border-foreground/10">
                                            <Linkedin className="w-5 h-5 text-muted-foreground" />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <Input
                                                placeholder="https://linkedin.com/in/username"
                                                className="bg-transparent border-foreground/20 h-10 rounded-sm focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground w-full font-mono text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between border-t border-foreground/10 gap-4">
                                <div className="text-sm font-mono text-green-500 h-5">
                                    {successMsg && successMsg}
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full sm:w-auto h-12 rounded-full px-8 bg-foreground text-background hover:bg-foreground/90 font-mono text-sm"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving changes...
                                        </>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                </TabsContent>

                {/* Account Tab */}
                <TabsContent value="account" className="space-y-8 focus-visible:outline-none focus-visible:ring-0">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-md relative overflow-hidden">
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-display text-xl tracking-tight mb-2">Password</h3>
                                <p className="text-sm text-muted-foreground">Update the password associated with this account.</p>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="currentPassword" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Current Password</Label>
                                <Input
                                    id="currentPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    className="bg-transparent border-foreground/20 h-14 rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label htmlFor="newPassword" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">New Password</Label>
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        className="bg-transparent border-foreground/20 h-14 rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground"
                                    />
                                    <p className="text-xs text-muted-foreground">Minimum 8 characters.</p>
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="confirmNewPassword" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Confirm New Password</Label>
                                    <Input
                                        id="confirmNewPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        className="bg-transparent border-foreground/20 h-14 rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 pb-8 border-b border-foreground/10">
                                <Button
                                    type="button"
                                    className="h-10 rounded-full px-6 bg-foreground text-background hover:bg-foreground/90 font-mono text-xs"
                                >
                                    Update Password
                                </Button>
                            </div>

                            <div>
                                <h3 className="font-display text-xl tracking-tight text-destructive mb-2">Danger Zone</h3>
                                <p className="text-sm text-muted-foreground mb-4">Permanently delete your account and all of your content.</p>
                                <Button type="button" variant="outline" className="h-10 border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive font-mono text-xs">
                                    Delete Account
                                </Button>
                            </div>
                        </div>
                    </form>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="space-y-8 focus-visible:outline-none focus-visible:ring-0">
                    <div className="p-6 md:p-8 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-md relative overflow-hidden">
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-display text-xl tracking-tight mb-2">Email Notifications</h3>
                                <p className="text-sm text-muted-foreground">Choose what we can send to your inbox.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="space-y-0.5">
                                        <Label className="text-base font-display">Platform Updates</Label>
                                        <p className="text-sm text-muted-foreground">Receive news about the latest platform features.</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="flex items-center justify-between gap-4">
                                    <div className="space-y-0.5">
                                        <Label className="text-base font-display">Tips & Tutorials</Label>
                                        <p className="text-sm text-muted-foreground">Advice on getting the most out of your learning journey.</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="flex items-center justify-between gap-4">
                                    <div className="space-y-0.5">
                                        <Label className="text-base font-display">Internship Alerts</Label>
                                        <p className="text-sm text-muted-foreground">Notifications about your application status changes.</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-foreground/10 flex justify-end">
                                <Button
                                    type="button"
                                    className="h-12 rounded-full px-8 bg-foreground text-background hover:bg-foreground/90 font-mono text-sm"
                                >
                                    Save Preferences
                                </Button>
                            </div>
                        </div>
                    </div>
                </TabsContent>

            </Tabs>
        </div>
    );
}
