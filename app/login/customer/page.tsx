"use client";

import CustomerLogin from '../../../components/customer-login';

export default function CustomerLoginPage() {
    return (
        <main className="min-h-[calc(100vh-5rem)] bg-slate-50 px-6 py-10 sm:px-10">
            <div className="mx-auto max-w-3xl space-y-6">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Customer Login</h1>
                <CustomerLogin />
            </div>
        </main>
    );
}
