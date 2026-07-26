import firstImg from '../app/img/first.jpg';
import secondImg from '../app/img/seond.jpg';
import thirdImg from '../app/img/third.jpg';
import fourthImg from '../app/img/fourth.jpg';
import fifthImg from '../app/img/fifth.jpg';
import sixthImg from '../app/img/sixth.jpg';
import seventhImg from '../app/img/seventh.jpg';
import eightImg from '../app/img/eight.jpg';
import nineImg from '../app/img/nine.jpg';
import tenthImg from '../app/img/tenth.jpg';
import eleventImg from '../app/img/elevent.jpg';
import twelveImg from '../app/img/twelve.jpg';
import thirteenImg from '../app/img/thirteen.jpg';
import fourteenImg from '../app/img/fourteen.jpg';

export type Product = {
    id: string;
    name: string;
    image: any;
    price: number;
    original: number;
    currency?: string;
    rating?: number;
    reviews?: number;
    description?: string;
};

export const PRODUCTS: Product[] = [
    { id: '1', name: 'HY320 Mini 4K Android Projector', image: firstImg, price: 9980, original: 19960, currency: 'Rs.', rating: 4.2, reviews: 10, description: 'Mini 4K projector with Android OS, compact and portable.' },
    { id: '2', name: 'Super Soft 3D Premium Velvet Carpet', image: secondImg, price: 1599, original: 3333, currency: 'Rs.', rating: 4.8, reviews: 1, description: 'Premium velvet carpet for comfort and decor.' },
    { id: '3', name: 'Body Tape for Women', image: thirdImg, price: 260, original: 400, currency: 'Rs.', rating: 4.3, reviews: 83, description: 'Skin-friendly body tape for fashion use.' },
    { id: '4', name: 'VESTEL 32" Smart TV', image: fourthImg, price: 18490, original: 27999, currency: 'Rs.', rating: 4.6, reviews: 313, description: '32-inch Smart TV with HDR support.' },
    { id: '5', name: 'Mini USB HUB 3.0 4 Ports', image: fifthImg, price: 290, original: 500, currency: 'Rs.', rating: 4.1, reviews: 499, description: 'Compact USB hub with 4 ports.' },
    { id: '6', name: 'Quick Dry Sports Shoes', image: sixthImg, price: 899, original: 1299, currency: 'Rs.', rating: 4.0, reviews: 42, description: 'Lightweight sports shoes for daily run.' },
    { id: '7', name: 'Readymade Georgette Blouse', image: seventhImg, price: 1200, original: 1999, currency: 'Rs.', rating: 4.4, reviews: 82, description: 'Stylish georgette blouse ready to wear.' },
    { id: '8', name: 'Fancy Saree', image: eightImg, price: 232, original: 499, currency: 'Rs.', rating: 4.1, reviews: 12, description: 'Colorful saree with delicate prints.' },
    { id: '9', name: 'Kemei Hair Straightener', image: nineImg, price: 718, original: 1299, currency: 'Rs.', rating: 4.0, reviews: 34, description: 'Ceramic hair straightener for smooth hair.' },
    { id: '10', name: 'Freefire Diamond Package', image: tenthImg, price: 120, original: 199, currency: 'Rs.', rating: 4.7, reviews: 210, description: 'In-game diamonds package.' },
    { id: '11', name: 'Extra Product Eleven', image: eleventImg, price: 799, original: 999, currency: 'Rs.', rating: 3.9, reviews: 8, description: 'Additional sample product.' },
    { id: '12', name: 'Extra Product Twelve', image: twelveImg, price: 1599, original: 1999, currency: 'Rs.', rating: 4.5, reviews: 47, description: 'Additional sample product.' },
    { id: '13', name: 'Extra Product Thirteen', image: thirteenImg, price: 2499, original: 3199, currency: 'Rs.', rating: 4.6, reviews: 65, description: 'Additional sample product.' },
    { id: '14', name: 'Extra Product Fourteen', image: fourteenImg, price: 1199, original: 1899, currency: 'Rs.', rating: 4.2, reviews: 22, description: 'Additional sample product.' },
];

export function findProduct(id: string) {
    return PRODUCTS.find((p) => p.id === id) ?? null;
}
