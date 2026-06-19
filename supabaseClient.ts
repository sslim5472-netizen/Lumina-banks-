import { createClient } from '@supabase/supabase-js';

// ⚠️ IMPORTANT: You must replace 'https://YOUR_PROJECT_ID.supabase.co' with your actual Supabase Project URL.
// The key you provided is a publishable key.
const supabaseUrl = 'https://YOUR_PROJECT_ID.supabase.co'; 
const supabaseKey = 'sb_publishable_NPNTpgKWqozYTDjiptQtPQ__PsT7lug';

export const supabase = createClient(supabaseUrl, supabaseKey);