"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { findProduct } from '../../../lib/products';
import { useCart } from '../../../components/cart-context';
import { useToast } from '../../../components/toast-context';

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    const product = findProduct(id);
    const { addToCart } = useCart();
    const { show } = useToast();
    const [qty, setQty] = useState(1);

    if (!product) return <div className="p-8">Product not found.</div>;

    const handleAdd = () => {
        for (let i = 0; i < qty; i++) {
            addToCart({ id: product.id, name: product.name, price: product.price, image: (product.image as any)?.src ?? product.image });
        }
        show(`${qty} × ${product.name} added to cart`);
        router.push('/cart');
    };

    const handleBuyNow = () => {
        for (let i = 0; i < qty; i++) {
            addToCart({ id: product.id, name: product.name, price: product.price, image: (product.image as any)?.src ?? product.image });
        }
        show(`${qty} × ${product.name} added to cart`);
        router.push('/cart');
    };

    return (
        <main className="min-h-[calc(100vh-5rem)] bg-slate-50 px-6 py-10 sm:px-10">
            <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2">
                <div className="rounded bg-white p-4 shadow-sm overflow-hidden group">
                    <div className="mx-auto max-h-96 relative">
                        <Image src={(product.image as any)?.src ?? product.image} alt={product.name} fill className="object-contain transition-transform duration-300 ease-out group-hover:scale-110" sizes="(max-width: 768px) 50vw, 40vw" />
                    </div>
                </div>

                <div className="rounded bg-white p-6 shadow-sm">
                    <h1 className="text-2xl font-semibold text-slate-900">{product.name}</h1>
                    <div className="mt-2 flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <svg key={i} className={`h-4 w-4 ${i < Math.round(product.rating ?? 0) ? 'text-yellow-400' : 'text-slate-300'}`} viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.385 2.46c-.784.57-1.84-.197-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.613 9.401c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.974z" /></svg>
                            ))}
                        </div>
                        <div className="text-sm text-slate-500">Ratings {product.reviews ?? 0}</div>
                    </div>

                    <div className="mt-4">
                        <div className="text-3xl font-bold text-orange-600">{product.currency}{product.price.toLocaleString()}</div>
                        <div className="text-sm text-slate-400 line-through">{product.currency}{product.original.toLocaleString()}</div>
                    </div>

                    <div className="mt-6">
                        <div className="text-sm text-slate-700">{product.description}</div>
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <button className="h-8 w-8 rounded border border-slate-200" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                            <div className="w-10 text-center">{qty}</div>
                            <button className="h-8 w-8 rounded border border-slate-200" onClick={() => setQty((q) => q + 1)}>+</button>
                        </div>

                        <button className="ml-4 rounded bg-cyan-500 px-4 py-2 text-white">Buy Now</button>
                        <button className="rounded bg-orange-500 px-4 py-2 text-white" onClick={handleAdd}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
