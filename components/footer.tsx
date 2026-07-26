"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useToast } from './toast-context';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            toast.show('Please enter a valid email address');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                toast.show('Thanks — check your inbox for confirmation');
                setEmail('');
            } else {
                toast.show(data?.error ?? 'Subscription failed');
            }
        } catch (err) {
            toast.show('Network error — try again later');
        } finally {
            setLoading(false);
        }
    }

    return (
        <footer className="mt-12 border-t border-slate-200 bg-white text-slate-700">
            <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">Sumniwa</h3>
                        <p className="mt-3 text-sm text-slate-600">Modern handcrafted apparel and curated home goods. Free returns within 14 days.</p>
                        <div className="mt-4 flex items-center gap-3">
                            <a aria-label="Twitter" href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200">T</a>
                            <a aria-label="Facebook" href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200">F</a>
                            <a aria-label="Instagram" href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200">I</a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-slate-900">Shop</h4>
                        <ul className="mt-3 space-y-2 text-sm">
                            <li><Link href="/products" className="text-slate-600 hover:text-slate-900">All products</Link></li>
                            <li><Link href="/category" className="text-slate-600 hover:text-slate-900">Categories</Link></li>
                            <li><Link href="/cart" className="text-slate-600 hover:text-slate-900">Cart</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-slate-900">Customer</h4>
                        <ul className="mt-3 space-y-2 text-sm">
                            <li><Link href="/login" className="text-slate-600 hover:text-slate-900">Sign in</Link></li>
                            <li><a href="#" className="text-slate-600 hover:text-slate-900">Orders</a></li>
                            <li><a href="#" className="text-slate-600 hover:text-slate-900">Shipping</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-slate-900">Subscribe</h4>
                        <p className="mt-3 text-sm text-slate-600">Get exclusive offers and updates.</p>
                        <form onSubmit={handleSubmit} className="mt-3 flex w-full max-w-sm gap-2">
                            <input aria-label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-200" />
                            <button disabled={loading} className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white">{loading ? 'Sending...' : 'Subscribe'}</button>
                        </form>
                    </div>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-6 text-sm text-slate-500">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div>© {new Date().getFullYear()} Sumniwa. All rights reserved.</div>
                        <div className="flex items-center gap-4">
                            <Link href="/terms" className="hover:text-slate-900">Terms</Link>
                            <Link href="/privacy" className="hover:text-slate-900">Privacy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
