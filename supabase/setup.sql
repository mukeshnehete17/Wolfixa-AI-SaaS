-- Supabase Setup Script for ReachIQ

-- Enable the uuid-ossp extension for generation
create extension if not exists "uuid-ossp";

-- PROFILES
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  business_name text,
  business_type text,
  industry text,
  website text,
  created_at timestamptz default now()
);

-- SEGMENTS
create table public.segments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  traits jsonb,
  platform text,
  size text,
  age_range text,
  location text,
  created_at timestamptz default now()
);

-- CAMPAIGNS
create table public.campaigns (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade not null,
  platform text not null,
  budget_spent numeric default 0,
  leads integer default 0,
  conversions integer default 0,
  date date not null,
  notes text,
  created_at timestamptz default now()
);

-- POSTS
create table public.posts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  content text,
  status text default 'draft', -- 'draft', 'published'
  post_type text, -- 'ad_copy', 'email_template', 'blog_post', 'announcement'
  created_at timestamptz default now()
);

-- INSIGHTS
create table public.insights (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade not null,
  message text not null,
  type text, -- 'Platform', 'Budget', 'Timing'
  created_at timestamptz default now()
);

-- CUSTOMER INPUTS
create table public.customer_inputs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade not null,
  business_type text,
  target_age text, -- using text to store range like '18-65'
  target_location text,
  budget numeric,
  interests text[],
  created_at timestamptz default now()
);

-- RLS POLICIES --

alter table public.profiles enable row level security;
alter table public.segments enable row level security;
alter table public.campaigns enable row level security;
alter table public.posts enable row level security;
alter table public.insights enable row level security;
alter table public.customer_inputs enable row level security;

-- Profiles: Users can view and update their own profile
create policy "Users can view own profile" 
  on public.profiles for select 
  using ( auth.uid() = id );

create policy "Users can update own profile" 
  on public.profiles for update 
  using ( auth.uid() = id );

create policy "Users can insert own profile" 
  on public.profiles for insert 
  with check ( auth.uid() = id );

-- Segments
create policy "Users can manage own segments" 
  on public.segments for all 
  using ( auth.uid() = user_id );

-- Campaigns
create policy "Users can manage own campaigns" 
  on public.campaigns for all 
  using ( auth.uid() = user_id );

-- Posts
create policy "Users can manage own posts" 
  on public.posts for all 
  using ( auth.uid() = user_id );

-- Insights
create policy "Users can manage own insights" 
  on public.insights for all 
  using ( auth.uid() = user_id );

-- Customer Inputs
create policy "Users can manage own customer inputs" 
  on public.customer_inputs for all 
  using ( auth.uid() = user_id );

-- TRIGGERS --

-- Auto-create profile when user signs up
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
