import CartSummary from '../../components/cart-summary';

export default function CartPage() {
    return (
        <main className="min-h-[calc(100vh-5rem)] bg-slate-50 px-6 py-10 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl space-y-6">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Your Cart</h1>
                <CartSummary />
            </div>
        </main>
    );
}
