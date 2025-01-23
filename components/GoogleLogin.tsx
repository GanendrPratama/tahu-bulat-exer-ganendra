"use client"

import { useEffect } from 'react';

const GoogleLoginButton = () => {
    const handleGoogleLogin = async () => {
        const response = await fetch('/api/login-google', {
            method: 'POST',
        });

        if (response.ok) {
            const { url } = await response.json();
            window.location.href = url;
        } else {
            alert('Failed to initiate Google login');
        }
    };

    return (
        <button onClick={handleGoogleLogin}>Login with Google</button>
    );
};

export default GoogleLoginButton;