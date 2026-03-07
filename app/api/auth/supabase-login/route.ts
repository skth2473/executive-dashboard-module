import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { hash } from 'bcryptjs';

// Demo credentials for seeding
const DEMO_USERS = [
  {
    email: 'santosh.kumar@uilah.edu.in',
    password: 'demo123',
    name: 'Prof. Dr. Santosh Kumar',
    institute: 'UILAH',
    department: 'UILAH',
    role: 'admin',
  },
  {
    email: 'hod_arts@uilah.edu.in',
    password: 'demo123',
    name: 'Dr. Neha Sharma',
    institute: 'UILAH',
    department: 'UILAH - Liberal Arts & Humanities',
    role: 'hod',
    stream: 'arts',
  },
  {
    email: 'hod_design@uilah.edu.in',
    password: 'demo123',
    name: 'Prof. Rajesh Gupta',
    institute: 'UID',
    department: 'UID - Interior Design',
    role: 'hod',
    stream: 'design',
  },
  {
    email: 'hod_media@uilah.edu.in',
    password: 'demo123',
    name: 'Prof. Arun Kumar',
    institute: 'UIMS',
    department: 'UIMS - Media Studies',
    role: 'hod',
    stream: 'media',
  },
  {
    email: 'hod_film@uilah.edu.in',
    password: 'demo123',
    name: 'Dr. Pooja Desai',
    institute: 'UIFVA',
    department: 'UIFVA - Film Studies',
    role: 'hod',
    stream: 'film',
  },
  {
    email: 'hod_architecture@uilah.edu.in',
    password: 'demo123',
    name: 'Dr. Mohit Patel',
    institute: 'UIA',
    department: 'UIA - Architecture',
    role: 'hod',
    stream: 'architecture',
  },
];

async function seedDemoUsers() {
  try {
    for (const user of DEMO_USERS) {
      // Check if user exists
      const { data: existingUser } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq('email', user.email)
        .single()
        .catch(() => ({ data: null }));

      if (!existingUser) {
        // Create auth user
        const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
          email: user.email,
          password: user.password,
          email_confirm: true,
        });

        if (authError) {
          console.error(`[v0] Error creating auth user ${user.email}:`, authError);
          continue;
        }

        // Create user profile
        const { error: profileError } = await supabaseAdmin
          .from('users')
          .insert({
            id: authUser.user.id,
            email: user.email,
            name: user.name,
            institute: user.institute,
            department: user.department,
            stream: (user as any).stream,
            role: user.role,
          });

        if (profileError) {
          console.error(`[v0] Error creating user profile ${user.email}:`, profileError);
        } else {
          console.log(`[v0] Created demo user: ${user.email}`);
        }
      }
    }
  } catch (error) {
    console.error('[v0] Error seeding demo users:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    console.log(`[v0] Login attempt for: ${email}`);

    // Seed demo users if needed
    await seedDemoUsers();

    // Sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('[v0] Auth error:', error);
      return NextResponse.json(
        { error: error.message || 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Get user profile
    const { data: userProfile, error: profileError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError || !userProfile) {
      console.error('[v0] Error fetching user profile:', profileError);
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    // Return user data and session
    return NextResponse.json({
      success: true,
      user: {
        id: userProfile.id,
        email: userProfile.email,
        name: userProfile.name,
        institute: userProfile.institute,
        department: userProfile.department,
        stream: userProfile.stream,
        role: userProfile.role,
      },
      session: data.session,
    });
  } catch (error) {
    console.error('[v0] Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
