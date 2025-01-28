import { supabase } from "./client";


export default async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  
    if (error) {
      console.error('Error signing in with Google:', error.message);
    } else {
      console.log('Signed in successfully:', data);
    }
}