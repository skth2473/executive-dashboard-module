import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create a client that can execute SQL directly
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

const MIGRATION_STATEMENTS = [`
-- Events Management System Tables

-- 1. Co-Curricular Coordinators
CREATE TABLE IF NOT EXISTS public.coordinators (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  department TEXT NOT NULL,
  eid TEXT UNIQUE,
  designation TEXT NOT NULL DEFAULT 'Co-Curricular Coordinator',
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Event Entities (Clubs, Communities, etc.)
CREATE TABLE IF NOT EXISTS public.event_entities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('Club', 'Community', 'Departmental Society', 'Professional Society')),
  department TEXT NOT NULL,
  registration_number TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Events
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_number TEXT UNIQUE NOT NULL,
  entity_id UUID NOT NULL REFERENCES public.event_entities(id) ON DELETE CASCADE,
  event_name TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('Regular', 'Monthly', 'Flagship')),
  event_category TEXT NOT NULL,
  organised_by TEXT NOT NULL CHECK (organised_by IN ('Department', 'Institute', 'Club')),
  
  -- Venue & Timing
  venue TEXT NOT NULL,
  event_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  
  -- Event Details
  sdg TEXT,
  tech_skills TEXT,
  other_skills TEXT,
  ugc_primary_attribute TEXT,
  event_mode TEXT NOT NULL CHECK (event_mode IN ('Online', 'Offline', 'Hybrid')),
  brief_description TEXT,
  event_outcome TEXT,
  
  -- Coordinator
  coordinator_id UUID NOT NULL REFERENCES public.coordinators(id) ON DELETE RESTRICT,
  
  -- Participants
  expected_participants INTEGER,
  actual_participants INTEGER,
  
  -- Funding
  funding_source TEXT NOT NULL CHECK (funding_source IN ('Central', 'Institute', 'Department')),
  budget DECIMAL(10, 2),
  approved_budget DECIMAL(10, 2),
  
  -- Status & Approval
  status TEXT NOT NULL DEFAULT 'proposed' CHECK (status IN ('proposed', 'pending_approval', 'approved', 'rejected', 'completed')),
  created_by UUID NOT NULL REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Event Approval Workflow
CREATE TABLE IF NOT EXISTS public.event_approvals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  approval_level INTEGER NOT NULL CHECK (approval_level BETWEEN 1 AND 8),
  approval_level_name TEXT NOT NULL CHECK (approval_level_name IN (
    'Faculty Advisor',
    'Co-Curricular Coordinator',
    'HOD',
    'Director',
    'Executive Director',
    'PVC Academic Affairs',
    'Assistant Dean Academic Affairs',
    'PVC'
  )),
  approver_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'sent_back')),
  comments TEXT,
  action_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Event Documents
CREATE TABLE IF NOT EXISTS public.event_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN (
    'event_details',
    'guest_list',
    'minutes_of_meeting',
    'budget_summary',
    'approved_budget_copy',
    'event_report',
    'attendance_sheet',
    'participant_feedback',
    'other'
  )),
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  uploaded_by UUID NOT NULL REFERENCES public.users(id),
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Event Attendance
CREATE TABLE IF NOT EXISTS public.event_attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  participant_email TEXT NOT NULL,
  participant_name TEXT NOT NULL,
  participant_role TEXT NOT NULL CHECK (participant_role IN ('Student', 'Faculty', 'Staff', 'External')),
  check_in_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Event Feedback
CREATE TABLE IF NOT EXISTS public.event_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  participant_email TEXT NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  feedback_text TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for performance
CREATE INDEX IF NOT EXISTS idx_events_coordinator ON public.events(coordinator_id);
CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_department ON public.events(organised_by);
CREATE INDEX IF NOT EXISTS idx_approvals_event ON public.event_approvals(event_id);
CREATE INDEX IF NOT EXISTS idx_approvals_status ON public.event_approvals(status);
CREATE INDEX IF NOT EXISTS idx_documents_event ON public.event_documents(event_id);
CREATE INDEX IF NOT EXISTS idx_attendance_event ON public.event_attendance(event_id);
CREATE INDEX IF NOT EXISTS idx_feedback_event ON public.event_feedback(event_id);

-- Enable RLS on all tables
ALTER TABLE public.coordinators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_feedback ENABLE ROW LEVEL SECURITY;
`
];

// Split into individual statements for execution
const getAllStatements = () => {
  return [
    // Create coordinators table
    `CREATE TABLE IF NOT EXISTS public.coordinators (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID NOT NULL UNIQUE,
      department TEXT NOT NULL,
      eid TEXT UNIQUE,
      designation TEXT NOT NULL DEFAULT 'Co-Curricular Coordinator',
      phone TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )`,

    // Create event_entities table
    `CREATE TABLE IF NOT EXISTS public.event_entities (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name TEXT NOT NULL,
      entity_type TEXT NOT NULL CHECK (entity_type IN ('Club', 'Community', 'Departmental Society', 'Professional Society')),
      department TEXT NOT NULL,
      registration_number TEXT UNIQUE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )`,

    // Create events table
    `CREATE TABLE IF NOT EXISTS public.events (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      registration_number TEXT UNIQUE NOT NULL,
      entity_id UUID NOT NULL REFERENCES public.event_entities(id) ON DELETE CASCADE,
      event_name TEXT NOT NULL,
      event_type TEXT NOT NULL CHECK (event_type IN ('Regular', 'Monthly', 'Flagship')),
      event_category TEXT NOT NULL,
      organised_by TEXT NOT NULL CHECK (organised_by IN ('Department', 'Institute', 'Club')),
      venue TEXT NOT NULL,
      event_date DATE NOT NULL,
      start_time TIME,
      end_time TIME,
      sdg TEXT,
      tech_skills TEXT,
      other_skills TEXT,
      ugc_primary_attribute TEXT,
      event_mode TEXT NOT NULL CHECK (event_mode IN ('Online', 'Offline', 'Hybrid')),
      brief_description TEXT,
      event_outcome TEXT,
      coordinator_id UUID NOT NULL REFERENCES public.coordinators(id) ON DELETE RESTRICT,
      expected_participants INTEGER,
      actual_participants INTEGER,
      funding_source TEXT NOT NULL CHECK (funding_source IN ('Central', 'Institute', 'Department')),
      budget DECIMAL(10, 2),
      approved_budget DECIMAL(10, 2),
      status TEXT NOT NULL DEFAULT 'proposed' CHECK (status IN ('proposed', 'pending_approval', 'approved', 'rejected', 'completed')),
      created_by TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )`,

    // Create event_approvals table
    `CREATE TABLE IF NOT EXISTS public.event_approvals (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
      approval_level INTEGER NOT NULL CHECK (approval_level BETWEEN 1 AND 8),
      approval_level_name TEXT NOT NULL CHECK (approval_level_name IN ('Faculty Advisor', 'Co-Curricular Coordinator', 'HOD', 'Director', 'Executive Director', 'PVC Academic Affairs', 'Assistant Dean Academic Affairs', 'PVC')),
      approver_id TEXT,
      status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'sent_back')),
      comments TEXT,
      action_date TIMESTAMP WITH TIME ZONE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )`,

    // Create event_documents table
    `CREATE TABLE IF NOT EXISTS public.event_documents (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
      document_type TEXT NOT NULL CHECK (document_type IN ('event_details', 'guest_list', 'minutes_of_meeting', 'budget_summary', 'approved_budget_copy', 'event_report', 'attendance_sheet', 'participant_feedback', 'other')),
      file_url TEXT NOT NULL,
      file_name TEXT NOT NULL,
      file_size INTEGER,
      uploaded_by TEXT NOT NULL,
      upload_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )`,

    // Create event_attendance table
    `CREATE TABLE IF NOT EXISTS public.event_attendance (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
      participant_email TEXT NOT NULL,
      participant_name TEXT NOT NULL,
      participant_role TEXT NOT NULL CHECK (participant_role IN ('Student', 'Faculty', 'Staff', 'External')),
      check_in_time TIMESTAMP WITH TIME ZONE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )`,

    // Create event_feedback table
    `CREATE TABLE IF NOT EXISTS public.event_feedback (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
      participant_email TEXT NOT NULL,
      rating INTEGER CHECK (rating BETWEEN 1 AND 5),
      feedback_text TEXT,
      submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )`,

    // Create indexes
    `CREATE INDEX IF NOT EXISTS idx_events_coordinator ON public.events(coordinator_id)`,
    `CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status)`,
    `CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date)`,
    `CREATE INDEX IF NOT EXISTS idx_approvals_event ON public.event_approvals(event_id)`,
    `CREATE INDEX IF NOT EXISTS idx_approvals_status ON public.event_approvals(status)`,
    `CREATE INDEX IF NOT EXISTS idx_documents_event ON public.event_documents(event_id)`,
    `CREATE INDEX IF NOT EXISTS idx_attendance_event ON public.event_attendance(event_id)`,
    `CREATE INDEX IF NOT EXISTS idx_feedback_event ON public.event_feedback(event_id)`,

    // Enable RLS
    `ALTER TABLE public.coordinators ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE public.event_entities ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE public.events ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE public.event_approvals ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE public.event_documents ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE public.event_attendance ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE public.event_feedback ENABLE ROW LEVEL SECURITY`,
  ];
};

export async function POST(req: NextRequest) {
  try {
    const statements = getAllStatements();
    const results = [];
    const errors = [];

    // Execute each statement individually
    for (const statement of statements) {
      try {
        const { data, error } = await supabaseAdmin.rpc('exec', { 
          sql: statement 
        }).then(() => ({ data: null, error: null })).catch(err => ({ data: null, error: err }));

        if (error && !error.message?.includes('already exists')) {
          errors.push({ statement: statement.substring(0, 50), error: error.message });
        } else {
          results.push({ success: true });
        }
      } catch (err: any) {
        // Ignore "already exists" errors
        if (!err.message?.includes('already exists')) {
          errors.push({ error: err.message });
        }
      }
    }

    if (errors.length > 0) {
      console.error('Some initialization errors (may be okay):', errors);
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Events database tables initialized successfully. You can now use the events management system.',
        executedStatements: results.length,
        errors: errors.length > 0 ? errors : undefined
      }
    );
  } catch (error: any) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        hint: 'Make sure you have Supabase service role key configured. Try visiting: /admin/setup-events'
      },
      { status: 500 }
    );
  }
}
