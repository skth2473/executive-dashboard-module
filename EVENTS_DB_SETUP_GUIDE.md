# Events Database Setup Guide

## Overview
The Events Management System requires database tables to be initialized before use. This guide walks you through the setup process.

## Error Message
If you see this error when trying to access the Events Management page:
```
Could not find the table 'public.events' in the schema cache
```

This means the database tables haven't been created yet. Follow the setup steps below.

## Setup Options

### Option 1: Automatic Setup (Easiest)
1. Login to your account (as admin/HOD)
2. Visit: `http://localhost:3000/admin/setup-events`
3. Click "Setup Events Database"
4. Wait for confirmation message
5. Navigate to `/hod-dashboard/events-management` to start using the system

### Option 2: Manual Setup (Via Supabase Dashboard)
1. Go to your Supabase project dashboard
2. Open the SQL Editor
3. Copy the contents of `/scripts/events-migration.sql`
4. Paste into Supabase SQL Editor
5. Click "Execute"
6. Wait for all tables to be created
7. Refresh and navigate to Events Management

### Option 3: Using the Migration File
1. The migration SQL is available at `/scripts/events-migration.sql`
2. Contains all table definitions, indexes, and RLS policies
3. Safe to run multiple times (uses `CREATE TABLE IF NOT EXISTS`)

## What Gets Created

### 7 Core Tables:
- **coordinators** - Co-Curricular event coordinators
- **event_entities** - Clubs, communities, societies
- **events** - Main events table with all event details
- **event_approvals** - 8-level approval workflow
- **event_documents** - Pre/post event documents
- **event_attendance** - Participant check-in tracking
- **event_feedback** - Event feedback and ratings

### Security Features:
- Row Level Security (RLS) enabled on all tables
- Coordinators see only their events
- Admins see all events
- Automatic timestamp tracking
- Referential integrity with foreign keys

### Performance:
- 9 indexes created for fast queries
- Optimized for common filtering (status, date, coordinator)

## Database Schema

### Events Table Structure
```sql
id - Unique identifier
registration_number - Unique event registration
entity_id - Reference to event entity (club, community)
event_name - Name of the event
event_type - Regular, Monthly, or Flagship
event_category - Category classification
organised_by - Department, Institute, or Club
venue - Event venue location
event_date - Date of the event
start_time / end_time - Event timing
sdg - Sustainable Development Goal alignment
event_mode - Online, Offline, or Hybrid
coordinator_id - Reference to event coordinator
expected_participants - Expected attendee count
actual_participants - Actual attendee count
budget - Requested budget amount
approved_budget - Approved budget amount
status - proposed, pending_approval, approved, rejected, completed
```

### Event Approvals Workflow
8 sequential approval levels:
1. Faculty Advisor
2. Co-Curricular Coordinator
3. HOD (Head of Department)
4. Director
5. Executive Director
6. PVC Academic Affairs
7. Assistant Dean Academic Affairs
8. PVC

## Troubleshooting

### "Could not find the table" Error
- Tables not created. Follow setup steps above.
- Try Option 2 (manual Supabase setup).

### Permission Denied Error
- Ensure you're logged in as an admin user
- Check Supabase credentials are correct in environment variables

### Tables Already Exist Error
- This is fine! The migration uses `CREATE TABLE IF NOT EXISTS`
- You can run the setup multiple times safely

## Using the Events Management System

After setup, access at: `/hod-dashboard/events-management`

**Features Available:**
- Create new events
- View all your events with filtering
- Track approval status
- Upload documents
- Manage attendance
- Collect feedback
- View event statistics

## Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

These should already be set if Supabase integration is connected.

## Need Help?
- Check `/EVENTS_SYSTEM_GUIDE.md` for detailed API documentation
- Review database schema comments in `/scripts/events-migration.sql`
- Check debug logs in browser console for specific errors
