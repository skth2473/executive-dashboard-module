# Co-Curricular Events Management System Guide

## Overview

The LAH Dashboard Events Management System is a comprehensive module for managing departmental co-curricular events with complete approval workflows, document management, and attendance tracking.

## System Architecture

### Database Tables

#### 1. coordinators
Stores coordinator profiles linked to users.
```
- id (UUID)
- user_id (FK to users)
- department (TEXT)
- eid (TEXT)
- designation (TEXT)
- phone (TEXT)
```

#### 2. event_entities
Represents clubs, communities, societies that organize events.
```
- id (UUID)
- name (TEXT)
- entity_type (Club|Community|Departmental Society|Professional Society)
- department (TEXT)
- registration_number (TEXT UNIQUE)
```

#### 3. events
Core events table with all event details.
```
- id (UUID)
- registration_number (TEXT UNIQUE)
- entity_id (FK)
- event_name (TEXT)
- event_type (Regular|Monthly|Flagship)
- event_category (TEXT)
- organised_by (Department|Institute|Club)
- venue (TEXT)
- event_date (DATE)
- start_time, end_time (TIME)
- event_mode (Online|Offline|Hybrid)
- brief_description (TEXT)
- event_outcome (TEXT)
- coordinator_id (FK)
- expected_participants (INTEGER)
- actual_participants (INTEGER)
- budget (DECIMAL)
- approved_budget (DECIMAL)
- status (proposed|pending_approval|approved|rejected|completed)
- created_by (FK to users)
- sdg, tech_skills, other_skills, ugc_primary_attribute (TEXT)
```

#### 4. event_approvals
Sequential approval workflow tracking.
```
- id (UUID)
- event_id (FK)
- approval_level (1-8)
- approval_level_name (Faculty Advisor|Coordinator|HOD|Director|ED|PVC Academic|Assistant Dean|PVC)
- approver_id (FK)
- status (pending|approved|rejected|sent_back)
- comments (TEXT)
- action_date (TIMESTAMP)
```

#### 5. event_documents
Document storage for pre and post-event files.
```
- id (UUID)
- event_id (FK)
- document_type (event_details|guest_list|minutes_of_meeting|budget_summary|approved_budget_copy|event_report|attendance_sheet|participant_feedback|other)
- file_url (TEXT)
- file_name (TEXT)
- file_size (INTEGER)
- uploaded_by (FK)
```

#### 6. event_attendance
Attendance records for event participants.
```
- id (UUID)
- event_id (FK)
- participant_email (TEXT)
- participant_name (TEXT)
- participant_role (Student|Faculty|Staff|External)
- check_in_time (TIMESTAMP)
```

#### 7. event_feedback
Post-event feedback collection.
```
- id (UUID)
- event_id (FK)
- participant_email (TEXT)
- rating (1-5)
- feedback_text (TEXT)
- submitted_at (TIMESTAMP)
```

## API Endpoints

### Events Management

#### GET /api/events
Fetch events with optional filters.
**Query Parameters:**
- coordinatorId: Filter by coordinator
- status: Filter by status
- department: Filter by department

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "event_name": "String",
      "event_date": "YYYY-MM-DD",
      "status": "proposed|pending_approval|approved|rejected|completed",
      ...
    }
  ]
}
```

#### POST /api/events
Create new event with automatic approval workflow.
**Request Body:**
```json
{
  "registration_number": "String",
  "entity_id": "uuid",
  "event_name": "String",
  "event_type": "Regular|Monthly|Flagship",
  "event_category": "String",
  "organised_by": "Department|Institute|Club",
  "venue": "String",
  "event_date": "YYYY-MM-DD",
  "start_time": "HH:MM:SS",
  "end_time": "HH:MM:SS",
  "event_mode": "Online|Offline|Hybrid",
  "brief_description": "String",
  "coordinator_id": "uuid",
  "expected_participants": 100,
  "funding_source": "Central|Institute|Department",
  "budget": 50000,
  "created_by": "uuid"
}
```

#### PUT /api/events
Update event details.
**Request Body:**
```json
{
  "id": "uuid",
  "event_name": "String",
  "event_date": "YYYY-MM-DD",
  "budget": 50000,
  ...
}
```

#### DELETE /api/events?id=uuid
Delete an event (cascades to approvals and documents).

### Approval Workflow

#### GET /api/events/approvals?eventId=uuid
Get all approvals for an event ordered by level.

#### POST /api/events/approvals
Submit approval action.
**Request Body:**
```json
{
  "approvalId": "uuid",
  "status": "approved|rejected|sent_back",
  "approverId": "uuid",
  "comments": "Optional comment"
}
```

**Approval Workflow Logic:**
1. When status='approved': Advances to next approval level
2. When all 8 levels approved: Event status becomes 'approved'
3. When status='rejected': Event status becomes 'rejected'
4. When status='sent_back': Resets all subsequent approvals to pending

### Document Management

#### GET /api/events/documents?eventId=uuid&documentType=event_details
Fetch event documents.

**Query Parameters:**
- eventId: UUID of event (required)
- documentType: Filter by document type (optional)

#### POST /api/events/documents
Upload event document.
**Request Body:**
```json
{
  "eventId": "uuid",
  "documentType": "event_details|guest_list|minutes_of_meeting|budget_summary|...",
  "fileUrl": "String",
  "fileName": "String",
  "fileSize": 1024,
  "uploadedBy": "uuid"
}
```

#### DELETE /api/events/documents?id=uuid
Delete a document.

## User Workflows

### For Co-Curricular Coordinators

1. **Create Event Proposal**
   - Fill out comprehensive event form
   - Upload supporting documents (budget, guest list, minutes)
   - Submit for approval workflow
   - Event moves to 'proposed' status

2. **Track Approvals**
   - View approval status in real-time
   - See comments from approvers
   - Status updates as each level approves

3. **Post-Event Management**
   - Upload event report
   - Submit attendance sheet
   - Collect participant feedback
   - Mark event as completed

### For Approval Authorities

1. **Review Proposals**
   - View pending approvals at their level
   - Review event details and documents
   - Approve, reject, or send back for corrections

2. **Approve Workflow**
   - Faculty Advisor (Level 1)
   - Co-Curricular Coordinator (Level 2)
   - HOD (Level 3)
   - Director (Level 4)
   - Executive Director (Level 5)
   - PVC Academic Affairs (Level 6)
   - Assistant Dean Academic Affairs (Level 7)
   - PVC (Level 8)

### For Admin/Senior ED (Santosh Kumar)

1. **View All Events**
   - See events from all departments
   - Filter by status, date, department
   - Generate reports

2. **Approval Oversight**
   - Monitor approval workflows
   - Track bottlenecks
   - Generate metrics

## Service Functions

### events-service.ts

**Core Functions:**

```typescript
// Get events with filters
getEvents(filters?: { coordinatorId?, status?, department? })

// Get single event with relations
getEventById(eventId: string)

// Create new event
createEvent(eventData)

// Update event
updateEvent(eventId: string, updates: Partial<Event>)

// Get event approvals
getEventApprovals(eventId: string)

// Submit approval
submitApproval(approvalId: string, status, approverId, comments?)

// Upload document
uploadDocument(eventId, documentType, fileUrl, fileName, uploadedBy, fileSize?)

// Get event documents
getEventDocuments(eventId, documentType?)

// Record attendance
recordAttendance(eventId, email, name, role)

// Submit feedback
submitEventFeedback(eventId, email, rating, feedback?)

// Get statistics
getEventsStatistics(department?)
```

## Row Level Security Policies

All tables have RLS enabled:

1. **events table**
   - Coordinators: Can view and edit their own events
   - Admin: Can view all events
   - Others: No access

2. **event_approvals table**
   - Event creator: Can view
   - Assigned approver: Can view and update
   - Admin: Can view all

3. **event_documents table**
   - Event coordinator: Can view and upload
   - Approvers: Can view
   - Admin: Can view all

4. **event_attendance & event_feedback**
   - Event coordinator: Can view and manage
   - Admin: Can view all

## Best Practices

1. **Event Creation**
   - Always use registration_number in format: DEPT-YYYY-###
   - Include detailed descriptions and outcomes
   - Attach all supporting documents upfront

2. **Document Management**
   - Organize documents by type (budget, guest list, report, etc.)
   - Use consistent naming conventions
   - Archive completed events with all documents

3. **Approval Workflow**
   - Add comments at each level for clarity
   - Don't skip approval levels
   - Use "sent_back" for significant changes needed

4. **Post-Event**
   - Upload final report within 7 days
   - Collect feedback while fresh
   - Update actual participant numbers

## Troubleshooting

**Q: Event stuck in 'pending_approval'**
A: Check if required approver has access. Ensure approver_id is set correctly at each level.

**Q: Can't upload documents**
A: Verify user role has upload permission and file size limits.

**Q: Approval workflow reset unexpectedly**
A: 'Sent back' status resets all subsequent approvals. Only use when major revisions needed.

## Status Transitions

```
proposed → pending_approval → approved → completed
    ↓           ↓
  rejected    rejected
```

- proposed: Initial state after submission
- pending_approval: First approval level in progress
- approved: All 8 approvals complete
- rejected: Any approver rejects
- completed: Event finished, post-event docs submitted
