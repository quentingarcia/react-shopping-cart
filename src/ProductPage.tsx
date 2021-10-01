import * as React from 'react';
import generateData from 'data-generator-retail';

const data = generateData();

function formatPrice(price: number) {    
    return (
        <span>{new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(price)}
        </span>
    );
}

type Product = {
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

function Product(product: Product) {
    return (
        <li>
            <article className="product-item" itemScope itemType="http://schema.org/Product">
                {product.reference} - {formatPrice(product.price)}
            </article>
        </li>
    );
}

function ProductPage() {

    // Initialize demo data
    const products = data.products;

    return (
        <div>
            <ul>
                {products.map((product) => { 
                    return (<Product {...product}></Product>)
                })}
            </ul>
        </div>
    );
}

export default ProductPage;
