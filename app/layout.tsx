import type { Metadata } from 'next';
import Navbar from '../components/navbar';

export const metadata: Metadata = {
    title: 'Sumniwa Design',
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
