import * as React from 'react';
import generateData from 'data-generator-retail';

// Intialise demo data
const data = generateData();

// Utility function to format price
function formatPrice(price: number) {    
    return (
        new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(price)
    );
}

// Product Type declaration
type ProductRecord = {
    id: number,
    category_id: number,
    reference: string,
    width: number,
    height: number,
    price: number,
    thumbnail: string,
    image: string,
    description: string,
    stock: number
}

function Product(props: ProductProps) {
    return (
        <article className="product-item" itemScope itemType="http://schema.org/Product">
            {props.product.reference} - {formatPrice(props.product.price)}
        </article>
    );
}

type ProductProps = {
    product: ProductRecord
}

export function ProductPage() {

    // Initialize demo data
    const products = data.products as ProductRecord[];

    return (
        <div>
            <ul>
                {products.map((product) => (<li key={product.id}><Product product={product} /></li>))}
            </ul>
        </div>
    );
}
