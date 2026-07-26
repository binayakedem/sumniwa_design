"use client";

import FirebaseAuthStatus from './firebase-auth';

export default function AdminPanel() {
    return (
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold text-slate-950">Admin Controls</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">Only authenticated admin users should access this section.</p>
            <FirebaseAuthStatus />
            <div className="mt-4 flex flex-wrap gap-3">
                <button
                    type="button"
                    className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                    Manage Products
                </button>
                <button
                    type="button"
                    className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                    View Orders
                </button>
            </div>
        </section>
    );
}
