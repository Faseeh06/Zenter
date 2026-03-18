-- Restrict video creation to admins only
drop policy if exists "Videos can be created by authenticated users" on public.videos;

create policy "Videos can be created by admins"
on public.videos
for insert
with check (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid() and profiles.role = 'admin'
  )
);

