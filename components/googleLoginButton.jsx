'use client';

import  signInWithGoogle  from '@/backend/signInWithGoogle';

export default function GoogleLoginButton() {
    return (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
    )
}