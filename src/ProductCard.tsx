import { ProductRecord } from "./types";

// Utility function to format price
function formatPrice(price: number) {    
    return (
        new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(price)
    );
}

export function ProductCard(props: ProductProps) {
    return (
        <article className="product-item" itemScope itemType="http://schema.org/Product">
            <div className="flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="w-1/3 bg-cover" style={{backgroundImage: "url('"+props.product.image+"')"}}>
                </div> 
                <div className="w-2/3 p-4">
                <h1 className="text-gray-900 font-bold text-2xl">{props.product.reference}</h1>
                <p className="mt-2 text-gray-600 text-sm">{props.product.description}</p>
                <div className="flex item-center justify-between mt-3">
                    <h1 className="text-gray-700 font-bold text-xl">{formatPrice(props.product.price)}</h1>
                    <button className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">Add to cart</button>
                </div>
                </div>
            </div>
        </article>
    );
}

type ProductProps = {
    product: ProductRecord
}
