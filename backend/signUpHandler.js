"use server"

import { createSupabaseServerClient } from "./server"

export default async function signUpHandler(email, password) {
    try {
        const supabase = await createSupabaseServerClient();
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (err) {
        return { success: false, error: err.message };
    }
}