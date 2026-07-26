"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseApp } from '../lib/firebase';

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export default function CustomerLogin() {
    const router = useRouter();
    const [message, setMessage] = useState<string | null>(null);

    const handleGoogleSignIn = async () => {
        setMessage(null);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            if (!result.user) {
                setMessage('Unable to read authenticated user. Please try again.');
                return;
            }

            router.push('/customer/phone');
        } catch (error: any) {
            console.error('Google sign-in error:', error);
            if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
                setMessage('Popup was blocked. Please allow popups or try again.');
            } else {
                setMessage('Failed to sign in with Google. Please try again.');
            }
        }
    };

    return (
        <div className="grid max-w-sm gap-4">
            <button
                type="button"
                onClick={handleGoogleSignIn}
                className="inline-flex items-center justify-center rounded-xl bg-[#4285f4] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3a78df]"
            >
                Continue with Google
            </button>
            {message && <p className="text-sm text-rose-600">{message}</p>}
        </div>
    );
}
