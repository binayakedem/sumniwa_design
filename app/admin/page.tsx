import AdminPanel from '../../components/admin-panel';
import AuthGuard from '../../components/auth-guard';

export default function AdminPage() {
    return (
        <AuthGuard>
            <main className="min-h-[calc(100vh-5rem)] bg-slate-50 px-6 py-10 sm:px-10">
                <div className="mx-auto max-w-4xl space-y-6">
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Admin Dashboard</h1>
                    <AdminPanel />
                </div>
            </main>
        </AuthGuard>
    );
}
