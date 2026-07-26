"use client";

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseApp } from '../lib/firebase';

const auth = getAuth(firebaseApp);

export default function FirebaseAuthStatus() {
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userData) => {
            setUser(userData?.email ?? null);
        });
        return unsubscribe;
    }, []);

    if (!user) return <p className="mt-4 text-sm text-slate-600">Not signed in.</p>;

    return (
        <div className="mt-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <p className="text-sm text-slate-700">Signed in as <span className="font-semibold text-slate-950">{user}</span></p>
            <button
                type="button"
                onClick={() => signOut(auth)}
                className="mt-3 inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
                Sign out
            </button>
        </div>
    );
}
