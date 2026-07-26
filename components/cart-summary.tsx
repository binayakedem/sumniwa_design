"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from './cart-context';

export default function CartSummary() {
    const { items, updateQty, removeFromCart, clearCart } = useCart();

    const total = items.reduce((s, it) => s + it.price * it.qty, 0);

    if (items.length === 0)
        return (
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
                <p className="text-lg font-medium text-slate-700">Your cart is empty.</p>
                <p className="mt-2 text-sm text-slate-500">Looks like you haven't added anything yet.</p>
                <div className="mt-4">
                    <Link href="/products#products" className="inline-flex items-center rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
                        Go to products
                    </Link>
                </div>
            </div>
        );

    return (
        <div className="grid max-w-7xl gap-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 border-b border-slate-100 py-3 last:border-b-0">
                        {item.image ? (
                            <div className="relative h-16 w-16 flex-none rounded overflow-hidden">
                                <Image src={(item.image as any)?.src ?? item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                            </div>
                        ) : (
                            <div className="h-16 w-16 flex-none rounded bg-slate-100" />
                        )}

                        <div className="flex-1">
                            <div className="text-sm font-medium text-slate-900">{item.name}</div>
                            <div className="mt-1 text-sm text-slate-500">{item.currency ?? ''}{item.price.toLocaleString()}</div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                className="h-8 w-8 rounded border border-slate-200 bg-white text-slate-700"
                                onClick={() => updateQty(item.id, item.qty - 1)}
                                aria-label={`Decrease ${item.name} quantity`}
                            >
                                −
                            </button>
                            <div className="w-10 text-center text-sm">{item.qty}</div>
                            <button
                                className="h-8 w-8 rounded border border-slate-200 bg-white text-slate-700"
                                onClick={() => updateQty(item.id, item.qty + 1)}
                                aria-label={`Increase ${item.name} quantity`}
                            >
                                +
                            </button>

                            <div className="ml-4 text-sm font-medium text-slate-900">{item.currency ?? ''}{(item.price * item.qty).toLocaleString()}</div>

                            <button className="ml-3 text-sm text-red-600" onClick={() => removeFromCart(item.id)}>
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <div>
                    <div className="text-sm text-slate-600">Total items: {items.reduce((s, it) => s + it.qty, 0)}</div>
                    <div className="text-xl font-semibold text-slate-900">Total: Rs.{total.toLocaleString()}</div>
                </div>

                <div className="flex gap-3">
                    <button className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm" onClick={() => clearCart()}>
                        Clear cart
                    </button>
                    <Link href="/checkout" className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white inline-flex items-center justify-center">Checkout</Link>
                </div>
            </div>
        </div>
    );
}
