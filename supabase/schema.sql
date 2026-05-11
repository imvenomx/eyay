-- Eey Aay — Supabase schema
-- Run this once in your Supabase project SQL editor (or via `supabase db push`).
-- The app uses the service-role key from server-side routes only, so RLS stays ON
-- and we do not grant access to anon / authenticated roles.

-- ============================================================
-- Contacts (form submissions)
-- ============================================================
create table if not exists public.contacts (
    id          uuid primary key default gen_random_uuid(),
    name        text not null check (char_length(name) between 2 and 120),
    email       text not null check (char_length(email) between 3 and 200),
    company     text check (company is null or char_length(company) <= 200),
    message     text not null check (char_length(message) between 10 and 4000),
    created_at  timestamptz not null default now()
);

create index if not exists contacts_created_at_idx on public.contacts (created_at desc);
create index if not exists contacts_email_idx on public.contacts (lower(email));

alter table public.contacts enable row level security;

-- No public policies. Only the service-role key (used server-side) can read/write.

-- ============================================================
-- Newsletter subscribers
-- ============================================================
create table if not exists public.newsletter_subscribers (
    id          uuid primary key default gen_random_uuid(),
    email       text not null unique check (char_length(email) between 3 and 200),
    created_at  timestamptz not null default now()
);

create index if not exists newsletter_created_at_idx on public.newsletter_subscribers (created_at desc);

alter table public.newsletter_subscribers enable row level security;

-- No public policies. Server-side service-role key only.

-- ============================================================
-- Blog posts
-- ============================================================
do $$ begin
    create type public.post_category as enum ('ai', 'automation', 'growth', 'case-study');
exception when duplicate_object then null;
end $$;

create table if not exists public.posts (
    id            uuid primary key default gen_random_uuid(),
    slug          text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) between 3 and 120),
    title         text not null check (char_length(title) between 3 and 200),
    excerpt       text not null check (char_length(excerpt) between 10 and 400),
    body          text not null check (char_length(body) >= 1),
    category      public.post_category not null default 'ai',
    author        text not null default 'Eey Aay',
    cover_image   text,
    published     boolean not null default false,
    published_at  timestamptz,
    created_at    timestamptz not null default now(),
    updated_at    timestamptz not null default now()
);

create index if not exists posts_published_idx on public.posts (published, published_at desc);
create index if not exists posts_slug_idx on public.posts (slug);
create index if not exists posts_category_idx on public.posts (category, published_at desc) where published = true;

-- Auto-bump updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
    new.updated_at = now();
    return new;
end $$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at before update on public.posts
    for each row execute function public.set_updated_at();

alter table public.posts enable row level security;

-- No public policies. The public /blog routes read via the server-side service-role key.

-- ============================================================
-- Case studies
-- ============================================================
create table if not exists public.case_studies (
    id            uuid primary key default gen_random_uuid(),
    slug          text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) between 3 and 120),
    title         text not null check (char_length(title) between 3 and 200),
    client        text not null check (char_length(client) between 1 and 120),
    industry      text not null check (char_length(industry) between 1 and 120),
    excerpt       text not null check (char_length(excerpt) between 10 and 400),
    body          text not null check (char_length(body) >= 1),
    category      public.post_category not null default 'case-study',
    cover_image   text,
    client_logo   text,
    metrics       jsonb not null default '[]'::jsonb,
    published     boolean not null default false,
    published_at  timestamptz,
    created_at    timestamptz not null default now(),
    updated_at    timestamptz not null default now()
);

create index if not exists case_studies_published_idx on public.case_studies (published, published_at desc);
create index if not exists case_studies_slug_idx on public.case_studies (slug);

drop trigger if exists case_studies_set_updated_at on public.case_studies;
create trigger case_studies_set_updated_at before update on public.case_studies
    for each row execute function public.set_updated_at();

alter table public.case_studies enable row level security;

-- No public policies. Server-side service-role key only.
