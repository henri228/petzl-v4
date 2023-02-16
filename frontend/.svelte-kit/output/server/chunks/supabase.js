import { createClient } from "@supabase/auth-helpers-sveltekit";
const PUBLIC_SUPABASE_URL = "https://xexdpkmsveabfnzkarin.supabase.co";
const PUBLIC_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhleGRwa21zdmVhYmZuemthcmluIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUwOTc4MDUsImV4cCI6MTk5MDY3MzgwNX0.npqaOMyGN6n0V_sgWyddJlho3XXqSKTSiJ19F6j5vVg";
const supabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
export {
  supabaseClient as s
};
