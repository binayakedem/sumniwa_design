import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Ecommerce Store',
    description: 'Next.js ecommerce frontend with Firebase auth',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
