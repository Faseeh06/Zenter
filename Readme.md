# Zenter — Step-by-Step Build Plan

> A full-stack web app built with **Next.js 14 (App Router)** + **Supabase**.
> Follow each step in order. Each step builds cleanly on the previous one.

---

## Step 1 — Customize the Template (Branding & Content)

```
I have an existing Next.js template. Rename and rebrand it to "Zenter".
Update the following:
- Replace the app name everywhere with "Zenter"
- Update the landing page hero section: headline should be "Learn. Build. Showcase.",
  subheadline: "Your all-in-one platform for video learning, internships, and project showcasing."
- Update the navbar: logo text "Zenter", links: Home, Videos, Showcase, Apply as Internee, Login, Sign Up
- Update the footer with the Zenter brand name and basic links
- Update metadata in layout.tsx (title, description)
- Keep all existing styling/structure, just swap content
```

---

## Step 2 — Supabase Setup + Auth Config

```
Set up Supabase in this Next.js 14 App Router project:
- Install @supabase/supabase-js and @supabase/ssr
- Create /lib/supabase/client.ts (browser client)
- Create /lib/supabase/server.ts (server client using cookies)
- Create /lib/supabase/middleware.ts and wire it into middleware.ts
  to protect /dashboard and all routes under it
- Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local
- Create the following tables in Supabase with RLS enabled:

  profiles (id uuid references auth.users, full_name text, avatar_url text, role text default 'student', bio text, created_at timestamptz)
  videos (id uuid, title text, description text, video_url text, thumbnail_url text, created_by uuid, created_at timestamptz)
  video_progress (id uuid, user_id uuid, video_id uuid, status text, watched_duration int, updated_at timestamptz)
  internee_applications (id uuid, user_id uuid, skills text, portfolio_url text, message text, status text default 'pending', created_at timestamptz)
  projects (id uuid, user_id uuid, title text, description text, live_url text, github_url text, thumbnail_url text, created_at timestamptz)

- Add a trigger to auto-create a profile row when a new user signs up
```

---

## Step 3 — Sign Up & Login Pages

```
Create Sign Up and Login pages in this Next.js 14 + Supabase project using App Router.

Sign Up page at /signup:
- Fields: Full Name, Email, Password, Confirm Password
- On submit: call supabase.auth.signUp(), then redirect to /dashboard
- Show inline validation errors
- Link to login page at bottom

Login page at /login:
- Fields: Email, Password
- On submit: call supabase.auth.signInWithPassword(), redirect to /dashboard
- Show error if credentials are wrong
- "Forgot password?" link (placeholder for now)
- Link to signup page at bottom

Both pages:
- Clean centered card layout
- Use shadcn/ui form components (Input, Button, Label)
- Show loading state on submit button
- If user is already logged in, redirect to /dashboard
```

---

## Step 4 — Dashboard Layout & Overview

```
Create a protected /dashboard route in Next.js 14 App Router with Supabase auth.

Dashboard layout (/dashboard/layout.tsx):
- Sidebar with links: Overview, My Videos, My Projects, Apply as Internee, Settings
- Top navbar showing user avatar and name (fetched from profiles table)
- Mobile responsive: sidebar collapses to a hamburger menu
- If user is not logged in, redirect to /login

Dashboard overview page (/dashboard/page.tsx):
- Welcome message: "Welcome back, [Full Name]"
- Stats cards: Total Videos Watched, Projects Submitted, Internee Application Status
- Recent video progress section (last 3 videos with progress bar)
- Quick action buttons: Add Project, Browse Videos, Apply as Internee
- Fetch all data server-side from Supabase
```

---

## Step 5 — Video Lectures Feature

```
Build the video lectures feature in /dashboard/videos using Next.js 14 + Supabase.

Videos list page (/dashboard/videos/page.tsx):
- Grid of video cards showing thumbnail, title, description, progress badge (Not Started / In Progress / Completed)
- Fetch videos from the videos table, join with video_progress for current user
- Search bar to filter videos by title

Video detail page (/dashboard/videos/[id]/page.tsx):
- Embed video player (use an iframe or <video> tag based on video_url)
- Show title and description
- "Mark as Complete" button that updates video_progress table
- Progress status displayed below the player

Add Video page (/dashboard/videos/add) — for admin/internee role only:
- Form: Title, Description, Video URL, Thumbnail URL
- On submit: insert into videos table with created_by = current user id
- Show success message and redirect to videos list
```

---

## Step 6 — Project Showcase Feature

```
Build the project showcase feature in Next.js 14 + Supabase.

Public showcase page (/showcase):
- Grid of all submitted projects (thumbnail, title, description, live link, GitHub link)
- Filter by user (optional)
- No auth required to view

Dashboard projects page (/dashboard/projects):
- Show only the current user's projects
- Edit and Delete buttons on each card
- "Add Project" button linking to the form

Add/Edit Project form (/dashboard/projects/new and /dashboard/projects/[id]/edit):
- Fields: Title, Description, Live URL, GitHub URL, Thumbnail URL
- Insert or update the projects table on submit
- Redirect back to /dashboard/projects on success
```

---

## Step 7 — Internee Application Feature

```
Build the internee application feature in Next.js 14 + Supabase.

Application form at /dashboard/internee:
- Fields: Skills (textarea), Portfolio URL, Message to team
- On submit: insert into internee_applications with user_id and status = 'pending'
- If user already has an application, show its current status instead of the form
  (Pending / Accepted / Rejected) with a nice status badge

Admin view at /dashboard/admin/applications (role = 'admin' only):
- Table of all applications with columns: Name, Skills, Portfolio, Message, Status, Actions
- Approve / Reject buttons that update the status field in Supabase
- Redirect non-admins away from this route
```

---

## Supabase SQL Schema (Quick Reference)

```sql
-- Profiles (auto-created on signup via trigger)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  role text default 'student',
  bio text,
  created_at timestamptz default now()
);

-- Videos
create table videos (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  video_url text not null,
  thumbnail_url text,
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

-- Video Progress
create table video_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id),
  video_id uuid references videos(id),
  status text default 'not_started',
  watched_duration int default 0,
  updated_at timestamptz default now()
);

-- Internee Applications
create table internee_applications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id),
  skills text,
  portfolio_url text,
  message text,
  status text default 'pending',
  created_at timestamptz default now()
);

-- Projects
create table projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id),
  title text not null,
  description text,
  live_url text,
  github_url text,
  thumbnail_url text,
  created_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

---

## File Structure (Final)

```
zenter/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── videos/
│   │   │   ├── page.tsx
│   │   │   ├── add/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/edit/page.tsx
│   │   ├── internee/page.tsx
│   │   └── admin/
│   │       └── applications/page.tsx
│   ├── showcase/page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── supabase/
│       ├── client.ts
│       ├── server.ts
│       └── middleware.ts
├── components/
│   ├── navbar.tsx
│   ├── sidebar.tsx
│   ├── footer.tsx
│   └── ui/         ← shadcn components
├── middleware.ts
└── .env.local
```

---

*Build step by step. Ship Zenter. 🚀*