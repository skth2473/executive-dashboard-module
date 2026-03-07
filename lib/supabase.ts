import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabaseKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Client-side Supabase instance
export const supabase = createClient(supabaseUrl, supabaseKey);

// Server-side Supabase instance with service role
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseKey);

// Initialize database tables
export async function initializeDatabase() {
  try {
    console.log('[v0] Initializing database tables...');

    // Create users table if not exists
    await supabaseAdmin.rpc('exec_sql', {
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
      `
    }).catch(err => {
      if (!err.message.includes('already exists')) throw err;
    });

    // Create academic_updates table
    await supabaseAdmin.rpc('exec_sql', {
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
      `
    }).catch(err => {
      if (!err.message.includes('already exists')) throw err;
    });

    // Create research_projects table
    await supabaseAdmin.rpc('exec_sql', {
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
      `
    }).catch(err => {
      if (!err.message.includes('already exists')) throw err;
    });

    // Create events table
    await supabaseAdmin.rpc('exec_sql', {
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
      `
    }).catch(err => {
      if (!err.message.includes('already exists')) throw err;
    });

    console.log('[v0] Database tables initialized successfully');
    return true;
  } catch (error) {
    console.error('[v0] Database initialization error:', error);
    return false;
  }
}
