const cartItems = [
    { id: '1', name: 'Running Shoes', quantity: 1, price: '$69.99' },
    { id: '2', name: 'Wireless Headphones', quantity: 1, price: '$129.99' },
];

export default function CartSummary() {
    return (
        <div style={{ display: 'grid', gap: '1rem', maxWidth: '560px' }}>
            {cartItems.map((item) => (
                <div key={item.id} style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '0.75rem' }}>
                    <h2>{item.name}</h2>
                    <p>Quantity: {item.quantity}</p>
                    <p>{item.price}</p>
                </div>
            ))}
            <div style={{ fontWeight: 'bold' }}>Total: $199.98</div>
        </div>
    );
}
