import LoginForm from '../../../components/login-form';

export default function AdminLoginPage() {
    return (
        <main className="min-h-[calc(100vh-5rem)] bg-slate-50 px-4 py-8 sm:px-10">
            <div className="mx-auto max-w-3xl space-y-6">
                <div className="space-y-2">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Admin access</p>
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Sign in to the admin panel</h1>
                    <p className="text-sm text-slate-600">After a successful sign-in, you will be redirected to the dashboard where you can manage products and orders.</p>
                </div>
                <LoginForm />
            </div>
        </main>
    );
}
