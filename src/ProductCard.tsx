import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./Cart";
import { formatPrice } from "./helpers";
import { ProductRecord } from "./types";

export function ProductCard(props: ProductProps) {

    const {product} = props;

    const cartContext = useContext(CartContext);

    const handleAddToCart = () => {
        cartContext?.addItem(product.id, 1);
    }

    return (
        <article className="product-item" itemScope itemType="http://schema.org/Product">
            <div className="max-w-sm bg-white shadow-lg rounded overflow-hidden">
                <Link to={'/product/'+product.id}>
                    <img className="w-full" src={product.image} alt={product.reference} />
                </Link>
                <div className="p-4">
                    <div className="text-gray-900 font-bold text-2xl">
                        <Link to={'/product/'+product.id}>
                            {product.reference}
                        </Link>
                    </div>
                    <p className="mt-2 text-gray-600 text-sm">{product.description}</p>
                </div>
                <div className="p-4 flex item-center justify-between mt-3">
                    <h1 className="text-gray-700 font-bold text-xl">{formatPrice(product.price)}</h1>
                    <button onClick={handleAddToCart} className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">Add to cart</button>
                </div>
            </div>
        </article>
    );
}

type ProductProps = {
    product: ProductRecord
}
