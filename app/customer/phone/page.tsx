"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth } from 'firebase/auth';
import { ref, update } from 'firebase/database';
import { firebaseApp, db } from '../../../lib/firebase';

const auth = getAuth(firebaseApp);

export default function CustomerPhonePage() {
    const router = useRouter();
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState<string | null>(null);

    const handleContinue = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = auth.currentUser;
        if (!user) {
            setMessage('Please sign in again.');
            return;
        }

        if (!db) {
            setMessage('Database access is not configured in this deployment.');
            return;
        }

        try {
            const profileRef = ref(db, `customerProfiles/${user.uid}`);
            await update(profileRef, { phone });
            router.push('/customer/profile');
        } catch (error) {
            console.error('Phone save error:', error);
            setMessage('Unable to save phone number. Check your Firebase database rules and try again.');
        }
    };

    return (
        <main className="min-h-[calc(100vh-5rem)] bg-slate-50 px-6 py-10 sm:px-10">
            <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <h1 className="text-2xl font-semibold tracking-tight text-slate-950">Customer Phone</h1>
                <p className="mt-2 text-sm text-slate-600">Add your phone number to complete your profile setup.</p>

                <form onSubmit={handleContinue} className="mt-6 grid gap-4">
                    <label className="grid gap-2 text-sm font-medium text-slate-800">
                        Phone number
                        <input
                            type="tel"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            required
                            placeholder="Enter phone number"
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                        />
                    </label>

                    <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        Continue
                    </button>

                    {message && <p className="text-sm text-rose-600">{message}</p>}
                </form>
            </div>
        </main>
    );
}
