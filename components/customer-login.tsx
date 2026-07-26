"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { get, ref } from 'firebase/database';
import { firebaseApp, db } from '../lib/firebase';

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export default function CustomerLogin() {
    const router = useRouter();
    const [message, setMessage] = useState<string | null>(null);

    const handleGoogleSignIn = async () => {
        setMessage(null);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            if (!user) {
                setMessage('Unable to read authenticated user. Please try again.');
                return;
            }

            if (!db) {
                setMessage('Signed in successfully, but database access is not configured in this deployment.');
                router.push('/customer/phone');
                return;
            }

            let nextRoute = '/customer/phone';
            try {
                const profileRef = ref(db, `customerProfiles/${user.uid}`);
                const profileSnap = await get(profileRef);
                const profileData = profileSnap.exists() ? profileSnap.val() : null;

                if (profileData?.phone) {
                    nextRoute = '/customer/profile';
                }
            } catch (dbError) {
                console.warn('Profile lookup failed after login:', dbError);
                setMessage('Signed in successfully, but unable to load profile data due to database permission rules.');
                nextRoute = '/customer/phone';
            }

            router.push(nextRoute);
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
