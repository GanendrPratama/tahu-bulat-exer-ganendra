"use server"

import { createSupabaseServerClient } from "./server"
import { cookies } from 'next/headers'

export default async function checkSession() {
    try {
        const supabase = await createSupabaseServerClient();
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
            return { success: false, error: error.message };
        }

        if (!session) {
            return { success: false, error: 'No active session' };
        }

        return { success: true, session };
    } catch (err) {
        return { success: false, error: err.message };
    }
}