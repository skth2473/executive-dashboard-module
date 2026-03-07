# Complete Events Management System Setup Guide

## Overview
The Events Management System requires database tables to be initialized before use. This guide walks you through the setup process.

## Option 1: Automatic Setup (Recommended)

### Step 1: Navigate to Setup Page
1. Go to `http://localhost:3000/admin/setup-events`
2. You should see the "Events Database Setup" page

### Step 2: Click Setup Button
1. Click the "Setup Events Database" button
2. Wait for the process to complete
3. You should see a success message

### Step 3: Verify Setup
1. Navigate to `/hod-dashboard/events-management`
2. If setup was successful, you should see the events page (with no events initially)

---

## Option 2: Manual Setup via Supabase Dashboard

If the automatic setup doesn't work, follow these steps:

### Step 1: Access Supabase Dashboard
1. Go to [https://supabase.com](https://supabase.com)
2. Log in with your credentials
3. Select your project

### Step 2: Open SQL Editor
1. In the left sidebar, click **SQL Editor**
2. Click **New Query**

### Step 3: Copy SQL Migration
1. Open `/scripts/events-migration.sql` from your project
2. Copy all the SQL content

### Step 4: Execute SQL
1. Paste the SQL into the Supabase SQL editor
2. Click **Run** (or press Ctrl+Enter)
3. Wait for all statements to execute successfully

### Step 5: Verify Tables
1. Go to **Table Editor** in Supabase
2. You should see these new tables:
   - coordinators
   - event_entities
   - events
   - event_approvals
   - event_documents
   - event_attendance
   - event_feedback

---

## Troubleshooting

### Error: "Could not find the table 'public.events'"
**Solution:** The tables haven't been created yet. Follow Option 1 or Option 2 above.

### Error: "Database not initialized"
**Solution:** This is the same as above. Run the setup.

### Setup Button Doesn't Work
**Solution:** 
1. Check that `SUPABASE_SERVICE_ROLE_KEY` is set in your environment
2. Try the Manual Setup option instead
3. Check browser console for specific error messages

### Tables Created But Still Getting Errors
**Solution:**
1. Verify all 7 tables exist in Supabase
2. Try refreshing the page
3. Clear browser cache and try again

---

## What Gets Created

The setup creates **7 database tables**:

1. **coordinators** - Event coordinators with department info
2. **event_entities** - Clubs, communities, and organizations
3. **events** - Main events table (30+ fields)
4. **event_approvals** - 8-level approval workflow
5. **event_documents** - Supporting documents for events
6. **event_attendance** - Participant attendance tracking
7. **event_feedback** - Participant feedback and ratings

Each table includes:
- Proper relationships and constraints
- Indexes for performance
- Row Level Security (RLS) for data protection

---

## After Setup

Once setup is complete:

1. **Login** with HOD credentials (e.g., `hod_arts@uilah.edu.in`)
2. **Navigate** to `/hod-dashboard/events-management`
3. **Create** your first event using the "New Event" button
4. **Manage** events, approvals, documents, and attendance

---

## Testing Demo Credentials

Use these credentials to test the system:

**HOD Accounts:**
- Email: `hod_arts@uilah.edu.in`
- Email: `hod_design@uilah.edu.in`
- Email: `hod_media@uilah.edu.in`
- Email: `hod_film@uilah.edu.in`
- Email: `hod_architecture@uilah.edu.in`
- Password: `demo123` (all accounts)

**Admin Account:**
- Email: `santosh.kumar@uilah.edu.in`
- Password: `demo123`

---

## Need Help?

- Check `/EVENTS_SYSTEM_GUIDE.md` for API documentation
- Review `/EVENTS_SETUP.md` for additional details
- Check browser console for error messages
- Verify all environment variables are set in Supabase integration
