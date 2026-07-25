import CartSummary from '../../components/cart-summary';

export default function CartPage() {
    return (
        <main style={{ padding: '2rem' }}>
            <h1>Your Cart</h1>
            <CartSummary />
        </main>
    );
}
