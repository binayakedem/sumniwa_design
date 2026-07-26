"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from './cart-context';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { firebaseApp } from '../lib/firebase';

const auth = getAuth(firebaseApp);

function GoogleAccountIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
            <path fill="#EA4335" d="M12 10.2v3.95h5.62c-.25 1.3-1 2.4-2.1 3.15v2.62h3.4c1.98-1.82 3.12-4.5 3.12-7.69 0-.74-.07-1.46-.2-2.03H12z" />
            <path fill="#34A853" d="M12 24c2.68 0 4.93-.89 6.58-2.41l-3.4-2.62c-.94.63-2.14 1-3.18 1-2.44 0-4.51-1.65-5.25-3.87H3.15v2.72A11.99 11.99 0 0 0 12 24z" />
            <path fill="#FBBC05" d="M6.75 16.1c-.2-.6-.32-1.24-.32-1.9s.12-1.3.32-1.9V9.58H3.15A11.99 11.99 0 0 0 0 12c0 1.94.46 3.77 1.26 5.37l5.49-4.27z" />
            <path fill="#4285F4" d="M12 4.75c1.46 0 2.79.5 3.84 1.48l2.88-2.88A11.62 11.62 0 0 0 12 0C7.64 0 3.85 2.48 1.26 6.63l5.49 4.27C7.49 6.4 9.56 4.75 12 4.75z" />
        </svg>
    );
}

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const { totalItems } = useCart();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);

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
                        aria-controls="primary-navigation"
                        className="inline-flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-full border border-slate-200 bg-white text-slate-900 md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300"
                        aria-expanded={menuOpen}
                        aria-label="Toggle navigation menu"
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        <span className="sr-only">Toggle main navigation</span>
                        <span className={menuOpen ? 'h-0.5 w-5 translate-y-1.5 rotate-45 rounded-full bg-slate-900 transition' : 'h-0.5 w-5 rounded-full bg-slate-900 transition'} />
                        <span className={menuOpen ? 'h-0.5 w-5 opacity-0 rounded-full bg-slate-900 transition' : 'h-0.5 w-5 rounded-full bg-slate-900 transition'} />
                        <span className={menuOpen ? 'h-0.5 w-5 -translate-y-1.5 -rotate-45 rounded-full bg-slate-900 transition' : 'h-0.5 w-5 rounded-full bg-slate-900 transition'} />
                    </button>
                </div>

                <div
                    id="primary-navigation"
                    className={`w-full md:grid md:flex-1 md:grid-cols-[1fr_auto_1fr] md:items-center overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'} md:overflow-visible md:max-h-none md:opacity-100`}
                >
                    <nav className="flex flex-col gap-3 border-t border-slate-200 py-4 md:col-start-2 md:justify-self-center md:border-none md:flex-row md:gap-8 md:py-0">
                        <Link href="/" className="text-sm font-medium text-slate-700 transition hover:text-slate-950 px-2 py-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-200" onClick={() => setMenuOpen(false)}>
                            Home
                        </Link>
                        <Link href="/category" className="text-sm font-medium text-slate-700 transition hover:text-slate-950 px-2 py-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-200" onClick={() => setMenuOpen(false)}>
                            Category
                        </Link>
                        <Link href="/products" className="text-sm font-medium text-slate-700 transition hover:text-slate-950 px-2 py-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-200" onClick={() => setMenuOpen(false)}>
                            Products
                        </Link>
                    </nav>

                    <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 md:col-start-3 md:justify-self-end md:border-none md:flex-row md:items-center md:gap-3 md:pt-0">
                        <Link href="/cart" className="relative inline-flex items-center text-sm font-medium text-slate-700 transition hover:text-slate-950 px-2 py-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-200" onClick={() => setMenuOpen(false)}>
                            Cart
                            {totalItems > 0 && (
                                <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 px-1.5 text-xs font-semibold text-white">{totalItems}</span>
                            )}
                        </Link>
                        {!user ? (
                            <Link
                                href="/login"
                                className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-200"
                                onClick={() => setMenuOpen(false)}
                            >
                                Sign in
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={profileLink}
                                    className="inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white text-slate-950 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-200"
                                    onClick={() => setMenuOpen(false)}
                                    aria-label="Open account"
                                >
                                    {user?.photoURL ? (
                                        <img src={user.photoURL} alt="Customer avatar" className="h-full w-full object-cover" />
                                    ) : (
                                        <GoogleAccountIcon />
                                    )}
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
