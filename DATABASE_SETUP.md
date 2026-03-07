# LAH Dashboard - Supabase Database Setup Guide

## Overview
The LAH Dashboard uses Supabase (PostgreSQL + Auth) as its backend database. This guide walks through the setup process.

## Prerequisites
- Supabase project created (https://supabase.com)
- Environment variables configured:
  - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
  - `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (for admin operations)

## Database Tables

### 1. users
Stores user profile information extending Supabase auth.

```
Columns:
- id (UUID, FK to auth.users)
- email (TEXT UNIQUE)
- name (TEXT)
- institute (TEXT)
- department (TEXT)
- stream (TEXT) - e.g., 'arts', 'design', 'media'
- role (TEXT) - admin, hod, faculty, staff, supervisor, coordinator
- created_at, updated_at (TIMESTAMP)

Row Level Security (RLS):
- Users can view their own data
- Admins can view all data
```

### 2. academic_updates
Weekly academic updates submitted by HODs for each section.

```
Columns:
- id (UUID)
- hod_id (FK to users)
- department (TEXT)
- academic_year (TEXT)
- week_number (INTEGER)
- year_level (TEXT) - Year 1, Year 2, Year 3
- curriculum_progress (TEXT)
- attendance_rate (DECIMAL)
- assessment_summary (TEXT)
- challenges_faced (TEXT)
- next_week_plan (TEXT)
- status (TEXT) - draft, submitted, under_review, approved
- submitted_at (TIMESTAMP)
- created_at, updated_at (TIMESTAMP)

Row Level Security (RLS):
- HODs can view their own department updates
- Admins can view all updates
```

### 3. research_projects
PhD and research initiatives tracked by department.

```
Columns:
- id (UUID)
- hod_id (FK to users)
- department (TEXT)
- project_title (TEXT)
- project_type (TEXT) - PhD, Research Initiative
- description (TEXT)
- start_date (DATE)
- expected_end_date (DATE)
- budget (DECIMAL)
- budget_spent (DECIMAL)
- scholar_name (TEXT)
- scholar_email (TEXT)
- supervisor_id (FK to users)
- status (TEXT) - ongoing, completed, paused, cancelled
- publications_count (INTEGER)
- papers_submitted (TEXT[])
- last_update (TEXT)
- created_at, updated_at (TIMESTAMP)

Row Level Security (RLS):
- HODs can view their own projects
- Supervisors can view their supervised projects
- Admins can view all projects
```

### 4. research_updates
Weekly updates from supervisors on research projects.

```
Columns:
- id (UUID)
- project_id (FK to research_projects)
- supervisor_id (FK to users)
- week_number (INTEGER)
- progress_description (TEXT)
- milestones_achieved (TEXT)
- issues_faced (TEXT)
- publications_added (TEXT[])
- budget_utilization (DECIMAL)
- next_steps (TEXT)
- created_at (TIMESTAMP)
- UNIQUE(project_id, week_number)

Row Level Security (RLS):
- Supervisors can view updates for their projects
- HODs can view all project updates
- Admins can view all updates
```

### 5. events
Department events managed by coordinators.

```
Columns:
- id (UUID)
- hod_id (FK to users)
- department (TEXT)
- event_title (TEXT)
- event_date (DATE)
- description (TEXT)
- budget (DECIMAL)
- budget_spent (DECIMAL)
- participants_count (INTEGER)
- outcome (TEXT)
- coordinator_id (FK to users)
- status (TEXT) - upcoming, completed, cancelled
- created_at, updated_at (TIMESTAMP)

Row Level Security (RLS):
- HODs can view their department events
- Coordinators can view their events
- Admins can view all events
```

## Setup Steps

### Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Create a new project
3. Wait for it to be provisioned
4. Get your credentials from Project Settings → API

### Step 2: Configure Environment Variables
Add these to your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Step 3: Initialize Database Tables
Two options:

**Option A: Using the Init Page (Recommended)**
1. Start your application
2. Navigate to `http://localhost:3000/init-db`
3. Click "Initialize Database"
4. Wait for confirmation
5. Delete the `/app/init-db` folder after setup

**Option B: Using Supabase Dashboard SQL Editor**
1. Go to your Supabase dashboard
2. Go to SQL Editor
3. Create a new query
4. Copy the SQL from `/scripts/init-database.sql`
5. Execute the query

### Step 4: Seed Demo Users
Demo users are automatically created when you first login. Just try logging in with:

```
Email: santosh.kumar@uilah.edu.in
Password: demo123
```

The system will automatically create all demo users on first attempt.

## Demo User Credentials

### Admin Account
- **Email:** santosh.kumar@uilah.edu.in
- **Password:** demo123
- **Role:** Admin (can view all departments)

### HOD Accounts
- **Email:** hod_arts@uilah.edu.in | **Name:** Dr. Neha Sharma
- **Email:** hod_design@uilah.edu.in | **Name:** Prof. Rajesh Gupta
- **Email:** hod_media@uilah.edu.in | **Name:** Prof. Arun Kumar
- **Email:** hod_film@uilah.edu.in | **Name:** Dr. Pooja Desai
- **Email:** hod_architecture@uilah.edu.in | **Name:** Dr. Mohit Patel

**Password for all:** demo123

## Row Level Security (RLS) Policies

All tables have RLS enabled with specific policies:

1. **Users Table**
   - SELECT: Users can view own data, admins can view all
   - UPDATE: Users can update own data

2. **Academic Updates**
   - SELECT: HODs see own updates, admins see all

3. **Research Projects**
   - SELECT: HODs see own, supervisors see assigned, admins see all

4. **Events**
   - SELECT: HODs see own, coordinators see assigned, admins see all

## Troubleshooting

### "exec_sql" function not found
The `exec_sql` RPC function may not be available. Use the SQL Editor approach instead.

### Tables already exist
If you get "already exists" errors, they can be safely ignored - the tables were created successfully.

### Permission denied errors
Ensure your `SUPABASE_SERVICE_ROLE_KEY` is set correctly in environment variables.

### Can't create auth users
Make sure your Supabase project has Auth enabled (it should be by default).

## Testing the Setup

1. Go to `http://localhost:3000/login`
2. Try logging in with `santosh.kumar@uilah.edu.in` / `demo123`
3. You should be redirected to the main dashboard
4. Navigate to different modules to verify everything works

## Next Steps

After setup:
1. Delete the `/app/init-db` page
2. Customize user data as needed
3. Configure RLS policies according to your security requirements
4. Set up automated backups in Supabase dashboard

## Support

For Supabase issues, refer to:
- https://supabase.com/docs
- https://supabase.com/docs/guides/auth
- https://supabase.com/docs/guides/database
