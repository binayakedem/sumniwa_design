import firstImg from '../img/first.jpg';
import secondImg from '../img/seond.jpg';
import thirdImg from '../img/third.jpg';
import fourthImg from '../img/fourth.jpg';
import fifthImg from '../img/fifth.jpg';
import sixthImg from '../img/sixth.jpg';
import seventhImg from '../img/seventh.jpg';
import eightImg from '../img/eight.jpg';
import nineImg from '../img/nine.jpg';
import tenthImg from '../img/tenth.jpg';
import eleventImg from '../img/elevent.jpg';
import twelveImg from '../img/twelve.jpg';
import thirteenImg from '../img/thirteen.jpg';
import fourteenImg from '../img/fourteen.jpg';

const categories = [
    { id: 'c1', name: 'Breast Pump Accessories', image: firstImg },
    { id: 'c2', name: 'Vinegar & Cooking Wine', image: secondImg },
    { id: 'c3', name: 'Phone Cases', image: thirdImg },
    { id: 'c4', name: 'Convertible', image: fourthImg },
    { id: 'c5', name: 'Kids Bookcases & Shelving', image: fifthImg },
    { id: 'c6', name: 'Sauna Suits', image: sixthImg },
    { id: 'c7', name: 'Toilet Paper', image: seventhImg },
    { id: 'c8', name: 'Hoodies & Sweatshirts', image: eightImg },
    { id: 'c9', name: 'License Plate Lights', image: nineImg },
    { id: 'c10', name: 'Habitats & Accessories', image: tenthImg },
    { id: 'c11', name: 'Christening', image: eleventImg },
    { id: 'c12', name: 'Bedding Sets', image: twelveImg },
    { id: 'c13', name: 'Ergonomic Accessories', image: thirteenImg },
    { id: 'c14', name: 'Bathroom', image: fourteenImg },
];

export default function CategoryPage() {
    return (
        <main className="min-h-[calc(100vh-5rem)] bg-slate-50 px-4 py-8 sm:px-8">
            <section className="mx-auto w-full max-w-7xl rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <h1 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">Categories</h1>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-0">
                    {categories.map((cat) => (
                        <div key={cat.id} className="flex h-36 flex-col items-center justify-start border border-slate-200 bg-white p-3 text-center">
                            <div className="mb-2 flex h-16 w-16 items-center justify-center overflow-hidden">
                                <img src={(cat.image as any)?.src ?? cat.image} alt={cat.name} className="h-full w-auto object-contain" />
                            </div>
                            <div className="text-xs text-slate-700">{cat.name}</div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
