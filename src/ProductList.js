import * as React from 'react';

function Product(props) {
    this.id = props.id;
    this.name = props.name;
    this.price = props.price;

    return (
        <div id={'product-'+props.id}>{props.name} - {props.price}</div>
    );
}

function ProductList() {

    // Initialize demo data
    const products = [
        {
            'id' : 0,
            'name' : 'Produit 0',
            'price' : 10.05
        },
        {
            'id': 1,
            'name': 'Produit 1',
            'price': 23.80
        },
    ];

    return (
        <div>
            <ul>
                {products.map((product) => { 
                    return (
                        <li>
                            <article class="product-item" itemscope itemtype="http://schema.org/Product">
                                {product.name}
                            </article>
                        </li>)
                })}
            </ul>
        </div>
    );
}

export default ProductList;
