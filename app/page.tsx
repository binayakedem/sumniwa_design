import Link from 'next/link';

export default function HomePage() {
    return (
        <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
            <h1>Welcome to the Ecommerce Store</h1>
            <p>Shop products, manage your cart, and sign in as admin.</p>
            <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
                <Link href="/products">Browse Products</Link>
                <Link href="/cart">View Cart</Link>
                <Link href="/login">Sign In</Link>
                <Link href="/admin">Admin Dashboard</Link>
            </div>
        </main>
    );
}
