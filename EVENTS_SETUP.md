# Events Management System - Setup Instructions

## Step 1: Run Database Migration

Execute the SQL migration to create all events-related tables:

```bash
# Copy the events migration SQL from /scripts/events-migration.sql
# Go to Supabase SQL Editor and paste the entire content
# Execute the script
```

Or via Supabase dashboard:
1. Open your Supabase project
2. Navigate to SQL Editor
3. Create new query
4. Copy contents of `/scripts/events-migration.sql`
5. Execute

## Step 2: Verify Tables Created

After migration, verify all tables exist:

```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public' 
AND tablename IN ('coordinators', 'event_entities', 'events', 'event_approvals', 
'event_documents', 'event_attendance', 'event_feedback');
```

Expected tables:
- coordinators
- event_entities
- events
- event_approvals
- event_documents
- event_attendance
- event_feedback

## Step 3: Create Initial Data (Optional)

### Create Event Entities

```sql
INSERT INTO public.event_entities (name, entity_type, department, registration_number)
VALUES 
  ('UILAH Literary Club', 'Club', 'UILAH', 'UILAH-2024-001'),
  ('Design Society', 'Departmental Society', 'UID', 'UID-2024-001'),
  ('Media Student Forum', 'Professional Society', 'UIMS', 'UIMS-2024-001'),
  ('Film Makers Guild', 'Club', 'UIFVA', 'UIFVA-2024-001'),
  ('Architecture Club', 'Club', 'UIA', 'UIA-2024-001');
```

### Create Coordinator Records

Link your HOD users to coordinators:

```sql
INSERT INTO public.coordinators (user_id, department, eid, designation, phone)
VALUES 
  ('USER_ID_HERE', 'UILAH', 'EID001', 'Co-Curricular Coordinator', '9876543210'),
  ('USER_ID_HERE', 'UID', 'EID002', 'Co-Curricular Coordinator', '9876543211'),
  ('USER_ID_HERE', 'UIMS', 'EID003', 'Co-Curricular Coordinator', '9876543212'),
  ('USER_ID_HERE', 'UIFVA', 'EID004', 'Co-Curricular Coordinator', '9876543213'),
  ('USER_ID_HERE', 'UIA', 'EID005', 'Co-Curricular Coordinator', '9876543214');
```

Replace USER_ID_HERE with actual user UUIDs from your users table.

## Step 4: Test API Endpoints

### Test Create Event

```bash
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "registration_number": "TEST-2024-001",
    "entity_id": "ENTITY_UUID",
    "event_name": "Annual Literary Festival",
    "event_type": "Flagship",
    "event_category": "Literature",
    "organised_by": "Department",
    "venue": "Seminar Hall A",
    "event_date": "2024-03-20",
    "event_mode": "Offline",
    "brief_description": "Annual celebration of literature and creative writing",
    "coordinator_id": "COORDINATOR_UUID",
    "expected_participants": 150,
    "funding_source": "Department",
    "budget": 50000,
    "created_by": "USER_UUID"
  }'
```

### Test Get Events

```bash
curl http://localhost:3000/api/events?coordinatorId=COORDINATOR_UUID
```

### Test Submit Approval

```bash
curl -X POST http://localhost:3000/api/events/approvals \
  -H "Content-Type: application/json" \
  -d '{
    "approvalId": "APPROVAL_UUID",
    "status": "approved",
    "approverId": "APPROVER_UUID",
    "comments": "Looks good"
  }'
```

## Step 5: Access Events Module

### For HOD (Coordinators)

1. Login with HOD account: `hod_arts@uilah.edu.in`
2. Go to HOD Dashboard
3. Click on "Events Management"
4. View all events or create new event

### For Admin (Senior ED)

1. Login with admin account: `santosh.kumar@uilah.edu.in`
2. Go to main dashboard
3. Access admin panel
4. View all events across all departments

## Features Ready to Use

✅ **Event Management**
- Create, read, update, delete events
- Full event details form
- Registration number tracking

✅ **Approval Workflow**
- 8-level sequential approval process
- Status tracking at each level
- Comments and action tracking

✅ **Document Management**
- Upload pre-event documents (budget, guest list, minutes)
- Upload post-event documents (report, attendance, feedback)
- Document type categorization

✅ **Data Isolation**
- Row-level security enabled
- Coordinators see only their events
- Admins see all events

✅ **Database Integration**
- Full Supabase integration
- Automatic approval workflow creation
- Status cascading

## Demo Workflow

1. **Create Event as Coordinator**
   ```
   Login → HOD Dashboard → Events Management → New Event
   Fill form → Submit → Event in 'proposed' status
   ```

2. **Track Approvals**
   ```
   View Event → Approvals Tab → See 8 approval levels
   Each level shows status: pending, approved, rejected
   ```

3. **Upload Documents**
   ```
   View Event → Documents Tab → Upload Document
   Select document type → Upload file
   ```

4. **Complete Approval (Admin Only)**
   ```
   As admin, simulate approval by submitting at each level
   Event moves through workflow to 'approved' status
   ```

5. **Mark as Complete**
   ```
   After event: Upload final report & attendance
   Change status to 'completed'
   ```

## Environment Variables

Ensure these are set in your .env.local:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Troubleshooting

### Tables not visible in Supabase

1. Check SQL execution - scroll to bottom for any error messages
2. Refresh Supabase dashboard
3. Check RLS policies are created
4. Verify schema is 'public'

### Foreign key constraint errors

1. Ensure users table has data first
2. Create coordinators after users
3. Create events after coordinators
4. Use valid UUIDs for all FK references

### Approval workflow not creating

1. Check event_approvals table for records
2. Verify event was created successfully
3. Check database logs in Supabase for errors

### Documents not uploading

1. Verify file_url format is correct
2. Check RLS policies allow upload
3. Ensure uploaded_by is valid user UUID

## Next Steps

1. Customize approval workflow email notifications (optional)
2. Add file storage integration (Vercel Blob or similar)
3. Create admin dashboard for event statistics
4. Add event calendar view
5. Implement bulk operations for semester planning

## Support

For detailed API documentation, see `/EVENTS_SYSTEM_GUIDE.md`
For general database setup, see `/DATABASE_SETUP.md`
