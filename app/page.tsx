import Link from 'next/link';
import HomeAuthCta from '../components/home-auth-cta';
import heroImage from './homepicture.jpg';
import Image from 'next/image';
import { PRODUCTS } from '../lib/products';
import dynamic from 'next/dynamic';
const FlashCarousel = dynamic(() => import('../components/flash-carousel'), { ssr: false });

const flashSaleItems = PRODUCTS.slice(0, 6);

const categoryImages = [
    { label: 'Beauty', image: PRODUCTS[6].image },
    { label: 'Fashion', image: PRODUCTS[7].image },
    { label: 'Electronics', image: PRODUCTS[8].image },
    { label: 'Home', image: PRODUCTS[9].image },
];

const justForYouItems = PRODUCTS.slice(6, 14);

export default function HomePage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-950">
            <section className="relative overflow-hidden px-6 py-16 sm:px-10 lg:px-16">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                    <div className="space-y-6 max-w-2xl">
                        <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 shadow-sm">
                            Vercel build 39bb856
                        </div>
                        <span className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
                            SUMNIWA COLLECTION
                        </span>
                        <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                            Modern handcrafted apparel for bold style.
                        </h1>
                        <p className="max-w-xl text-base leading-8 text-slate-600">
                            Discover the latest seasonal pieces with elegant silhouette, premium textures, and minimalist details designed for everyday confidence.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/products"
                                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                            >
                                Shop the collection
                            </Link>
                            <HomeAuthCta />
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end">
                        <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-200/60 ring-1 ring-slate-200">
                            <div className="absolute left-6 top-6 rounded-full bg-slate-950 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white">
                                NEW
                            </div>
                            <div className="aspect-[4/5] min-h-[360px] overflow-hidden relative">
                                <Image src={heroImage} alt="Model wearing modern apparel" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 40vw" />
                            </div>
                            <div className="space-y-1 p-6 text-slate-900">
                                <strong className="block text-lg">Red Silk Kimono</strong>
                                <span className="text-sm text-slate-600">Elegant, lightweight, season-ready</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 pb-12 sm:px-10 lg:px-16">
                <div className="mx-auto max-w-7xl rounded-3xl border border-slate-300 bg-white shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-6 py-5">
                        <div>
                            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Flash Sale</h2>
                            <p className="mt-1 text-sm font-medium text-slate-700">On Sale Now</p>
                        </div>
                        <Link
                            href="/products"
                            className="inline-flex rounded-lg border border-slate-900 bg-slate-900 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-slate-800"
                        >
                            Shop All Products
                        </Link>
                    </div>

                    <div className="p-4">
                        {/* Flash Sale carousel component */}
                        {/* Import locally to avoid SSR issues */}
                        <FlashCarousel items={flashSaleItems} />
                    </div>
                </div>
            </section>

            <section className="px-6 pb-20 sm:px-10 lg:px-16">
                <div className="mx-auto max-w-7xl">
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Categories</h2>
                    <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {categoryImages.map((category) => (
                            <article key={category.label} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                                <div className="aspect-[4/3] overflow-hidden relative">
                                    <Image src={(category.image as any)?.src ?? category.image} alt={category.label} fill className="object-cover transition duration-300 group-hover:scale-105" sizes="(max-width: 640px) 50vw, 25vw" />
                                </div>
                                <div className="px-4 py-3">
                                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">{category.label}</h3>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 pb-24 sm:px-10 lg:px-16">
                <div className="mx-auto max-w-7xl">
                    <h2 className="text-4xl font-semibold tracking-tight text-slate-900">Just For You</h2>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                        {justForYouItems.map((item) => (
                            <Link key={item.id} href={`/products/${item.id}`} className="block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                                <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                                    <Image src={(item.image as any)?.src ?? item.image} alt={item.name} fill className="object-cover transition duration-300 hover:scale-105" sizes="(max-width: 640px) 50vw, 25vw" />
                                </div>
                                <div className="space-y-1 p-3">
                                    <h3 className="line-clamp-2 text-sm font-medium leading-5 text-slate-900">{item.name}</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-semibold text-orange-600">{item.currency}{item.price.toLocaleString()}</span>
                                        <span className="text-xs font-medium text-slate-500 line-through">{item.currency}{item.original.toLocaleString()}</span>
                                    </div>
                                    <p className="text-xs text-slate-500">Rating {item.rating} ({item.reviews})</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
