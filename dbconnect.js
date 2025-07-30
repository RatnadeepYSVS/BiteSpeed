import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config()
const uri = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
export const supabase = createClient(uri,key)
const fun = async ()=>{
 const { _ , error } = await supxabase.auth.signUp({
    email: process.env.email,
    password: process.env.pass
  })
  if(error)console.log("connection failed",error)
}
export default fun