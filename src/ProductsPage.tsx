import { useEffect, useState } from 'react';
import { ProductRecord } from './types';
import { ProductList } from './ProductList';
import { SkeletonItem } from './SkeletonItem';
import { getProductsList } from './api';

export function ProductsPage() {    
    const [isLoading, setLoading] = useState<Boolean>(true);
    const [products, setProducts] = useState<ProductRecord[]>([]);

    useEffect(() => {
        getProductsList().then((response) => {
            setProducts(response);
            setLoading(false);
        });
    }, []);

    if(isLoading) {
        return (
            <div>
                <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6 justify-items-center">
                    {[...Array(12)].map((product: Promise<ProductRecord>, key: number) => (
                        <li key={key}>
                            <div className="max-w-sm bg-white shadow-lg rounded overflow-hidden">
                                <SkeletonItem className="product-image w-full" style={{width: '390px', height: '300px'}} />
                                <div className="p-4">
                                    <div className="text-gray-900 font-bold text-2xl">
                                        <SkeletonItem className="product-reference" style={{width: '350px'}} />
                                    </div>
                                    <SkeletonItem className="product-description mt-2 text-gray-600 text-sm" style={{width: '350px', height: '80px'}} />
                                </div>
                                <div className="p-4 flex item-center justify-between mt-3">
                                    <h1 className="block text-gray-700 font-bold text-xl"><SkeletonItem className="product-price" style={{width: '200px'}} /></h1>
                                    <SkeletonItem className="block product-button px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded" style={{width: '100px', height: '32px'}} />
                                </div>
                            </div>
                        </li>
                    ))};
                </ul>
            </div>
        );
    } else {
        return (
            <ProductList products={products} />
        );
    }
}
