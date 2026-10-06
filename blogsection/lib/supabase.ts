import { createClient } from "@supabase/supabase-js";
import { getSupabaseKey, getSupabaseUrl } from "./env";

// Read once at module load: the Supabase client is needed synchronously by
// every API route. Both values throw if unset — see ./env.ts.
const supabaseUrl = getSupabaseUrl();
const supabaseKey = getSupabaseKey();

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});