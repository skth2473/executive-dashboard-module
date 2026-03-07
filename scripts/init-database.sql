-- LAH Dashboard Database Schema
-- This script creates all necessary tables for the LAH Cluster Management System

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table (extends Supabase auth)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  institute TEXT NOT NULL,
  department TEXT,
  stream TEXT,
  role TEXT NOT NULL DEFAULT 'faculty' CHECK (role IN ('admin', 'hod', 'faculty', 'staff', 'supervisor', 'coordinator')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Academic Updates Table (Weekly submissions by section)
CREATE TABLE IF NOT EXISTS public.academic_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hod_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  department TEXT NOT NULL,
  academic_year TEXT NOT NULL,
  week_number INTEGER NOT NULL,
  year_level TEXT NOT NULL CHECK (year_level IN ('Year 1', 'Year 2', 'Year 3')),
  curriculum_progress TEXT,
  attendance_rate DECIMAL(5,2),
  assessment_summary TEXT,
  challenges_faced TEXT,
  next_week_plan TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'under_review', 'approved')),
  submitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(hod_id, department, academic_year, week_number, year_level)
);

-- Research Projects Table
CREATE TABLE IF NOT EXISTS public.research_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hod_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  department TEXT NOT NULL,
  project_title TEXT NOT NULL,
  project_type TEXT NOT NULL CHECK (project_type IN ('PhD', 'Research Initiative')),
  description TEXT,
  start_date DATE NOT NULL,
  expected_end_date DATE,
  budget DECIMAL(12,2),
  budget_spent DECIMAL(12,2) DEFAULT 0,
  scholar_name TEXT,
  scholar_email TEXT,
  supervisor_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'ongoing' CHECK (status IN ('ongoing', 'completed', 'paused', 'cancelled')),
  publications_count INTEGER DEFAULT 0,
  papers_submitted TEXT[],
  last_update TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Research Project Updates (Weekly updates from supervisors)
CREATE TABLE IF NOT EXISTS public.research_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.research_projects(id) ON DELETE CASCADE,
  supervisor_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  week_number INTEGER NOT NULL,
  progress_description TEXT,
  milestones_achieved TEXT,
  issues_faced TEXT,
  publications_added TEXT[],
  budget_utilization DECIMAL(12,2),
  next_steps TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(project_id, week_number)
);

-- Events Table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hod_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  coordinator_id UUID NOT NULL REFERENCES public.users(id) ON DELETE SET NULL,
  department TEXT NOT NULL,
  event_name TEXT NOT NULL,
  event_type TEXT,
  brief_description TEXT,
  detailed_description TEXT,
  event_date DATE,
  event_time TIME,
  location TEXT,
  expected_participants INTEGER,
  actual_participants INTEGER,
  budget DECIMAL(12,2),
  budget_spent DECIMAL(12,2),
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed', 'cancelled')),
  outcomes TEXT,
  photos_urls TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Event Coordinators Table (mapping coordinators to departments)
CREATE TABLE IF NOT EXISTS public.event_coordinators (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  department TEXT NOT NULL,
  coordinator_type TEXT NOT NULL CHECK (coordinator_type IN ('primary', 'secondary')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, department, coordinator_type)
);

-- Department Information Table
CREATE TABLE IF NOT EXISTS public.departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  institute TEXT NOT NULL,
  stream TEXT,
  hod_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  student_count INTEGER DEFAULT 0,
  faculty_count INTEGER DEFAULT 0,
  spoc_name TEXT,
  spoc_designation TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Programs Table (B.A, M.A, Ph.D etc.)
CREATE TABLE IF NOT EXISTS public.programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  department_id UUID NOT NULL REFERENCES public.departments(id) ON DELETE CASCADE,
  program_name TEXT NOT NULL,
  degree_type TEXT NOT NULL CHECK (degree_type IN ('B.A', 'M.A', 'Ph.D', 'B.Sc', 'M.Sc', 'B.Design', 'M.Design')),
  duration_years INTEGER,
  students_enrolled INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(department_id, program_name)
);

-- Specializations Table
CREATE TABLE IF NOT EXISTS public.specializations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_id UUID NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
  specialization_name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(program_id, specialization_name)
);

-- Admin Aggregation View (for Santosh Kumar)
CREATE TABLE IF NOT EXISTS public.admin_aggregation_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  aggregation_type TEXT NOT NULL CHECK (aggregation_type IN ('academic_updates', 'research_projects', 'events', 'all')),
  week_number INTEGER,
  academic_year TEXT,
  total_submissions INTEGER,
  pending_submissions INTEGER,
  approved_submissions INTEGER,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(aggregation_type, week_number, academic_year)
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_coordinators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specializations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_aggregation_cache ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Users
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admin can view all users" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for Academic Updates
CREATE POLICY "HOD can view own department updates" ON public.academic_updates
  FOR SELECT USING (
    hod_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "HOD can insert own updates" ON public.academic_updates
  FOR INSERT WITH CHECK (hod_id = auth.uid());

CREATE POLICY "HOD can update own updates" ON public.academic_updates
  FOR UPDATE USING (hod_id = auth.uid());

-- RLS Policies for Research Projects
CREATE POLICY "HOD and supervisors can view research projects" ON public.research_projects
  FOR SELECT USING (
    hod_id = auth.uid() OR
    supervisor_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "HOD can insert research projects" ON public.research_projects
  FOR INSERT WITH CHECK (hod_id = auth.uid());

CREATE POLICY "HOD can update research projects" ON public.research_projects
  FOR UPDATE USING (hod_id = auth.uid());

-- RLS Policies for Events
CREATE POLICY "Users can view events from their department" ON public.events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND department = events.department
    ) OR
    EXISTS (
      SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "HOD can insert events" ON public.events
  FOR INSERT WITH CHECK (hod_id = auth.uid());

CREATE POLICY "Coordinator can update events" ON public.events
  FOR UPDATE USING (
    coordinator_id = auth.uid() OR
    hod_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- RLS Policies for Departments
CREATE POLICY "Anyone can view departments" ON public.departments
  FOR SELECT USING (true);

-- Create indexes for performance
CREATE INDEX idx_academic_updates_hod_id ON public.academic_updates(hod_id);
CREATE INDEX idx_academic_updates_department ON public.academic_updates(department);
CREATE INDEX idx_academic_updates_week ON public.academic_updates(week_number);
CREATE INDEX idx_research_projects_hod_id ON public.research_projects(hod_id);
CREATE INDEX idx_research_projects_supervisor_id ON public.research_projects(supervisor_id);
CREATE INDEX idx_research_updates_project_id ON public.research_updates(project_id);
CREATE INDEX idx_events_hod_id ON public.events(hod_id);
CREATE INDEX idx_events_coordinator_id ON public.events(coordinator_id);
CREATE INDEX idx_events_department ON public.events(department);
CREATE INDEX idx_departments_hod_id ON public.departments(hod_id);
CREATE INDEX idx_programs_department_id ON public.programs(department_id);
CREATE INDEX idx_specializations_program_id ON public.specializations(program_id);
