import * as React from 'react';
import { ProductRecord } from './types';
import { ProductCard } from './ProductCard';

export function ProductList(props: ProductListProps) {

    const {products, handleAddToCart, ...rest} = props;

    return (
        <div {...rest}>
            <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6 justify-items-center">
                {products.map((product) => (<li key={product.id}><ProductCard product={product} handleAddToCart={handleAddToCart} /></li>))}
            </ul>
        </div>
    );
}

type ProductListProps = {
    products: ProductRecord[],
    handleAddToCart: Function
}
