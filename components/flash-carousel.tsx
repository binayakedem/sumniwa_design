"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function FlashCarousel({ items }: { items: any[] }) {
    const scrollerRef = useRef<HTMLDivElement | null>(null);

    const scroll = (dir: 'left' | 'right') => {
        const el = scrollerRef.current;
        if (!el) return;
        const scrollAmount = el.clientWidth * 0.8;
        el.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    };

    return (
        <div className="relative">
            <div className="absolute left-3 top-1/2 z-10 -translate-y-1/2">
                <button
                    aria-label="Scroll left"
                    onClick={() => scroll('left')}
                    className="hidden h-10 w-10 items-center justify-center rounded-full bg-white shadow-md md:flex"
                >
                    ‹
                </button>
            </div>

            <div
                ref={scrollerRef}
                className="no-scrollbar relative flex gap-4 overflow-x-auto px-4 py-3 scroll-smooth md:px-6 md:py-4"
                style={{ WebkitOverflowScrolling: 'touch' }}
            >
                {items.map((item) => (
                    <Link key={item.id} href={`/products/${item.id}`} className="min-w-[220px] max-w-[260px] flex-shrink-0">
                        <article className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                            <div className="aspect-square overflow-hidden rounded-xl bg-slate-100 relative">
                                <Image src={(item.image as any)?.src ?? item.image} alt={item.name} className="object-cover" fill sizes="220px" />
                            </div>
                            <h3 className="mt-3 line-clamp-2 text-sm font-medium leading-5 text-slate-900">{item.name}</h3>
                            <p className="mt-1 text-2xl font-semibold text-slate-900">{item.currency}{item.price.toLocaleString()}</p>
                            <p className="text-sm text-slate-500 line-through">{item.currency}{item.original.toLocaleString()}</p>
                        </article>
                    </Link>
                ))}
            </div>

            <div className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
                <button
                    aria-label="Scroll right"
                    onClick={() => scroll('right')}
                    className="hidden h-10 w-10 items-center justify-center rounded-full bg-white shadow-md md:flex"
                >
                    ›
                </button>
            </div>
        </div>
    );
}
