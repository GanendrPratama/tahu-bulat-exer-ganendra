import { supabase } from './client';

const registerNewUser = async (firstname, lastname, email) => {
    const { error } = await supabase
        .from('profile')
        .insert({
            firstname: firstname,
            lastname: lastname,
            email: email,
            role: 'user'
        });

    if (error) {
        throw new Error(error.message);
    }
};

const findUserByEmail = async (email) => {
    const { data, error } = await supabase
        .from('profile')
        .select()
        .eq('email', email);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

const loginUsingGoogle = async () => {
    await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: 'http://localhost:3000/api/auth/callback'
        }
    });
};

export { registerNewUser, findUserByEmail, loginUsingGoogle };