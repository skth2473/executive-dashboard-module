import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET - Fetch documents for an event
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('eventId');
    const documentType = searchParams.get('documentType');

    let query = supabaseAdmin
      .from('event_documents')
      .select('*')
      .eq('event_id', eventId);

    if (documentType) {
      query = query.eq('document_type', documentType);
    }

    const { data, error } = await query.order('upload_date', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Upload document
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      eventId,
      documentType,
      fileUrl,
      fileName,
      fileSize,
      uploadedBy,
    } = body;

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
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data: data[0] }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete document
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const documentId = searchParams.get('id');

    if (!documentId) {
      return NextResponse.json(
        { success: false, error: 'Document ID required' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('event_documents')
      .delete()
      .eq('id', documentId);

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Document deleted' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
