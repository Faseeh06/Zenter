-- Add course column for grouping/filtering videos
alter table public.videos
  add column if not exists course text;

