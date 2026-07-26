const cartItems = [
    { id: '1', name: 'Running Shoes', quantity: 1, price: '$69.99' },
    { id: '2', name: 'Wireless Headphones', quantity: 1, price: '$129.99' },
];

export default function CartSummary() {
    return (
        <div className="grid max-w-xl gap-4">
            {cartItems.map((item) => (
                <div key={item.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                    <h2 className="text-lg font-semibold text-slate-950">{item.name}</h2>
                    <p className="mt-1 text-sm text-slate-600">Quantity: {item.quantity}</p>
                    <p className="mt-1 text-sm font-medium text-slate-900">{item.price}</p>
                </div>
            ))}
            <div className="text-base font-semibold text-slate-950">Total: $199.98</div>
        </div>
    );
}
