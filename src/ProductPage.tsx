import * as React from 'react';
import generateData from 'data-generator-retail';
import { ProductRecord } from './types';
import { ProductCard } from './ProductCard';

// Intialise demo data
const data = generateData();

export function ProductPage() {

    // Initialize demo data
    const products = data.products as ProductRecord[];

    return (
        <div>
            <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                {products.map((product) => (<li key={product.id}><ProductCard product={product} /></li>))}
            </ul>
        </div>
    );
}
