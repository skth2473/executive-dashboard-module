import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET - Fetch approvals for an event
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('eventId');

    const { data, error } = await supabaseAdmin
      .from('event_approvals')
      .select('*')
      .eq('event_id', eventId)
      .order('approval_level', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Submit approval action
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { approvalId, status, comments, approverId } = body;

    // Update approval
    const { data: approvalData, error: approvalError } = await supabaseAdmin
      .from('event_approvals')
      .update({
        status,
        comments,
        approver_id: approverId,
        action_date: new Date().toISOString(),
      })
      .eq('id', approvalId)
      .select();

    if (approvalError) throw approvalError;

    // If approved, check if all previous levels are approved
    if (status === 'approved') {
      const approval = approvalData[0];
      const { data: eventApprovals, error: fetchError } = await supabaseAdmin
        .from('event_approvals')
        .select('*')
        .eq('event_id', approval.event_id)
        .order('approval_level', { ascending: true });

      if (fetchError) throw fetchError;

      // Check if all approvals up to current level are approved
      const allPreviousApproved = eventApprovals
        .slice(0, approval.approval_level)
        .every((a) => a.status === 'approved' || a.approval_level < approval.approval_level);

      // Update event status if all approvals are complete
      if (allPreviousApproved && approval.approval_level === 8) {
        await supabaseAdmin
          .from('events')
          .update({ status: 'approved' })
          .eq('id', approval.event_id);
      } else if (allPreviousApproved) {
        // Move to next approval level
        const nextApproval = eventApprovals.find(
          (a) => a.approval_level === approval.approval_level + 1
        );
        if (nextApproval) {
          await supabaseAdmin
            .from('event_approvals')
            .update({ status: 'pending' })
            .eq('id', nextApproval.id);
        }
      }
    } else if (status === 'rejected') {
      // Update event status to rejected
      await supabaseAdmin
        .from('events')
        .update({ status: 'rejected' })
        .eq('id', approvalData[0].event_id);
    } else if (status === 'sent_back') {
      // Reset all subsequent approvals
      await supabaseAdmin
        .from('event_approvals')
        .update({ status: 'pending' })
        .gt('approval_level', approvalData[0].approval_level)
        .eq('event_id', approvalData[0].event_id);
    }

    return NextResponse.json({ success: true, data: approvalData[0] });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
