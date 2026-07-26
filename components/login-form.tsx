"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from '../lib/firebase';

const auth = getAuth(firebaseApp);

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/admin');
        } catch (error) {
            setMessage('Failed to sign in. Please check your credentials.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid max-w-sm gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <label className="grid gap-2 text-sm font-medium text-slate-800">
                Admin email
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-800">
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
            </label>
            <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
                Sign in as Admin
            </button>
            {message && <p className="text-sm text-rose-600">{message}</p>}
        </form>
    );
}
