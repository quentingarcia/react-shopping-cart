import * as React from 'react';
import { API } from './types';
import { ProductList } from './ProductList';

export function ProductsPage(props: ProductsPageProps) {
    return (
        <ProductList products={props.api.getProductsList()} handleAddToCart={props.handleAddToCart} />
    );
}

type ProductsPageProps = {
    api: API,
    handleAddToCart: Function
}
