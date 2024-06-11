import { createClient } from "@supabase/supabase-js";
const supabaseUrl:any = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey:any  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// if(supabaseUrl === undefined  )return
// if(supabaseKey === undefined  )return
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;