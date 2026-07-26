"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { firebaseApp } from '../lib/firebase';

const auth = getAuth(firebaseApp);

function getInitials(user: User | null) {
    if (!user) return '?';
    const name = user.displayName || user.email || '';
    return name
        .split(' ')
        .map((part) => part[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);

    const handleSignOut = async () => {
        await signOut(auth);
        window.location.href = '/login';
    };

    const isGoogleCustomer = user?.providerData?.some((provider) => provider.providerId === 'google.com');
    const profileLink = isGoogleCustomer ? '/customer/profile' : '/admin';

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-10">
                <div className="flex items-center justify-between gap-6">
                    <Link href="/" className="text-2xl font-bold uppercase tracking-[0.3em] text-slate-950">
                        sumniwa
                    </Link>
                    <button
                        type="button"
                        className="inline-flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-full border border-slate-200 bg-white text-slate-900 md:hidden"
                        aria-expanded={menuOpen}
                        aria-label="Toggle navigation menu"
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        <span className={menuOpen ? 'h-0.5 w-5 translate-y-1.5 rotate-45 rounded-full bg-slate-900 transition' : 'h-0.5 w-5 rounded-full bg-slate-900 transition'} />
                        <span className={menuOpen ? 'h-0.5 w-5 opacity-0 rounded-full bg-slate-900 transition' : 'h-0.5 w-5 rounded-full bg-slate-900 transition'} />
                        <span className={menuOpen ? 'h-0.5 w-5 -translate-y-1.5 -rotate-45 rounded-full bg-slate-900 transition' : 'h-0.5 w-5 rounded-full bg-slate-900 transition'} />
                    </button>
                </div>

                <div className={`${menuOpen ? 'block' : 'hidden'} w-full md:grid md:flex-1 md:grid-cols-[1fr_auto_1fr] md:items-center`}>
                    <nav className="flex flex-col gap-4 border-t border-slate-200 py-4 md:col-start-2 md:justify-self-center md:border-none md:flex-row md:gap-8 md:py-0">
                        <Link href="/" className="text-sm font-medium text-slate-700 transition hover:text-slate-950" onClick={() => setMenuOpen(false)}>
                            Home
                        </Link>
                        <Link href="/category" className="text-sm font-medium text-slate-700 transition hover:text-slate-950" onClick={() => setMenuOpen(false)}>
                            Category
                        </Link>
                        <Link href="/products" className="text-sm font-medium text-slate-700 transition hover:text-slate-950" onClick={() => setMenuOpen(false)}>
                            Products
                        </Link>
                    </nav>

                    <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 md:col-start-3 md:justify-self-end md:border-none md:flex-row md:items-center md:gap-3 md:pt-0">
                        <Link href="/cart" className="text-sm font-medium text-slate-700 transition hover:text-slate-950" onClick={() => setMenuOpen(false)}>
                            Cart
                        </Link>
                        {!user ? (
                            <Link
                                href="/login"
                                className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-50"
                                onClick={() => setMenuOpen(false)}
                            >
                                Sign in
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={profileLink}
                                    className="inline-flex items-center gap-3 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold uppercase text-white">
                                        {getInitials(user)}
                                    </span>
                                    <span>{user.email?.split('@')[0]}</span>
                                </Link>
                                <button
                                    type="button"
                                    className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                                    onClick={handleSignOut}
                                >
                                    Sign out
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
