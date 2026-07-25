const dummyProducts = [
    { id: '1', name: 'Running Shoes', price: '$69.99' },
    { id: '2', name: 'Denim Jacket', price: '$89.99' },
    { id: '3', name: 'Wireless Headphones', price: '$129.99' },
];

export default function ProductList() {
    return (
        <div style={{ display: 'grid', gap: '1rem' }}>
            {dummyProducts.map((product) => (
                <article key={product.id} style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '0.75rem' }}>
                    <h2>{product.name}</h2>
                    <p>{product.price}</p>
                    <button type="button">Add to cart</button>
                </article>
            ))}
        </div>
    );
}
