import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { CartContext } from "./Cart";
import { formatPrice } from "./helpers";
import { ProductDetail } from "./ProductDetail";
import { SkeletonItem } from "./SkeletonItem";
import { API, ProductRecord } from "./types";

export interface IProductDetailRouteParams {
  id: string;
}

const useProduct = (
  id: string,
  api: API
): [ProductRecord | undefined, boolean, Error | undefined, () => void] => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();
  const [product, setProduct] = useState<ProductRecord>();

  const refetch = useCallback(() => {
    api.getProductById(id)
      .then((response) => {
        setProduct(response);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return [product, isLoading, error, refetch];
};

export function ProductPage(props: ProductPageProps) {
  const {api} = props;
  let { id } = useParams<IProductDetailRouteParams>();
  const [product, isLoading, error, refetch] = useProduct(id, api);

  const cartContext = useContext(CartContext);

  const handleAddToCart = () => {
    return product ? cartContext?.addItem(product.id, 1) : null;
  };

    return (
      <ProductDetail
        product={product}
        image={
          isLoading ? (
            <SkeletonItem
              className="product-image w-full"
              style={{ width: "384px", height: "288px" }}
            />
          ) : (
            <img
              className="w-full"
              src={product?.image}
              alt={product?.reference}
            />
          )
        }
        reference={
          isLoading ? (
            <SkeletonItem
                className="product-reference"
                style={{ width: "300px" }}
            />
          ) : (
            product?.reference
          )
        }
        description={
          isLoading ? (
            <SkeletonItem
              className="product-description mt-2 text-gray-600 text-sm"
              style={{ width: "300px", height: "80px" }}
            />
          ) : (
            product?.description
          )
        }
        price={
          isLoading ? (
            <SkeletonItem
                className="product-price"
                style={{ width: "100px" }}
            />
          ) : (
            product?.price ? formatPrice(product.price) : 0
          )
        }
        button={
          isLoading ? (
            <SkeletonItem
              className="product-button"
              style={{ width: "100px", height: "32px" }}
            />
          ) : (
            <button
            onClick={handleAddToCart}
            className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded"
          >
            Add to cart
          </button>
          )
        }
      />
    );
}

type ProductPageProps = {
  api: API
}
