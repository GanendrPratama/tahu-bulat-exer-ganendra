import { supabase } from './client';

export default async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession();
  
    if (session) {
      console.log('User is logged in:', session.user);
      return true;
    } else {
      console.log('No active session.');
      return false;
    }
}