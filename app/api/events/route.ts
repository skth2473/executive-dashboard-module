import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET - Fetch events with filters
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const coordinatorId = searchParams.get('coordinatorId');
    const status = searchParams.get('status');
    const department = searchParams.get('department');

    let query = supabaseAdmin
      .from('events')
      .select(`
        *,
        coordinators:coordinator_id(*),
        event_entities:entity_id(*),
        event_approvals(*),
        event_documents(*)
      `);

    if (coordinatorId) {
      query = query.eq('coordinator_id', coordinatorId);
    }
    if (status) {
      query = query.eq('status', status);
    }
    if (department) {
      query = query.eq('organised_by', department);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      // Check if error is about missing tables
      if (error.message?.includes('Could not find the table') || error.code === 'PGRST205') {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Database tables not initialized',
            details: 'Please visit /admin/setup-events to initialize the events database',
            setupUrl: '/admin/setup-events'
          },
          { status: 503 }
        );
      }
      throw error;
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    const errorMessage = error.message || 'An error occurred';
    const isInitError = errorMessage.includes('Could not find the table') || errorMessage.includes('PGRST205');
    
    return NextResponse.json(
      { 
        success: false, 
        error: isInitError ? 'Database not initialized' : errorMessage,
        details: isInitError ? 'Visit /admin/setup-events to initialize' : undefined,
        setupUrl: isInitError ? '/admin/setup-events' : undefined
      },
      { status: isInitError ? 503 : 500 }
    );
  }
}

// POST - Create new event
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      registration_number,
      entity_id,
      event_name,
      event_type,
      event_category,
      organised_by,
      venue,
      event_date,
      start_time,
      end_time,
      sdg,
      tech_skills,
      other_skills,
      ugc_primary_attribute,
      event_mode,
      brief_description,
      event_outcome,
      coordinator_id,
      expected_participants,
      funding_source,
      budget,
      created_by,
    } = body;

    const { data, error } = await supabaseAdmin
      .from('events')
      .insert({
        registration_number,
        entity_id,
        event_name,
        event_type,
        event_category,
        organised_by,
        venue,
        event_date,
        start_time,
        end_time,
        sdg,
        tech_skills,
        other_skills,
        ugc_primary_attribute,
        event_mode,
        brief_description,
        event_outcome,
        coordinator_id,
        expected_participants,
        funding_source,
        budget,
        created_by,
        status: 'proposed',
      })
      .select();

    if (error) throw error;

    // Create approval workflow entries
    const approvalLevels = [
      { level: 1, name: 'Faculty Advisor' },
      { level: 2, name: 'Co-Curricular Coordinator' },
      { level: 3, name: 'HOD' },
      { level: 4, name: 'Director' },
      { level: 5, name: 'Executive Director' },
      { level: 6, name: 'PVC Academic Affairs' },
      { level: 7, name: 'Assistant Dean Academic Affairs' },
      { level: 8, name: 'PVC' },
    ];

    const approvals = approvalLevels.map((level) => ({
      event_id: data[0].id,
      approval_level: level.level,
      approval_level_name: level.name,
      status: 'pending',
    }));

    await supabaseAdmin.from('event_approvals').insert(approvals);

    return NextResponse.json({ success: true, data: data[0] }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update event
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    const { data, error } = await supabaseAdmin
      .from('events')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data: data[0] });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete event
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Event ID required' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('events')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Event deleted' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
