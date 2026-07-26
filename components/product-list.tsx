"use client";

import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '../lib/products';

import { useState } from 'react';
import { useCart } from './cart-context';
import { useToast } from './toast-context';

function Star({ filled }: { filled?: boolean }) {
    return (
        <svg className={`h-4 w-4 ${filled ? 'text-yellow-400' : 'text-slate-300'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.385 2.46c-.784.57-1.84-.197-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.613 9.401c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.974z" />
        </svg>
    );
}

export default function ProductList() {
    const { addToCart } = useCart();
    const { show } = useToast();
    const [addingId, setAddingId] = useState<string | null>(null);

    const handleAdd = (e: React.MouseEvent, p: any) => {
        e.stopPropagation();
        setAddingId(p.id);
        addToCart({ id: p.id, name: p.name, price: p.price, image: (p.image as any)?.src ?? p.image });
        show(`${p.name} added to cart`);
        setTimeout(() => setAddingId(null), 700);
    };

    const handleCardClick = (p: any) => {
        addToCart({ id: p.id, name: p.name, price: p.price, image: (p.image as any)?.src ?? p.image });
    };

    return (
        <section>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {PRODUCTS.map((p) => {
                    const discount = Math.round(((p.original - p.price) / p.original) * 100);
                    return (
                        <Link key={p.id} href={`/products/${p.id}`} className="relative block overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
                            <article className="cursor-pointer">
                                <div className="relative">
                                    <div className="relative h-36 w-full sm:h-40">
                                        <Image src={(p.image as any)?.src ?? p.image} alt={p.name} className="object-cover" fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw" />
                                    </div>
                                    <div className="absolute left-2 top-2 inline-flex items-center rounded-full bg-orange-500 px-2 py-1 text-xs font-semibold text-white">-{discount}%</div>
                                </div>

                                <div className="p-2 sm:p-3">
                                    <h3 className="line-clamp-2 mb-1 text-sm font-medium text-slate-900">{p.name}</h3>

                                    <div className="flex items-end justify-between">
                                        <div>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-sm sm:text-base font-semibold text-orange-600">{p.currency}{p.price.toLocaleString()}</span>
                                                <span className="text-xs text-slate-400 line-through">{p.currency}{p.original.toLocaleString()}</span>
                                            </div>
                                            <div className="mt-2 flex items-center gap-2">
                                                <div className="flex items-center">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <Star key={i} filled={i < Math.round(p.rating ?? 0)} />
                                                    ))}
                                                </div>
                                                <span className="text-xs text-slate-500">({p.reviews})</span>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={(e) => handleAdd(e, p)}
                                            className="ml-3 inline-flex h-9 w-9 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-slate-950 text-white transition hover:bg-slate-800"
                                            aria-label={`Add ${p.name} to cart`}
                                        >
                                            {addingId === p.id ? '✓' : '+'}
                                        </button>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
