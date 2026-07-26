import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/navbar';
import CartProviderWrapper from '../components/cart-provider';
import { ToastProvider } from '../components/toast-context';
import Footer from '../components/footer';

export const metadata: Metadata = {
    title: 'Sumniwa Collection',
    description: 'Next.js ecommerce frontend with Firebase auth',
    viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="antialiased">
            <body className="min-h-screen bg-slate-50 text-slate-900">
                <ToastProvider>
                    <CartProviderWrapper>
                        <Navbar />
                        {children}
                        <Footer />
                    </CartProviderWrapper>
                </ToastProvider>
            </body>
        </html>
    );
}
