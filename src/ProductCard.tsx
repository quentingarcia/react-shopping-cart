import { Link } from "react-router-dom";
import { formatPrice } from "./helpers";
import { ProductRecord } from "./types";

export function ProductCard(props: ProductProps) {
    return (
        <Link to={'/product/'+props.product.id}>
            <article className="product-item" itemScope itemType="http://schema.org/Product">

                <div className="max-w-sm bg-white shadow-lg rounded overflow-hidden">
                    <img className="w-full" src={props.product.image} alt={props.product.reference} />
                    <div className="p-4">
                        <div className="text-gray-900 font-bold text-2xl">{props.product.reference}</div>
                        <p className="mt-2 text-gray-600 text-sm">{props.product.description}</p>
                    </div>
                    <div className="p-4 flex item-center justify-between mt-3">
                        <h1 className="text-gray-700 font-bold text-xl">{formatPrice(props.product.price)}</h1>
                        <button className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">Add to cart</button>
                    </div>
                </div>
            </article>
        </Link>
    );
}

type ProductProps = {
    product: ProductRecord
}
