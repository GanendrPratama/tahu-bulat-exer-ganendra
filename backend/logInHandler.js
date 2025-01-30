"use server"

import { createSupabaseServerClient } from "./server"
import { cookies } from 'next/headers'

export default async function logInHandler(email, password) {
    try {
        const supabase = await createSupabaseServerClient();
        const { data: { session }, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return { success: false, error: error.message };
        }

        cookies().set('session', JSON.stringify(session));
        return { success: true, session };
    } catch (err) {
        return { success: false, error: err.message };
    }
}