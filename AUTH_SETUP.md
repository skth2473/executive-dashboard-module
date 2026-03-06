# Authentication System Setup

## Overview
The LAH Dashboard now includes a complete authentication system with user registration, login, and session management.

## Demo Credentials

### Admin Account (Pre-configured)
- **Email:** admin@cuims.edu.in
- **Password:** demo123
- **Name:** Prof. Dr. Santosh Kumar
- **Institute:** UILAH
- **Role:** admin

## How to Use

### 1. Login
1. Go to `/login`
2. Enter email and password
3. Click "Sign In"
4. You'll be redirected to the dashboard

### 2. Register New User
1. Go to `/register`
2. Fill in:
   - Full Name
   - Email Address
   - Institute (dropdown)
   - Password (min 6 characters)
   - Confirm Password
3. Click "Create Account"
4. You'll be auto-logged in after registration

### 3. Logout
1. Click the profile icon in the top-right corner
2. Click "Logout"
3. You'll be redirected to the login page

## Authentication Features

### Session Management
- User session stored in localStorage
- Session includes: `userId`, `email`, `name`, `role`, `institute`
- Session persists across page reloads
- Auto-logout when clicking logout button

### Protected Routes
- Dashboard (`/`) is protected - redirects to login if not authenticated
- All cluster pages are protected
- Login and register pages redirect to dashboard if already logged in

### User Roles
Currently implemented roles:
- **admin**: Full access to all features
- **faculty**: Can be assigned department-specific access
- **staff**: Read-only access

### Security
- Passwords are hashed using bcryptjs
- Email validation on both frontend and backend
- No sensitive data stored in localStorage beyond userId and email

## API Endpoints

### POST `/api/auth/register`
Register a new user
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name",
  "institute": "UILAH",
  "role": "staff"
}
```

### POST `/api/auth/login`
Login with email and password
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### POST `/api/auth/logout`
Logout (clears session)

## Implementation Details

### Components
- `/components/protected-route.tsx` - Route protection wrapper
- `/components/header.tsx` - Updated with user profile and logout

### Pages
- `/app/login/page.tsx` - Login page with form and validation
- `/app/register/page.tsx` - Registration page with institute selection
- `/app/page.tsx` - Dashboard (protected, shows user-specific data)

### Context & Hooks
- `/context/auth-context.tsx` - Auth state management
- `/hooks/use-auth.ts` - Hook to access auth context
- `/app/layout.tsx` - AuthProvider wrapper for entire app

### API Routes
- `/app/api/auth/register/route.ts`
- `/app/api/auth/login/route.ts`
- `/app/api/auth/logout/route.ts`

## Future Enhancements

1. **Database Integration**
   - Replace in-memory user storage with actual database
   - Add user profile management

2. **Security**
   - Implement httpOnly cookies for session storage
   - Add CSRF protection
   - Add rate limiting on login attempts
   - Implement JWT tokens for API authentication

3. **Features**
   - Email verification
   - Password reset functionality
   - Two-factor authentication
   - OAuth integration (Google, Microsoft)

4. **Role-Based Access Control**
   - Department-specific data access
   - Permission matrix
   - Dynamic sidebar menu based on role

## Testing

### Test Flow
1. Open `/login`
2. Use demo credentials to login
3. Verify dashboard loads with user name and institute
4. Click logout and verify redirect to login
5. Try to access `/` without login - should redirect to login
6. Register with new email and verify auto-login
