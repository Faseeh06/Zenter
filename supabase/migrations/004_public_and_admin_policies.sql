-- Profiles: allow anyone to read full_name (for showcase "by Author")
create policy "Profiles full_name is public"
on public.profiles
for select
using (true);

-- Projects: allow anyone to read (for public /showcase page)
create policy "Projects are viewable by everyone"
on public.projects
for select
using (true);

-- Internee applications: admins can view and update all
create policy "Admins can view all internee applications"
on public.internee_applications
for select
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid() and profiles.role = 'admin'
  )
);

create policy "Admins can update internee application status"
on public.internee_applications
for update
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid() and profiles.role = 'admin'
  )
);
