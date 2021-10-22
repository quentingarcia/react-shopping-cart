import { ReactNode } from "react";
import { ProductRecord } from "./types";

export function ProductDetail(props: ProductDetailProps) {
  const { image, reference, description, price, button } = props;

  return (
    <article
      className="product-item"
      itemScope
      itemType="http://schema.org/Product"
    >
      <div className="max-w-sm bg-white shadow-lg rounded overflow-hidden m-auto">
        {image}
        <div className="p-4">
          <div className="text-gray-900 font-bold text-2xl">{reference}</div>
          <p className="mt-2 text-gray-600 text-sm">{description}</p>
        </div>
        <div className="p-4 flex item-center justify-between mt-3">
          <h1 className="text-gray-700 font-bold text-xl">{price}</h1>
          {button}
        </div>
      </div>
    </article>
  );
}

type ProductDetailProps = {
  product: ProductRecord|undefined;
  image: ReactNode;
  reference: ReactNode;
  description: ReactNode;
  price: ReactNode;
  button: ReactNode;
};
