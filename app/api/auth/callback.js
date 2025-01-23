import { supabase } from '../../../backend/client';
import { findUserByEmail } from '../../../backend/handler';

export default async function handler(req, res) {
    const { user, error } = await supabase.auth.getUser();

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    const email = user.email;
    const existingUser = await findUserByEmail(email);

    if (existingUser.length > 0) {
        res.redirect('/dashboard');
    } else {
        res.redirect(`/register?email=${email}`);
    }
}