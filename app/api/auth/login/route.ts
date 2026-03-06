import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcryptjs';

// In-memory database (same reference as register)
let users: any[] = [];

// Add default admin user for testing
const initializeUsers = () => {
  if (users.length === 0) {
    users.push({
      id: 'admin-001',
      email: 'admin@cuims.edu.in',
      password: '$2a$10$YourHashedPasswordHere', // In production, use proper hash
      name: 'Prof. Dr. Santosh Kumar',
      institute: 'UILAH',
      role: 'admin',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    });
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

    // Verify password
    const isPasswordValid = await compare(password, user.password);
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
