import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcryptjs';

// In-memory database (same reference as register)
let users: any[] = [];

// Add default users for testing
const initializeUsers = () => {
  if (users.length === 0) {
    users.push(
      {
        id: 'admin-001',
        email: 'santosh.kumar@uilah.edu.in',
        password: '$2a$10$demo123hash', // demo123 - In production, use proper bcrypt hash
        name: 'Prof. Dr. Santosh Kumar',
        institute: 'UILAH',
        department: 'UILAH',
        role: 'admin',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      },
      {
        id: 'hod-001',
        email: 'hod_arts@uilah.edu.in',
        password: '$2a$10$demo123hash', // demo123
        name: 'Dr. Neha Sharma',
        institute: 'UILAH',
        department: 'UILAH - Liberal Arts & Humanities',
        role: 'hod',
        stream: 'arts',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      },
      {
        id: 'hod-002',
        email: 'hod_design@uilah.edu.in',
        password: '$2a$10$demo123hash', // demo123
        name: 'Prof. Rajesh Gupta',
        institute: 'UID',
        department: 'UID - Interior Design',
        role: 'hod',
        stream: 'design',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      },
      {
        id: 'hod-003',
        email: 'hod_media@uilah.edu.in',
        password: '$2a$10$demo123hash', // demo123
        name: 'Prof. Arun Kumar',
        institute: 'UIMS',
        department: 'UIMS - Media Studies',
        role: 'hod',
        stream: 'media',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      },
      {
        id: 'hod-004',
        email: 'hod_film@uilah.edu.in',
        password: '$2a$10$demo123hash', // demo123
        name: 'Dr. Pooja Desai',
        institute: 'UIFVA',
        department: 'UIFVA - Film Studies',
        role: 'hod',
        stream: 'film',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      },
      {
        id: 'hod-005',
        email: 'hod_architecture@uilah.edu.in',
        password: '$2a$10$demo123hash', // demo123
        name: 'Dr. Mohit Patel',
        institute: 'UIA',
        department: 'UIA - Architecture',
        role: 'hod',
        stream: 'architecture',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      }
    );
  }
};

export async function POST(request: NextRequest) {
  try {
    initializeUsers();

    const { email, password } = await request.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = users.find(u => u.email === email);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password (simple demo comparison - in production use bcrypt)
    const isPasswordValid = password === 'demo123' || await compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Update last login
    user.lastLogin = new Date().toISOString();

    return NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          institute: user.institute,
          department: user.department,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
