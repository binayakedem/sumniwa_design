"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useToast } from '../../components/toast-context';
import { useCart } from '../../components/cart-context';

export default function CheckoutPage() {
    const { items, clearCart } = useCart();
    const router = useRouter();
    const toast = useToast();

    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const total = items.reduce((s, it) => s + it.price * it.qty, 0);

    async function readFileAsBase64(f: File) {
        return await new Promise<string>((res, rej) => {
            const reader = new FileReader();
            reader.onload = () => res(String(reader.result));
            reader.onerror = () => rej(new Error('File read error'));
            reader.readAsDataURL(f);
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!phone.trim() || !address.trim()) {
            toast.show('Phone number and address are required');
            return;
        }
        if (!file) {
            toast.show('Please upload payment proof (required)');
            return;
        }
        setLoading(true);
        try {
            let proof: string | undefined;
            proof = await readFileAsBase64(file as File);

            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items, phone, address, paymentProof: proof }),
            });
            const data = await res.json();
            if (res.ok && data.orderId) {
                toast.show('Order placed — thank you!');
                clearCart();
                router.push(`/checkout/success?order=${data.orderId}`);
            } else {
                toast.show(data?.error ?? 'Order failed');
            }
        } catch (err) {
            toast.show('Network error');
        } finally {
            setLoading(false);
        }
    }

    const qrData = `SUMNIWA_ORDER_TOTAL:${total}`;

    return (
        <main className="min-h-[calc(100vh-5rem)] bg-slate-50 px-3 py-6 sm:px-6 lg:px-10 xl:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Order</p>
                        <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Checkout</h1>
                    </div>
                    <p className="text-sm text-slate-600">Please review your order and complete the payment details below.</p>
                </div>

                <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
                    <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
                        <h2 className="text-lg font-medium text-slate-900">Order summary</h2>
                        <div className="mt-4 space-y-3">
                            {items.length === 0 ? (
                                <p className="text-sm text-slate-500">No items in cart.</p>
                            ) : (
                                items.map((it) => (
                                    <div key={it.id} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3">
                                        <div className="flex min-w-0 items-center gap-3">
                                            {it.image ? (
                                                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                                                    <Image src={(it.image as any)?.src ?? it.image} alt={it.name} fill className="object-cover" sizes="48px" />
                                                </div>
                                            ) : (
                                                <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-200" />
                                            )}
                                            <div className="min-w-0">
                                                <div className="truncate text-sm font-medium text-slate-900">{it.name}</div>
                                                <div className="text-xs text-slate-500">Qty {it.qty}</div>
                                            </div>
                                        </div>
                                        <div className="text-sm font-semibold text-slate-900">Rs.{(it.price * it.qty).toLocaleString()}</div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                            <div className="text-sm text-slate-600">Total</div>
                            <div className="text-xl font-semibold text-slate-900">Rs.{total.toLocaleString()}</div>
                        </div>
                    </section>

                    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6">
                        <h2 className="text-lg font-medium text-slate-900">Payment & delivery</h2>

                        <label className="mt-4 block text-sm font-medium text-slate-700">Phone number</label>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100" />

                        <label className="mt-4 block text-sm font-medium text-slate-700">Delivery address</label>
                        <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 min-h-[110px] w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100" rows={4} />

                        <label className="mt-4 block text-sm font-medium text-slate-700">Upload payment proof</label>
                        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="mt-2 block w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white" />

                        <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,140px)_1fr] md:items-start">
                            <div>
                                <div className="text-sm text-slate-600">Scan to pay</div>
                                <div className="mt-2 flex justify-center rounded-2xl bg-slate-50 p-3 md:justify-start">
                                    <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`} alt="QR code" className="h-28 w-28 rounded-xl bg-white p-2 sm:h-36 sm:w-36" unoptimized width={200} height={200} />
                                </div>
                            </div>

                            <div className="flex flex-col justify-between">
                                <p className="text-sm leading-6 text-slate-600">After payment, upload your payment screenshot above and submit the form to complete the order.</p>
                                <div className="mt-4">
                                    <button disabled={loading} type="submit" className="w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70">
                                        {loading ? 'Processing...' : 'Submit order'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
