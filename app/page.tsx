import Link from 'next/link';
import heroImage from './homepicture.jpg';
import firstImage from './img/first.jpg';
import secondImage from './img/seond.jpg';
import thirdImage from './img/third.jpg';
import fourthImage from './img/fourth.jpg';
import fifthImage from './img/fifth.jpg';
import sixthImage from './img/sixth.jpg';
import seventhImage from './img/seventh.jpg';
import eightImage from './img/eight.jpg';
import nineImage from './img/nine.jpg';
import tenthImage from './img/tenth.jpg';
import eleventImage from './img/elevent.jpg';
import twelveImage from './img/twelve.jpg';
import thirteenImage from './img/thirteen.jpg';
import fourteenImage from './img/fourteen.jpg';

const flashSaleItems = [
    { name: 'Horlicks Classic Malt Jar 500 gm', price: 'Rs.444', oldPrice: 'Rs.445', image: firstImage.src },
    { name: 'Summer Half Shorts Collection', price: 'Rs.499', oldPrice: 'Rs.850', image: secondImage.src },
    { name: 'Lightweight Pullover Jacket', price: 'Rs.599', oldPrice: 'Rs.1,499', image: thirdImage.src },
    { name: 'Scalp Massage Brush', price: 'Rs.99', oldPrice: 'Rs.120', image: fourthImage.src },
    { name: 'Exfoliating Gloves Body Care', price: 'Rs.99', oldPrice: 'Rs.350', image: fifthImage.src },
    { name: 'Snail Facial Mask Pack', price: 'Rs.54', oldPrice: 'Rs.90', image: sixthImage.src },
];

const categoryImages = [
    { label: 'Beauty', image: seventhImage.src },
    { label: 'Fashion', image: eightImage.src },
    { label: 'Electronics', image: nineImage.src },
    { label: 'Home', image: tenthImage.src },
];

const justForYouItems = [
    { name: 'Premium Super Soft Bed Floor Carpet', price: 'Rs.1,399', oldPrice: 'Rs.2,499', image: eleventImage.src, rating: '4.8', reviews: 13 },
    { name: 'Men Premium Summer Combo Set', price: 'Rs.1,099', oldPrice: 'Rs.1,899', image: twelveImage.src, rating: '4.6', reviews: 12 },
    { name: 'Elegant Womens Lace Set', price: 'Rs.181', oldPrice: 'Rs.499', image: thirteenImage.src, rating: '4.7', reviews: 3 },
    { name: 'Soft Velvet Thick Carpet Mat', price: 'Rs.1,599', oldPrice: 'Rs.3,299', image: fourteenImage.src, rating: '4.5', reviews: 1 },
    { name: 'Suction Cup Phone Case Mount', price: 'Rs.90', oldPrice: 'Rs.399', image: firstImage.src, rating: '4.7', reviews: 36 },
    { name: 'Portable High-Speed Handheld Fan', price: 'Rs.563', oldPrice: 'Rs.1,499', image: secondImage.src, rating: '4.4', reviews: 2 },
    { name: 'Modern Fashion Hoodie Set', price: 'Rs.899', oldPrice: 'Rs.1,699', image: thirdImage.src, rating: '4.6', reviews: 9 },
    { name: 'Compact Home Utility Organizer', price: 'Rs.749', oldPrice: 'Rs.1,350', image: fourthImage.src, rating: '4.5', reviews: 7 },
];

export default function HomePage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-950">
            <section className="relative overflow-hidden px-6 py-16 sm:px-10 lg:px-16">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                    <div className="space-y-6 max-w-2xl">
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
                            <Link
                                href="/login"
                                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:border-slate-300 hover:bg-slate-50"
                            >
                                Sign in
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end">
                        <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-slate-200/60 ring-1 ring-slate-200">
                            <div className="absolute left-6 top-6 rounded-full bg-slate-950 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white">
                                NEW
                            </div>
                            <div className="aspect-[4/5] min-h-[360px] overflow-hidden">
                                <img
                                    src={heroImage.src}
                                    alt="Model wearing modern apparel"
                                    className="h-full w-full object-cover"
                                />
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

                    <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                        {flashSaleItems.map((item) => (
                            <article key={item.name} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                                <div className="aspect-square overflow-hidden rounded-xl bg-slate-100">
                                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                </div>
                                <h3 className="mt-3 line-clamp-2 text-sm font-medium leading-5 text-slate-900">{item.name}</h3>
                                <p className="mt-1 text-3xl font-semibold text-slate-900">{item.price}</p>
                                <p className="text-sm text-slate-500 line-through">{item.oldPrice}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 pb-20 sm:px-10 lg:px-16">
                <div className="mx-auto max-w-7xl">
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Categories</h2>
                    <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {categoryImages.map((category) => (
                            <article key={category.label} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img
                                        src={category.image}
                                        alt={category.label}
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                    />
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
                            <article key={item.name} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                                    <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-300 hover:scale-105" />
                                </div>
                                <div className="space-y-1 p-3">
                                    <h3 className="line-clamp-2 text-sm font-medium leading-5 text-slate-900">{item.name}</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-semibold text-orange-600">{item.price}</span>
                                        <span className="text-xs font-medium text-slate-500 line-through">{item.oldPrice}</span>
                                    </div>
                                    <p className="text-xs text-slate-500">Rating {item.rating} ({item.reviews})</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
