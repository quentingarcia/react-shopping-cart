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

/*function Product(product: Ressource) {
    return ()
        <div>{product.name} - {product.price}</div>
    );
}*/

function ProductPage() {

    // Initialize demo data
    const products = data.products;

    return (
        <div>
            <ul>
                {products.map((product) => { 
                    return (
                        <li>
                            <article className="product-item" itemScope itemType="http://schema.org/Product">
                                {product.reference} - {formatPrice(product.price)}
                            </article>
                        </li>)
                })}
            </ul>
        </div>
    );
}

export default ProductPage;
