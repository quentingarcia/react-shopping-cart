import * as React from 'react';
import { useParams } from 'react-router';
import { ProductDetail } from './ProductDetail';
import { API, ProductRecord } from './types';

export interface IProductDetailRouteParams {
    id: string;
}

export function ProductPage(props: ProductPageProps) {
    let { id } = useParams<IProductDetailRouteParams>();
    const product: ProductRecord = props.api.getProductById(id) as ProductRecord;

    return <ProductDetail product={product} />;
}

type ProductPageProps = {
    api: API
}
