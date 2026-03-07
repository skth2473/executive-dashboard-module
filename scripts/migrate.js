import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  try {
    console.log('Starting database migration...');
    
    // Read SQL file
    const sqlContent = fs.readFileSync('/scripts/init-database.sql', 'utf-8');
    
    // Split by semicolon and filter empty statements
    const statements = sqlContent
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--'));

    // Execute each statement
    for (const statement of statements) {
      try {
        console.log(`Executing: ${statement.substring(0, 100)}...`);
        const { data, error } = await supabase.rpc('exec', { sql: statement });
        
        if (error) {
          console.error(`Error executing statement: ${error.message}`);
        } else {
          console.log(`✓ Executed successfully`);
        }
      } catch (err) {
        console.error(`Failed to execute statement: ${err.message}`);
      }
    }

    console.log('Migration completed!');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

runMigration();
