import { createClient } from '@supabase/auth-helpers-sveltekit'
// import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'

// export const supabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)

const url = "https://xexdpkmsveabfnzkarin.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhleGRwa21zdmVhYmZuemthcmluIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUwOTc4MDUsImV4cCI6MTk5MDY3MzgwNX0.npqaOMyGN6n0V_sgWyddJlho3XXqSKTSiJ19F6j5vVg"
export const supabaseClient = createClient(url, key)
