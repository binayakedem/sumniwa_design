"use client";

import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from '../lib/firebase';

const auth = getAuth(firebaseApp);

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setMessage('Signed in successfully.');
        } catch (error) {
            setMessage('Failed to sign in. Please check your credentials.');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', maxWidth: '360px' }}>
            <label>
                Email
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #ccc' }}
                />
            </label>
            <button type="submit" style={{ padding: '0.75rem', borderRadius: '0.5rem', background: '#0070f3', color: '#fff', border: 'none' }}>
                Sign in
            </button>
            {message && <p>{message}</p>}
        </form>
    );
}
