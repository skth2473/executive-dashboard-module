# Quick Start Guide - Role-Based LAH Dashboard

## Login Instructions

### For Senior ED (Prof. Dr. Santosh Kumar)
1. Go to `/login`
2. Enter email: `santosh.kumar@uilah.edu.in`
3. Enter password: `demo123`
4. Click "Sign In"
5. You'll see the main dashboard with ALL 11 departments

**What you can do:**
- View all department metrics
- Access Cluster Overview
- See academic performance across all departments
- View all research projects, events, competitions
- See student and faculty data for entire cluster

---

### For HODs (Department Heads)

#### UILAH HOD
1. Go to `/login`
2. Email: `hod.uilah@cuims.edu.in`
3. Password: `demo123`
4. You'll be taken to `/hod-dashboard`

**What you can do:**
- See ONLY UILAH department data
- Manage faculty (Add/Edit/Delete)
- View student analytics for your department
- Manage academic programs
- Update specializations
- Modify department settings

#### Architecture HOD
- Email: `hod.architecture@cuims.edu.in`
- Password: `demo123`

#### Animation & VFX HOD
- Email: `hod.animation@cuims.edu.in`
- Password: `demo123`

---

## Dashboard Navigation

### Main Dashboard (`/`)
**Visible to:** Admin and Faculty

Shows:
- 6 metric cards (Students, Faculty, PhD Scholars, Events, Competitions, Research)
- Quick links to all pages
- Welcome message with personalized greeting

### HOD Portal (`/hod-dashboard`)
**Visible to:** HOD only (auto-redirect from main dashboard)

Shows:
- Department overview cards
- 5 Management buttons:
  1. **Edit Programs** - Manage degree programs
  2. **Edit Faculty** - Manage department faculty
  3. **Manage Students** - View student analytics
  4. **Edit Specializations** - Manage course specializations
  5. **Update Settings** - Change department information

### Cluster Overview (`/cluster-overview`)
**Visible to:** Admin

Shows all 11 departments in card format with:
- Department name
- SPOC and designation
- Student count
- Faculty count
- Click to view department details

### Department Detail (`/cluster-overview/[id]`)
**Visible to:** Admin and relevant HOD

Shows:
- Full department information
- Administrative officers & HOD details
- Degree programs offered
- Specializations/subjects
- Statistics (students, faculty, research, events)

---

## Management Pages (HOD Only)

### Faculty Management (`/hod-dashboard/manage/faculty`)
- View all faculty members
- Click "Edit" to modify name, email, designation, expertise
- Click "Remove" to delete a faculty member
- Click "Add Faculty Member" to add new faculty

### Student Management (`/hod-dashboard/manage/students`)
- View total students and statistics
- See breakdown by year (1st, 2nd, 3rd, 4th year)
- View academic performance distribution
- Monitor average attendance and CGPA

### Programs Management (`/hod-dashboard/manage/programs`)
- View all degree programs (B.A, M.A, Ph.D, etc.)
- Click "Edit" to modify program details
- Click "Remove" to delete a program
- Click "Add Program" to add new degree program
- Manage program duration and total seats

### Specializations Management (`/hod-dashboard/manage/specializations`)
- View all specializations offered
- Click "Add Specialization" to add new subjects
- Click trash icon to remove a specialization

### Department Settings (`/hod-dashboard/manage/settings`)
- Update department name and institute
- Modify SPOC (Single Point of Contact) information
- Update administrative officer details
- Change student, faculty, and scholar counts
- Update website and affiliation information

---

## Key Features

### Auto-Redirect System
- Admin sees everything (main dashboard)
- HOD automatically redirected to `/hod-dashboard`
- Trying to access restricted pages redirects you appropriately

### Data Separation
- Each HOD ONLY sees their department
- Admin sees aggregated data from all departments
- No cross-department visibility for HODs

### Session Management
- Login stores user in localStorage
- Session persists across page refreshes
- Logout clears all session data
- Automatic redirect to login if session expires

### User Profile Dropdown
- Click on profile in top-right corner
- Shows your name, email, and role
- Shows your department/institute
- Logout button available

---

## Common Tasks

### Add a Faculty Member (HOD)
1. Go to `/hod-dashboard`
2. Click "Manage Faculty"
3. Click "Add Faculty Member" button
4. Fill in name, email, designation, expertise
5. Click "Save Changes"

### Update Student Count (HOD)
1. Go to `/hod-dashboard`
2. Click "Update Settings"
3. Change "Total Students" number
4. Click "Save Changes"
5. You'll see success message

### View All Departments (Admin)
1. Login as admin
2. Click "Cluster Overview" in sidebar
3. See all 11 departments
4. Click any department card to view details

### Export Department Data (HOD)
Currently data is shown in the dashboard. Export feature coming soon in future updates.

---

## Troubleshooting

### I'm a HOD but I see the main dashboard
- The system should auto-redirect you
- Try logging out and logging back in
- Clear browser cache if issue persists

### I don't see my department
- Make sure you're logged in with the correct HOD account
- Verify email matches your department assignment
- Contact admin to update department assignment

### Changes didn't save
- Check if you saw the "Success" message
- Browser might have cached the page
- Try refreshing with Ctrl+F5 (or Cmd+Shift+R on Mac)

### Can't login
- Verify you're using correct email format
- Password is case-sensitive (it's `demo123`)
- Check if you have the right demo credentials

---

## Account Details at a Glance

| Role | Email | Password | Sees |
|------|-------|----------|------|
| Admin | santosh.kumar@uilah.edu.in | demo123 | All 11 depts |
| HOD (UILAH) | hod.uilah@cuims.edu.in | demo123 | UILAH only |
| HOD (Architecture) | hod.architecture@cuims.edu.in | demo123 | UIA only |
| HOD (Animation) | hod.animation@cuims.edu.in | demo123 | UIFVA only |

---

## Next Steps

1. **Try the Admin Account** - Explore the cluster dashboard
2. **Try a HOD Account** - Manage a specific department
3. **Test Management Pages** - Add/edit faculty, programs, etc.
4. **Verify Data Isolation** - Confirm HODs can only see their dept
5. **Test Logout** - Verify you're logged out completely

---

**Questions?** Refer to `/ROLE_BASED_ACCESS.md` for complete documentation.
