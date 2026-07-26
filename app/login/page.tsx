import Link from 'next/link';
import CustomerLogin from '../../components/customer-login';

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

export default function LoginPage() {
    return (
        <main className="min-h-[calc(100vh-5rem)] bg-slate-100 px-4 py-4 sm:px-6 lg:px-8">
            <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-300/40 lg:grid-cols-[1.05fr_0.95fr]">
                <section className="relative flex min-h-[340px] items-center justify-center overflow-hidden bg-[#221914] px-8 py-14 text-white sm:px-12 lg:min-h-full lg:px-16">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_42%),radial-gradient(circle_at_center,_rgba(255,255,255,0.04),_transparent_58%)]" />
                    <div className="relative z-10 max-w-lg text-center lg:text-left">
                        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/70">Sumniwa</p>
                        <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Manage your shopping with ease</h2>
                        <p className="mt-4 text-base leading-7 text-white/70">
                            Sign in to continue browsing new arrivals, flash deals, and your saved cart.
                        </p>
                    </div>
                </section>

                <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
                    <div className="w-full max-w-md">
                        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Sign In</h1>

                        <form className="mt-8 grid gap-4">
                            <label className="grid gap-2">
                                <span className="text-sm font-medium text-slate-600">Email or Username</span>
                                <input
                                    type="text"
                                    placeholder="Email or Username"
                                    className="w-full rounded-full border border-slate-200 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                                />
                            </label>

                            <CustomerLogin />

                            <Link
                                href="/login/admin"
                                className="inline-flex items-center justify-center gap-3 rounded-full bg-slate-950 px-5 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                <MailIcon />
                                <span>Continue with Email</span>
                            </Link>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    );
}
