import * as React from 'react';
import { useParams } from 'react-router';
import { ProductDetail } from './ProductDetail';
import { API, ProductRecord } from './types';

export interface IProductDetailRouteParams {
    id: string;
}

export function ProductPage(props: ProductPageProps) {
    
    const {api, handleAddToCart, ...rest} = props;

    let { id } = useParams<IProductDetailRouteParams>();
    const product: ProductRecord = api.getProductById(id) as ProductRecord;

    return <ProductDetail product={product} handleAddToCart={handleAddToCart} />;
}

type ProductPageProps = {
    api: API,
    handleAddToCart: Function
}
