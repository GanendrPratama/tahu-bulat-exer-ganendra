'use client';

import  signInWithGoogle  from '@/backend/signInWithGoogle';

export default function GoogleLoginButton() {
    return (
        <div>
            <script src="https://accounts.google.com/gsi/client" async></script>
            <div
                id="g_id_onload"
                data-client_id="<client ID>"
                data-context="signin"
                data-ux_mode="popup"
                data-callback="handleSignInWithGoogle"
                data-nonce=""
                data-auto_select="true"
                data-itp_support="true"
                data-use_fedcm_for_prompt="true"
            ></div>

            <div
                class="g_id_signin"
                data-type="standard"
                data-shape="pill"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left"
            ></div>
        </div>
    )
}
