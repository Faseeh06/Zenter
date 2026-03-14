-- Enable RLS
alter table public.profiles               enable row level security;
alter table public.videos                 enable row level security;
alter table public.video_progress         enable row level security;
alter table public.internee_applications  enable row level security;
alter table public.projects               enable row level security;

-- PROFILES: user can see/update own profile
create policy "Profiles are viewable by owner"
on public.profiles
for select
using (auth.uid() = id);

create policy "Profiles are updatable by owner"
on public.profiles
for update
using (auth.uid() = id);

-- VIDEOS: everyone logged-in can read; creators can insert
create policy "Videos are viewable by authenticated users"
on public.videos
for select
using (auth.role() = 'authenticated');

create policy "Videos can be created by authenticated users"
on public.videos
for insert
with check (auth.uid() = created_by);

-- VIDEO PROGRESS: user can manage their own rows
create policy "Video progress viewable by owner"
on public.video_progress
for select
using (auth.uid() = user_id);

create policy "Video progress insert by owner"
on public.video_progress
for insert
with check (auth.uid() = user_id);

create policy "Video progress update by owner"
on public.video_progress
for update
using (auth.uid() = user_id);

-- INTERNEE APPLICATIONS: user only sees/creates own applications
create policy "Internee applications viewable by owner"
on public.internee_applications
for select
using (auth.uid() = user_id);

create policy "Internee applications insert by owner"
on public.internee_applications
for insert
with check (auth.uid() = user_id);

-- PROJECTS: users manage their own projects
create policy "Projects viewable by owner"
on public.projects
for select
using (auth.uid() = user_id);

create policy "Projects insert by owner"
on public.projects
for insert
with check (auth.uid() = user_id);

create policy "Projects update by owner"
on public.projects
for update
using (auth.uid() = user_id);

create policy "Projects delete by owner"
on public.projects
for delete
using (auth.uid() = user_id);
