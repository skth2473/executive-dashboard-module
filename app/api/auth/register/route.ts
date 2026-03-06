import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

// In-memory database (replace with actual DB in production)
let users: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, institute, role } = await request.json();

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if user already exists
    if (users.some(u => u.email === email)) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const newUser = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      name,
      institute: institute || 'UILAH',
      role: role || 'staff',
      createdAt: new Date().toISOString(),
      lastLogin: null,
    };

    users.push(newUser);

    return NextResponse.json(
      {
        success: true,
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          institute: newUser.institute,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
