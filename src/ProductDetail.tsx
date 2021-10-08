import { useContext, ReactNode } from "react";
import { CartContext } from "./Cart";
import { formatPrice } from "./helpers";
import { ProductRecord } from "./types";

export function ProductDetail(props: ProductDetailProps) {
  const { product, image } = props;

  const cartContext = useContext(CartContext);

  const handleAddToCart = () => {
    cartContext?.addItem(product.id, 1);
  };

  return (
    <article
      className="product-item"
      itemScope
      itemType="http://schema.org/Product"
    >
      <div className="max-w-sm bg-white shadow-lg rounded overflow-hidden m-auto">
        {image}
        <div className="p-4">
          <div className="text-gray-900 font-bold text-2xl">
            {product.reference}
          </div>
          <p className="mt-2 text-gray-600 text-sm">{product.description}</p>
        </div>
        <div className="p-4 flex item-center justify-between mt-3">
          <h1 className="text-gray-700 font-bold text-xl">
            {formatPrice(product.price)}
          </h1>
          <button
            onClick={handleAddToCart}
            className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

type ProductDetailProps = {
  product: ProductRecord;
  image: ReactNode;
};
