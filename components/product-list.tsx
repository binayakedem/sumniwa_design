const dummyProducts = [
    { id: '1', name: 'Running Shoes', price: '$69.99' },
    { id: '2', name: 'Denim Jacket', price: '$89.99' },
    { id: '3', name: 'Wireless Headphones', price: '$129.99' },
];

export default function ProductList() {
    return (
        <div className="grid gap-4">
            {dummyProducts.map((product) => (
                <article key={product.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                    <h2 className="text-lg font-semibold text-slate-950">{product.name}</h2>
                    <p className="mt-1 text-sm font-medium text-slate-700">{product.price}</p>
                    <button
                        type="button"
                        className="mt-4 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        Add to cart
                    </button>
                </article>
            ))}
        </div>
    );
}
