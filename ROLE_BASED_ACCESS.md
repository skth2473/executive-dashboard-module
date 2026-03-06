# Role-Based Access Control System

## Overview

The LAH Cluster Dashboard now implements a comprehensive role-based access control system where:
- **Admin (Senior ED)**: Can view all departments and manage the entire cluster
- **HOD (Head of Department)**: Can only view and manage their own department
- **Faculty/Staff**: Read-only access to relevant information

## User Roles & Permissions

### 1. Admin Role (Senior ED - Prof. Dr. Santosh Kumar)

**Login Credentials:**
- Email: `santosh.kumar@uilah.edu.in`
- Password: `demo123`

**Permissions:**
- View all 11 departments in the cluster
- Access main dashboard with cluster-wide metrics
- View student, faculty, and event data across all departments
- Access to academic performance, research projects, competitions, and events pages
- See all departmental statistics and trends

**Dashboard View:**
- Main dashboard at `/` shows all 11 departments
- Access to "Cluster Overview" with complete LAH structure
- Full visibility of all metrics: 8,500 students, 380 faculty, 245 PhD scholars

### 2. HOD Role (Department Head)

**Demo HOD Accounts:**

#### HOD - UILAH (Liberal Arts & Humanities)
- Email: `hod.uilah@cuims.edu.in`
- Password: `demo123`
- Department: UILAH - Liberal Arts & Humanities

#### HOD - Architecture
- Email: `hod.architecture@cuims.edu.in`
- Password: `demo123`
- Department: UIA - Architecture

#### HOD - Animation & VFX
- Email: `hod.animation@cuims.edu.in`
- Password: `demo123`
- Department: UIFVA - Animation, VFX & Gaming

**Permissions:**
- View ONLY their assigned department's data
- Automatic redirect from main dashboard to HOD Portal
- Cannot access other departments' information
- Full management capabilities for their department

**HOD Dashboard Features** (`/hod-dashboard`):

1. **Department Overview Cards**
   - Total Students
   - Faculty Members
   - PhD Scholars
   - Events Conducted

2. **Management Sections with Edit Options:**
   - **Manage Programs** - Add/edit/delete degree programs (B.A, M.A, Ph.D, etc.)
   - **Manage Faculty** - Add/edit/remove faculty members with designation and expertise
   - **Manage Students** - View student statistics, year-wise breakdown, performance distribution
   - **Manage Specializations** - Add/edit/remove course specializations
   - **Department Settings** - Update SPOC info, administrative officer details, contact information

3. **Management Pages:**
   - `/hod-dashboard/manage/programs` - Degree programs management
   - `/hod-dashboard/manage/faculty` - Faculty/staff management
   - `/hod-dashboard/manage/students` - Student records and analytics
   - `/hod-dashboard/manage/specializations` - Course specializations
   - `/hod-dashboard/manage/settings` - Department configuration

## Authentication Flow

### Login Process:
1. User enters email and password on `/login`
2. System validates credentials against the user database
3. Based on role, user is directed to:
   - **Admin**: Main dashboard at `/`
   - **HOD**: HOD Portal at `/hod-dashboard`
   - **Faculty/Staff**: Main dashboard at `/`

### Auto-Redirect Logic:
- HODs attempting to access `/` are automatically redirected to `/hod-dashboard`
- Non-admin users cannot access other departments' data
- All protected routes check user authentication status

## Key Features

### Separation of Concerns:
- Each HOD can only update information for their own department
- Changes made by HODs are isolated to their department view
- Admin can see aggregated data from all departments

### Data Management:
- HODs can:
  - Add/Edit/Delete faculty members
  - Add/Edit/Delete degree programs
  - Add/Edit/Delete specializations
  - Update department settings (SPOC, contact info, etc.)
  - View student statistics and academic performance

### Header Integration:
- User dropdown shows:
  - Full name
  - Email address
  - Department/Institute
  - Role designation
- Logout functionality available from any page

## File Structure

```
/app
  /api/auth
    /login
      route.ts (Updated with demo credentials for all roles)
    /register
      route.ts
    /logout
      route.ts

  /hod-dashboard
    page.tsx (HOD main dashboard)
    /manage
      /faculty
        page.tsx (Add/edit/delete faculty)
      /students
        page.tsx (Student records & analytics)
      /programs
        page.tsx (Manage degree programs)
      /specializations
        page.tsx (Manage course specializations)
      /settings
        page.tsx (Department configuration)

  page.tsx (Admin/Cluster dashboard - redirects HODs to hod-dashboard)
  /login
    page.tsx (Updated with demo credentials)

/context
  auth-context.tsx (Updated with department field and HOD role)

/hooks
  use-auth.ts
```

## Demo Credentials Summary

| Role | Email | Password | Department |
|------|-------|----------|-----------|
| Senior ED (Admin) | santosh.kumar@uilah.edu.in | demo123 | All |
| HOD (UILAH) | hod.uilah@cuims.edu.in | demo123 | UILAH |
| HOD (Architecture) | hod.architecture@cuims.edu.in | demo123 | UIA |
| HOD (Animation) | hod.animation@cuims.edu.in | demo123 | UIFVA |

## Testing Role-Based Access

### Test Admin Account:
1. Login with `santosh.kumar@uilah.edu.in`
2. View main dashboard showing all 11 departments
3. Click on "Cluster Overview" to see all departments
4. Access all menu items

### Test HOD Account:
1. Login with `hod.uilah@cuims.edu.in`
2. Should be automatically redirected to `/hod-dashboard`
3. Can see ONLY their department data
4. Can access management pages for their department
5. Try accessing `/cluster-overview` - should see limited view
6. Use management pages to update department information

## Security Considerations

- Passwords are validated (demo123 works for all demo accounts)
- User session stored in localStorage with user ID, name, email, role, and department
- Each route checks user role before allowing access
- HOD management pages verify role === 'hod' before allowing access
- Admin-only routes redirect unauthorized users

## Future Enhancements

1. Database integration for persistent user storage
2. Role-based API endpoints that filter data by department
3. Audit logs for HOD changes
4. Department-specific reporting
5. Multi-level approval workflows for updates
6. User activity tracking and analytics
