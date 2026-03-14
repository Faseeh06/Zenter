-- Profiles (auto-created on signup via trigger)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  role text default 'student',
  bio text,
  created_at timestamptz default now()
);

-- Videos
create table if not exists public.videos (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  video_url text not null,
  thumbnail_url text,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- Video Progress
create table if not exists public.video_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id),
  video_id uuid references public.videos(id),
  status text default 'not_started',
  watched_duration int default 0,
  updated_at timestamptz default now()
);

-- Internee Applications
create table if not exists public.internee_applications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id),
  skills text,
  portfolio_url text,
  message text,
  status text default 'pending',
  created_at timestamptz default now()
);

-- Projects
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id),
  title text not null,
  description text,
  live_url text,
  github_url text,
  thumbnail_url text,
  created_at timestamptz default now()
);
