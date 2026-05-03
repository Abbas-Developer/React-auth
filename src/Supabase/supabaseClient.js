import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://ljwbtuxtevvfbgubcsbi.supabase.co'; 
const supabaseAnonKey = 'sb_publishable_F6eS6VIAapARHz8kKXTZHg_smnY3LAH'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

