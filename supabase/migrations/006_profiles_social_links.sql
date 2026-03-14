-- Add optional social link columns to profiles for settings page
alter table public.profiles
  add column if not exists website_url text,
  add column if not exists github_url text,
  add column if not exists linkedin_url text;
