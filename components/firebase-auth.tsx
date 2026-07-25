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

    if (!user) return <p>Not signed in.</p>;

    return (
        <div>
            <p>Signed in as {user}</p>
            <button type="button" onClick={() => signOut(auth)}>Sign out</button>
        </div>
    );
}
