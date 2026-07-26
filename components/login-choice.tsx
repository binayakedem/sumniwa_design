"use client";

import Link from 'next/link';

function GoogleIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
            <path fill="#EA4335" d="M12 10.2v3.95h5.62c-.25 1.3-1 2.4-2.1 3.15v2.62h3.4c1.98-1.82 3.12-4.5 3.12-7.69 0-.74-.07-1.46-.2-2.03H12z" />
            <path fill="#34A853" d="M12 24c2.68 0 4.93-.89 6.58-2.41l-3.4-2.62c-.94.63-2.14 1-3.18 1-2.44 0-4.51-1.65-5.25-3.87H3.15v2.72A11.99 11.99 0 0 0 12 24z" />
            <path fill="#FBBC05" d="M6.75 16.1c-.2-.6-.32-1.24-.32-1.9s.12-1.3.32-1.9V9.58H3.15A11.99 11.99 0 0 0 0 12c0 1.94.46 3.77 1.26 5.37l5.49-4.27z" />
            <path fill="#4285F4" d="M12 4.75c1.46 0 2.79.5 3.84 1.48l2.88-2.88A11.62 11.62 0 0 0 12 0C7.64 0 3.85 2.48 1.26 6.63l5.49 4.27C7.49 6.4 9.56 4.75 12 4.75z" />
        </svg>
    );
}

function MailIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 text-slate-700">
            <path
                fill="currentColor"
                d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4.5-8 5-8-5V6l8 5 8-5v2.5Z"
            />
        </svg>
    );
}

export default function LoginChoice() {
    return (
        <div className="grid max-w-md gap-4">
            <Link
                href="/login/customer"
                className="inline-flex items-center gap-3 rounded-2xl border border-slate-300 bg-white px-5 py-4 text-sm font-semibold text-slate-950 transition hover:border-slate-400 hover:bg-slate-50"
            >
                <GoogleIcon />
                <span>Continue with Google</span>
            </Link>
            <Link
                href="/login/admin"
                className="inline-flex items-center gap-3 rounded-2xl border border-slate-300 bg-white px-5 py-4 text-sm font-semibold text-slate-950 transition hover:border-slate-400 hover:bg-slate-50"
            >
                <MailIcon />
                <span>Continue with Email</span>
            </Link>
        </div>
    );
}
