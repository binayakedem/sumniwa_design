"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from '../lib/firebase';

const auth = getAuth(firebaseApp);

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
                router.replace('/login');
            }
            setLoading(false);
        });

        return unsubscribe;
    }, [router]);

    if (loading) {
        return <p className="px-6 py-10 text-sm text-slate-600 sm:px-10">Checking authentication...</p>;
    }

    if (!authenticated) {
        return null;
    }

    return <>{children}</>;
}
