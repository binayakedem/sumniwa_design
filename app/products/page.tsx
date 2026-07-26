import ProductList from '../../components/product-list';

export default function ProductsPage() {
    return (
        <main className="min-h-[calc(100vh-5rem)] bg-slate-50 px-6 py-10 sm:px-10 lg:px-16">
            <div id="products" className="mx-auto max-w-7xl space-y-6">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Products</h1>
                <ProductList />
            </div>
        </main>
    );
}
