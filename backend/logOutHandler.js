"use server"

import { createSupabaseServerClient } from "./server"
import { cookies } from 'next/headers'

export default async function logOutHandler() {
    try {
        const supabase = await createSupabaseServerClient();
        const { error } = await supabase.auth.signOut();

        if (error) {
            return { success: false, error: error.message };
        }

        cookies().delete('session');
        return { success: true };
    } catch (err) {
        return { success: false, error: err.message };
    }
}