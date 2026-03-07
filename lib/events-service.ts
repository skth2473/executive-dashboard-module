import { supabaseAdmin } from './supabase';

export interface Event {
  id: string;
  registration_number: string;
  event_name: string;
  event_type: string;
  event_category: string;
  organised_by: string;
  venue: string;
  event_date: string;
  start_time?: string;
  end_time?: string;
  brief_description: string;
  event_mode: string;
  expected_participants?: number;
  actual_participants?: number;
  budget?: number;
  approved_budget?: number;
  status: 'proposed' | 'pending_approval' | 'approved' | 'rejected' | 'completed';
  coordinator_id: string;
  created_at: string;
  updated_at: string;
}

export interface EventApproval {
  id: string;
  event_id: string;
  approval_level: number;
  approval_level_name: string;
  status: 'pending' | 'approved' | 'rejected' | 'sent_back';
  approver_id?: string;
  comments?: string;
  action_date?: string;
}

export interface EventDocument {
  id: string;
  event_id: string;
  document_type: string;
  file_url: string;
  file_name: string;
  file_size?: number;
  uploaded_by: string;
  upload_date: string;
}

// Get all events with optional filters
export async function getEvents(filters?: {
  coordinatorId?: string;
  status?: string;
  department?: string;
}) {
  let query = supabaseAdmin.from('events').select('*');

  if (filters?.coordinatorId) {
    query = query.eq('coordinator_id', filters.coordinatorId);
  }
  if (filters?.status) {
    query = query.eq('status', filters.status);
  }
  if (filters?.department) {
    query = query.eq('organised_by', filters.department);
  }

  const { data, error } = await query.order('event_date', { ascending: true });
  if (error) throw error;
  return data;
}

// Get single event with all related data
export async function getEventById(eventId: string) {
  const { data, error } = await supabaseAdmin
    .from('events')
    .select(
      `
      *,
      coordinators:coordinator_id(*),
      event_entities:entity_id(*),
      event_approvals(*),
      event_documents(*),
      event_attendance(*),
      event_feedback(*)
    `
    )
    .eq('id', eventId)
    .single();

  if (error) throw error;
  return data;
}

// Create new event
export async function createEvent(eventData: {
  registration_number: string;
  entity_id: string;
  event_name: string;
  event_type: string;
  event_category: string;
  organised_by: string;
  venue: string;
  event_date: string;
  start_time?: string;
  end_time?: string;
  sdg?: string;
  tech_skills?: string;
  other_skills?: string;
  ugc_primary_attribute?: string;
  event_mode: string;
  brief_description: string;
  coordinator_id: string;
  expected_participants?: number;
  funding_source: string;
  budget?: number;
  created_by: string;
}) {
  const { data, error } = await supabaseAdmin
    .from('events')
    .insert(eventData)
    .select()
    .single();

  if (error) throw error;

  // Create approval workflow
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
    event_id: data.id,
    approval_level: level.level,
    approval_level_name: level.name,
    status: 'pending',
  }));

  await supabaseAdmin.from('event_approvals').insert(approvals);

  return data;
}

// Update event
export async function updateEvent(eventId: string, updates: Partial<Event>) {
  const { data, error } = await supabaseAdmin
    .from('events')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', eventId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Get event approvals
export async function getEventApprovals(eventId: string) {
  const { data, error } = await supabaseAdmin
    .from('event_approvals')
    .select('*')
    .eq('event_id', eventId)
    .order('approval_level', { ascending: true });

  if (error) throw error;
  return data;
}

// Submit approval
export async function submitApproval(
  approvalId: string,
  status: 'approved' | 'rejected' | 'sent_back',
  approverId: string,
  comments?: string
) {
  const { data, error } = await supabaseAdmin
    .from('event_approvals')
    .update({
      status,
      approver_id: approverId,
      action_date: new Date().toISOString(),
      comments,
    })
    .eq('id', approvalId)
    .select()
    .single();

  if (error) throw error;

  // Update event status if all approvals complete
  if (status === 'approved') {
    const approval = data;
    const { data: allApprovals } = await supabaseAdmin
      .from('event_approvals')
      .select('*')
      .eq('event_id', approval.event_id);

    if (allApprovals) {
      const allApproved = allApprovals.every((a) => a.status === 'approved');
      if (allApproved) {
        await updateEvent(approval.event_id, { status: 'approved' });
      }
    }
  } else if (status === 'rejected') {
    await updateEvent(data.event_id, { status: 'rejected' });
  }

  return data;
}

// Upload document
export async function uploadDocument(
  eventId: string,
  documentType: string,
  fileUrl: string,
  fileName: string,
  uploadedBy: string,
  fileSize?: number
) {
  const { data, error } = await supabaseAdmin
    .from('event_documents')
    .insert({
      event_id: eventId,
      document_type: documentType,
      file_url: fileUrl,
      file_name: fileName,
      file_size: fileSize,
      uploaded_by: uploadedBy,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Get event documents
export async function getEventDocuments(eventId: string, documentType?: string) {
  let query = supabaseAdmin
    .from('event_documents')
    .select('*')
    .eq('event_id', eventId);

  if (documentType) {
    query = query.eq('document_type', documentType);
  }

  const { data, error } = await query.order('upload_date', { ascending: false });

  if (error) throw error;
  return data;
}

// Get event attendance
export async function getEventAttendance(eventId: string) {
  const { data, error } = await supabaseAdmin
    .from('event_attendance')
    .select('*')
    .eq('event_id', eventId);

  if (error) throw error;
  return data;
}

// Record attendance
export async function recordAttendance(
  eventId: string,
  participantEmail: string,
  participantName: string,
  participantRole: string
) {
  const { data, error } = await supabaseAdmin
    .from('event_attendance')
    .insert({
      event_id: eventId,
      participant_email: participantEmail,
      participant_name: participantName,
      participant_role: participantRole,
      check_in_time: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Get event feedback
export async function getEventFeedback(eventId: string) {
  const { data, error } = await supabaseAdmin
    .from('event_feedback')
    .select('*')
    .eq('event_id', eventId);

  if (error) throw error;
  return data;
}

// Submit event feedback
export async function submitEventFeedback(
  eventId: string,
  participantEmail: string,
  rating: number,
  feedbackText?: string
) {
  const { data, error } = await supabaseAdmin
    .from('event_feedback')
    .insert({
      event_id: eventId,
      participant_email: participantEmail,
      rating,
      feedback_text: feedbackText,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Get events statistics
export async function getEventsStatistics(department?: string) {
  let query = supabaseAdmin.from('events').select('*');

  if (department) {
    query = query.eq('organised_by', department);
  }

  const { data, error } = await query;

  if (error) throw error;

  const stats = {
    total: data.length,
    proposed: data.filter((e) => e.status === 'proposed').length,
    approved: data.filter((e) => e.status === 'approved').length,
    completed: data.filter((e) => e.status === 'completed').length,
    rejected: data.filter((e) => e.status === 'rejected').length,
    totalBudget: data.reduce((sum, e) => sum + (e.budget || 0), 0),
    totalParticipants: data.reduce((sum, e) => sum + (e.actual_participants || 0), 0),
  };

  return stats;
}
