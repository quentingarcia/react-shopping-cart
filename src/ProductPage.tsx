import * as React from 'react';
import generateData from 'data-generator-retail';
import { ProductRecord } from './types';
import { ProductList } from './ProductList';

// Intialise demo data
const data = generateData();

export function ProductPage() {

    // Initialize demo data
    const products = data.products as ProductRecord[];

    return (
        <ProductList products={products} />
    );
}
