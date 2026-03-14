"use client";

import { useState, useEffect } from "react";
import { Loader2, User, Key, Bell, Shield, Github, Linkedin, ExternalLink, Paintbrush, Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function SettingsPage() {
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [linkedinUrl, setLinkedinUrl] = useState("");

    const [notifPlatform, setNotifPlatform] = useState(true);
    const [notifTips, setNotifTips] = useState(true);
    const [notifInternship, setNotifInternship] = useState(true);

    const [isSavingAccount, setIsSavingAccount] = useState(false);
    const [isSavingNotif, setIsSavingNotif] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const NOTIF_KEYS = { platform: "zenter_notif_platform", tips: "zenter_notif_tips", internship: "zenter_notif_internship" };

    useEffect(() => {
        setMounted(true);
        const loadProfile = async () => {
            const supabase = createSupabaseBrowserClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            setEmail(user.email ?? "");
            const { data: profile } = await supabase.from("profiles").select("full_name, bio, avatar_url, website_url, github_url, linkedin_url").eq("id", user.id).single();
            if (profile) {
                setFullName(profile.full_name ?? "");
                setBio(profile.bio ?? "");
                setAvatarUrl(profile.avatar_url ?? "");
                setWebsiteUrl((profile as { website_url?: string }).website_url ?? "");
                setGithubUrl((profile as { github_url?: string }).github_url ?? "");
                setLinkedinUrl((profile as { linkedin_url?: string }).linkedin_url ?? "");
            }
        };
        loadProfile();
    }, []);

    useEffect(() => {
        if (!mounted) return;
        try {
            setNotifPlatform(localStorage.getItem(NOTIF_KEYS.platform) !== "false");
            setNotifTips(localStorage.getItem(NOTIF_KEYS.tips) !== "false");
            setNotifInternship(localStorage.getItem(NOTIF_KEYS.internship) !== "false");
        } catch (_) {}
    }, [mounted]);

    const initials = fullName
        ? fullName
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((n) => n[0]?.toUpperCase())
            .join("")
        : "U";

    const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSavingProfile(true);
        setSuccessMsg(null);

        const supabase = createSupabaseBrowserClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            setIsSavingProfile(false);
            return;
        }

        const { error } = await supabase.from("profiles").update({
            full_name: fullName,
            bio,
            avatar_url: avatarUrl || null,
            website_url: websiteUrl?.trim() || null,
            github_url: githubUrl?.trim() || null,
            linkedin_url: linkedinUrl?.trim() || null,
        }).eq("id", user.id);

        setIsSavingProfile(false);
        if (error) {
            setErrorMsg(error.message);
            return;
        }
        setSuccessMsg("Profile saved successfully.");
        setErrorMsg(null);
        setTimeout(() => setSuccessMsg(null), 3000);
    };

    const handleAccountSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMsg(null);
        setSuccessMsg(null);
        const form = e.currentTarget;
        const newPassword = (form.querySelector("#newPassword") as HTMLInputElement)?.value;
        const confirmNewPassword = (form.querySelector("#confirmNewPassword") as HTMLInputElement)?.value;
        if (!newPassword || newPassword.length < 6) {
            setErrorMsg("New password must be at least 6 characters.");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setErrorMsg("New password and confirmation do not match.");
            return;
        }
        setIsSavingAccount(true);
        const supabase = createSupabaseBrowserClient();
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        setIsSavingAccount(false);
        if (error) {
            setErrorMsg(error.message);
            return;
        }
        setSuccessMsg("Password updated successfully.");
        (form.querySelector("#currentPassword") as HTMLInputElement).value = "";
        (form.querySelector("#newPassword") as HTMLInputElement).value = "";
        (form.querySelector("#confirmNewPassword") as HTMLInputElement).value = "";
        setTimeout(() => setSuccessMsg(null), 3000);
    };

    const handleSaveNotifications = () => {
        try {
            localStorage.setItem(NOTIF_KEYS.platform, String(notifPlatform));
            localStorage.setItem(NOTIF_KEYS.tips, String(notifTips));
            localStorage.setItem(NOTIF_KEYS.internship, String(notifInternship));
            setIsSavingNotif(true);
            setSuccessMsg("Notification preferences saved.");
            setTimeout(() => { setSuccessMsg(null); setIsSavingNotif(false); }, 3000);
        } catch (_) {
            setErrorMsg("Could not save preferences.");
        }
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
                    <TabsTrigger value="appearance" className="font-mono text-xs uppercase tracking-widest px-4 py-3 h-auto data-[state=active]:bg-foreground/5 data-[state=active]:shadow-none rounded-sm">
                        <Paintbrush className="w-4 h-4 mr-2" />
                        Appearance
                    </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-8 focus-visible:outline-none focus-visible:ring-0">
                    <form onSubmit={handleProfileSubmit} className="p-6 md:p-8 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 border-b border-l border-foreground/5 pointer-events-none bg-foreground/[0.02]" />

                        <div className="space-y-8 relative z-10">
                            <div className="flex items-center gap-6 pb-8 border-b border-foreground/10">
                                <Avatar className="w-24 h-24 border-2 border-foreground/10 shrink-0">
                                    <AvatarImage src={avatarUrl || undefined} alt="Profile" />
                                    <AvatarFallback className="text-2xl font-display bg-foreground/5">{initials}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-3 flex-1 min-w-0">
                                    <h3 className="font-display text-xl tracking-tight">Profile Picture</h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="avatarUrl" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Image URL</Label>
                                        <Input
                                            id="avatarUrl"
                                            type="url"
                                            placeholder="https://example.com/your-photo.jpg"
                                            value={avatarUrl}
                                            onChange={(e) => setAvatarUrl(e.target.value)}
                                            className="bg-transparent border-foreground/20 h-10 rounded-none font-mono text-sm"
                                        />
                                        <div className="flex flex-wrap gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                className="h-8 rounded-full border-foreground/20 hover:bg-foreground/5 font-mono text-xs"
                                                onClick={() => setAvatarUrl("")}
                                            >
                                                Remove photo
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label htmlFor="fullName" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Full Name</Label>
                                    <Input
                                        id="fullName"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                        className="bg-transparent border-foreground/20 h-14 rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="emailUpdate" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Account Email</Label>
                                <Input
                                    id="emailUpdate"
                                    type="email"
                                    value={email}
                                    disabled
                                    className="bg-transparent border-foreground/20 h-14 rounded-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground"
                                />
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="bio" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Short Bio</Label>
                                <Textarea
                                    id="bio"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
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
                                                value={websiteUrl}
                                                onChange={(e) => setWebsiteUrl(e.target.value)}
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
                                                value={githubUrl}
                                                onChange={(e) => setGithubUrl(e.target.value)}
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
                                                value={linkedinUrl}
                                                onChange={(e) => setLinkedinUrl(e.target.value)}
                                                className="bg-transparent border-foreground/20 h-10 rounded-sm focus-visible:ring-1 focus-visible:ring-foreground focus-visible:border-foreground w-full font-mono text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between border-t border-foreground/10 gap-4">
                                <div className="flex flex-col gap-1 min-w-0">
                                    {successMsg && <span className="text-sm font-mono text-green-500">{successMsg}</span>}
                                    {errorMsg && <span className="text-sm font-mono text-destructive">{errorMsg}</span>}
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isSavingProfile}
                                    className="w-full sm:w-auto h-12 rounded-full px-8 bg-foreground text-background hover:bg-foreground/90 font-mono text-sm"
                                >
                                    {isSavingProfile ? (
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
                    <form onSubmit={handleAccountSubmit} className="p-6 md:p-8 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-md relative overflow-hidden">
                        <div className="space-y-8">
                            {(successMsg || errorMsg) && (
                                <div className="text-sm font-mono">
                                    {successMsg && <span className="text-green-500">{successMsg}</span>}
                                    {errorMsg && <span className="text-destructive">{errorMsg}</span>}
                                </div>
                            )}
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
                                    type="submit"
                                    disabled={isSavingAccount}
                                    className="h-10 rounded-full px-6 bg-foreground text-background hover:bg-foreground/90 font-mono text-xs"
                                >
                                    {isSavingAccount ? (
                                        <>
                                            <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                                            Updating...
                                        </>
                                    ) : (
                                        "Update Password"
                                    )}
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
                                    <Switch checked={notifPlatform} onCheckedChange={setNotifPlatform} />
                                </div>

                                <div className="flex items-center justify-between gap-4">
                                    <div className="space-y-0.5">
                                        <Label className="text-base font-display">Tips & Tutorials</Label>
                                        <p className="text-sm text-muted-foreground">Advice on getting the most out of your learning journey.</p>
                                    </div>
                                    <Switch checked={notifTips} onCheckedChange={setNotifTips} />
                                </div>

                                <div className="flex items-center justify-between gap-4">
                                    <div className="space-y-0.5">
                                        <Label className="text-base font-display">Internship Alerts</Label>
                                        <p className="text-sm text-muted-foreground">Notifications about your application status changes.</p>
                                    </div>
                                    <Switch checked={notifInternship} onCheckedChange={setNotifInternship} />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-foreground/10 flex justify-end items-center gap-4">
                                {successMsg && <span className="text-sm font-mono text-green-500">{successMsg}</span>}
                                <Button
                                    type="button"
                                    disabled={isSavingNotif}
                                    onClick={handleSaveNotifications}
                                    className="h-12 rounded-full px-8 bg-foreground text-background hover:bg-foreground/90 font-mono text-sm"
                                >
                                    {isSavingNotif ? "Saved" : "Save Preferences"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* Appearance Tab */}
                <TabsContent value="appearance" className="space-y-8 focus-visible:outline-none focus-visible:ring-0">
                    <div className="p-6 md:p-8 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-md relative overflow-hidden">
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-display text-xl tracking-tight mb-2">Appearance</h3>
                                <p className="text-sm text-muted-foreground">Customize how Zenter looks on your device.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <Label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Theme Preference</Label>
                                    {mounted && (
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                                            <button
                                                type="button"
                                                onClick={() => setTheme("light")}
                                                className={`flex flex-col items-center justify-center p-6 border rounded-xl gap-4 transition-all ${theme === 'light' ? 'border-foreground bg-foreground/5 relative overflow-hidden shadow-sm' : 'border-foreground/10 hover:border-foreground/30 hover:bg-foreground/2'}`}
                                            >
                                                {theme === 'light' && <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-foreground" />}
                                                <Sun className={`w-8 h-8 ${theme === 'light' ? 'text-foreground' : 'text-muted-foreground'}`} />
                                                <span className={`font-medium text-sm ${theme === 'light' ? 'text-foreground' : 'text-muted-foreground'}`}>Light Mode</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => setTheme("dark")}
                                                className={`flex flex-col items-center justify-center p-6 border rounded-xl gap-4 transition-all ${theme === 'dark' ? 'border-foreground bg-foreground/5 relative overflow-hidden shadow-sm' : 'border-foreground/10 hover:border-foreground/30 hover:bg-foreground/2'}`}
                                            >
                                                {theme === 'dark' && <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-foreground" />}
                                                <Moon className={`w-8 h-8 ${theme === 'dark' ? 'text-foreground' : 'text-muted-foreground'}`} />
                                                <span className={`font-medium text-sm ${theme === 'dark' ? 'text-foreground' : 'text-muted-foreground'}`}>Dark Mode</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => setTheme("system")}
                                                className={`flex flex-col items-center justify-center p-6 border rounded-xl gap-4 transition-all ${theme === 'system' ? 'border-foreground bg-foreground/5 relative overflow-hidden shadow-sm' : 'border-foreground/10 hover:border-foreground/30 hover:bg-foreground/2'}`}
                                            >
                                                {theme === 'system' && <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-foreground" />}
                                                <Monitor className={`w-8 h-8 ${theme === 'system' ? 'text-foreground' : 'text-muted-foreground'}`} />
                                                <span className={`font-medium text-sm ${theme === 'system' ? 'text-foreground' : 'text-muted-foreground'}`}>System Sync</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

            </Tabs>
        </div>
    );
}
