-- Allow users to create their own profile row if it doesn't exist yet
-- (e.g. if they signed up before the trigger was added)
create policy "Users can insert their own profile"
on public.profiles
for insert
with check (auth.uid() = id);
