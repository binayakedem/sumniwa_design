import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/navbar';

export const metadata: Metadata = {
    title: 'Ecommerce Store',
    description: 'Next.js ecommerce frontend with Firebase auth',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
