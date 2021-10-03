import { Link } from "react-router-dom";
import { formatPrice } from "./helpers";
import { CartItem, ProductRecord } from "./types";

export function ProductCard(props: ProductProps) {

    return (
        <article className="product-item" itemScope itemType="http://schema.org/Product">
            <div className="max-w-sm bg-white shadow-lg rounded overflow-hidden">
                <Link to={'/product/'+props.product.id}>
                    <img className="w-full" src={props.product.image} alt={props.product.reference} />
                </Link>
                <div className="p-4">
                    <div className="text-gray-900 font-bold text-2xl">
                        <Link to={'/product/'+props.product.id}>
                            {props.product.reference}
                        </Link>
                    </div>
                    <p className="mt-2 text-gray-600 text-sm">{props.product.description}</p>
                </div>
                <div className="p-4 flex item-center justify-between mt-3">
                    <h1 className="text-gray-700 font-bold text-xl">{formatPrice(props.product.price)}</h1>
                    <button onClick={(e) => props.handleAddToCart(props.product.id, 1)} className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">Add to cart</button>
                </div>
            </div>
        </article>
    );
}

type ProductProps = {
    product: ProductRecord,
    handleAddToCart: Function
}
