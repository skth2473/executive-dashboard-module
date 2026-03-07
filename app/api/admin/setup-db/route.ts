import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: Request) {
  try {
    console.log('[v0] Starting database setup...');

    // Create users table
    const { error: usersError } = await supabase.rpc('exec_sql', {
      sql: `
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
        
        ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Users can view own data" ON public.users
          FOR SELECT USING (auth.uid() = id);
        
        CREATE POLICY "Users can update own data" ON public.users
          FOR UPDATE USING (auth.uid() = id);
      `
    });

    if (usersError && !usersError.message.includes('already exists')) {
      console.error('[v0] Users table error:', usersError);
      return NextResponse.json({ error: usersError.message }, { status: 400 });
    }

    console.log('[v0] Users table created successfully');

    // Create academic_updates table
    const { error: academicError } = await supabase.rpc('exec_sql', {
      sql: `
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
        
        ALTER TABLE public.academic_updates ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "HODs can view own department updates" ON public.academic_updates
          FOR SELECT USING (
            hod_id = auth.uid() OR 
            EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
          );
      `
    });

    if (academicError && !academicError.message.includes('already exists')) {
      console.error('[v0] Academic updates table error:', academicError);
      return NextResponse.json({ error: academicError.message }, { status: 400 });
    }

    console.log('[v0] Academic updates table created successfully');

    // Create research_projects table
    const { error: researchError } = await supabase.rpc('exec_sql', {
      sql: `
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
        
        ALTER TABLE public.research_projects ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "HODs can view own research" ON public.research_projects
          FOR SELECT USING (
            hod_id = auth.uid() OR 
            supervisor_id = auth.uid() OR
            EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
          );
      `
    });

    if (researchError && !researchError.message.includes('already exists')) {
      console.error('[v0] Research projects table error:', researchError);
      return NextResponse.json({ error: researchError.message }, { status: 400 });
    }

    console.log('[v0] Research projects table created successfully');

    // Create research_updates table
    const { error: researchUpdatesError } = await supabase.rpc('exec_sql', {
      sql: `
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
        
        ALTER TABLE public.research_updates ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Supervisors can view updates" ON public.research_updates
          FOR SELECT USING (
            supervisor_id = auth.uid() OR
            EXISTS (SELECT 1 FROM public.research_projects WHERE id = project_id AND hod_id = auth.uid())
          );
      `
    });

    if (researchUpdatesError && !researchUpdatesError.message.includes('already exists')) {
      console.error('[v0] Research updates table error:', researchUpdatesError);
      return NextResponse.json({ error: researchUpdatesError.message }, { status: 400 });
    }

    console.log('[v0] Research updates table created successfully');

    // Create events table
    const { error: eventsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.events (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          hod_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
          department TEXT NOT NULL,
          event_title TEXT NOT NULL,
          event_date DATE NOT NULL,
          description TEXT,
          budget DECIMAL(12,2),
          budget_spent DECIMAL(12,2) DEFAULT 0,
          participants_count INTEGER,
          outcome TEXT,
          coordinator_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
          status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed', 'cancelled')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        
        ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "HODs can view own events" ON public.events
          FOR SELECT USING (
            hod_id = auth.uid() OR 
            coordinator_id = auth.uid() OR
            EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
          );
      `
    });

    if (eventsError && !eventsError.message.includes('already exists')) {
      console.error('[v0] Events table error:', eventsError);
      return NextResponse.json({ error: eventsError.message }, { status: 400 });
    }

    console.log('[v0] Events table created successfully');

    // Create departments table
    const { error: departmentsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.departments (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name TEXT NOT NULL UNIQUE,
          institute TEXT NOT NULL,
          stream TEXT,
          hod_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
          student_count INTEGER DEFAULT 0,
          faculty_count INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        
        ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
      `
    });

    if (departmentsError && !departmentsError.message.includes('already exists')) {
      console.error('[v0] Departments table error:', departmentsError);
      return NextResponse.json({ error: departmentsError.message }, { status: 400 });
    }

    console.log('[v0] Departments table created successfully');

    return NextResponse.json(
      { message: 'Database setup completed successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[v0] Database setup error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Database setup failed' },
      { status: 500 }
    );
  }
}
