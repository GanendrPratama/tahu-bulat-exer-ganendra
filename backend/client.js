import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient<Database>(supabaseUrl, supabaseKey)



module.exports = { supabase, supabaseUrl, supabaseKey }