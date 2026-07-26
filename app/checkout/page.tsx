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
        <main className="min-h-[calc(100vh-5rem)] bg-slate-50 px-4 py-8 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-3xl font-semibold text-slate-900">Checkout</h1>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm ring-1 ring-slate-200">
                        <h2 className="text-lg font-medium text-slate-900">Order summary</h2>
                        <div className="mt-4 space-y-3">
                            {items.length === 0 ? (
                                <p className="text-sm text-slate-500">No items in cart.</p>
                            ) : (
                                items.map((it) => (
                                    <div key={it.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {it.image ? (
                                                <div className="relative h-12 w-12 rounded overflow-hidden">
                                                    <Image src={(it.image as any)?.src ?? it.image} alt={it.name} fill className="object-cover" sizes="48px" />
                                                </div>
                                            ) : (
                                                <div className="h-12 w-12 rounded bg-slate-100" />
                                            )}
                                            <div>
                                                <div className="text-sm font-medium text-slate-900">{it.name}</div>
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
                    </div>

                    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm ring-1 ring-slate-200">
                        <h2 className="text-lg font-medium text-slate-900">Payment & delivery</h2>

                        <label className="mt-4 block text-sm font-medium text-slate-700">Phone number</label>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-3" />

                        <label className="mt-4 block text-sm font-medium text-slate-700">Delivery address</label>
                        <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 w-full rounded-md border border-slate-200 px-3 py-3" rows={4} />

                        <label className="mt-4 block text-sm font-medium text-slate-700">Upload payment proof (optional)</label>
                        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="mt-2" />

                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-start">
                            <div>
                                <div className="text-sm text-slate-600">Scan to pay</div>
                                <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`} alt="QR code" className="mt-2 h-28 w-28 sm:h-40 sm:w-40 rounded-md bg-white p-2" unoptimized width={200} height={200} />
                            </div>

                            <div className="flex flex-col justify-between">
                                <p className="text-sm text-slate-600">After payment, upload your payment screenshot above and submit the form to complete the order.</p>
                                <div className="mt-4 sm:mt-6">
                                    <button disabled={loading} type="submit" className="w-full sm:inline-flex items-center justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
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
