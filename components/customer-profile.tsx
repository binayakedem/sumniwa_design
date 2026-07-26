"use client";

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { child, get, ref, update } from 'firebase/database';
import { firebaseApp, db } from '../lib/firebase';

const auth = getAuth(firebaseApp);

export default function CustomerProfile() {
    const router = useRouter();
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const loadProfile = async (currentUser: User) => {
        if (!db) {
            setMessage('Database access is not configured in this deployment.');
            return;
        }

        try {
            const profileRef = ref(db, `customerProfiles/${currentUser.uid}`);
            const profileSnap = await get(profileRef);
            const profileData = profileSnap.exists() ? profileSnap.val() : null;

            setPhone(profileData?.phone ?? currentUser.phoneNumber ?? '');
            setLocation(profileData?.location ?? '');
            setAddress(profileData?.address ?? '');
        } catch (error) {
            console.error('Failed to load profile:', error);
            setMessage('Unable to load your profile. Please check your database rules and try again.');
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setEmail(currentUser?.email ?? '');

            if (currentUser) {
                loadProfile(currentUser);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            setMessage('Please sign in again.');
            return;
        }

        if (!db) {
            setMessage('Database access is not configured in this deployment.');
            return;
        }

        try {
            const profileRef = ref(db, `customerProfiles/${currentUser.uid}`);
            await update(profileRef, {
                phone,
                location,
                address,
                email: currentUser.email,
            });

            setShowEditModal(false);
            setMessage('Profile saved successfully.');
        } catch (error) {
            console.error('Error saving profile:', error);
            setMessage('Unable to save profile. Please try again.');
        }
    };

    const handleSignOut = async () => {
        await signOut(auth);
        router.replace('/login');
    };

    return (
        <section className="grid max-w-2xl gap-4">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h2 className="text-xl font-semibold text-slate-950">Customer Profile</h2>
                <div className="mt-4 grid gap-2 text-sm text-slate-700">
                    <p><strong className="text-slate-900">Email:</strong> {email || 'Not available'}</p>
                    <p><strong className="text-slate-900">Phone:</strong> {phone || 'Not available'}</p>
                    <p><strong className="text-slate-900">Location:</strong> {location || 'Not available'}</p>
                    <p><strong className="text-slate-900">Address:</strong> {address || 'Not available'}</p>
                </div>
            </div>

            <button
                type="button"
                onClick={() => setShowEditModal(true)}
                className="inline-flex w-fit rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
                Edit profile
            </button>

            {message && <p className="text-sm text-slate-700">{message}</p>}

            <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex w-fit rounded-xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
            >
                Sign out
            </button>

            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 py-6">
                    <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-200">
                        <h2 className="text-xl font-semibold text-slate-950">Edit Profile</h2>
                        <form onSubmit={handleSave} className="mt-5 grid gap-4">
                            <label className="grid gap-2 text-sm font-medium text-slate-800">
                                Phone number
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                    placeholder="Enter your phone number"
                                    required
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                                />
                            </label>
                            <label className="grid gap-2 text-sm font-medium text-slate-800">
                                Location
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(event) => setLocation(event.target.value)}
                                    placeholder="City or area"
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                                />
                            </label>
                            <label className="grid gap-2 text-sm font-medium text-slate-800">
                                Address
                                <textarea
                                    value={address}
                                    onChange={(event) => setAddress(event.target.value)}
                                    placeholder="Street address"
                                    rows={4}
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                                />
                            </label>
                            <div className="mt-2 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                                >
                                    Save changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
