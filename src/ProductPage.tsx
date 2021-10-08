import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProductById } from "./api";
import { ProductDetail } from "./ProductDetail";
import { SkeletonItem } from "./SkeletonItem";
import { ProductRecord } from "./types";

export interface IProductDetailRouteParams {
  id: string;
}

const useProduct = (
  id: string
): [ProductRecord | undefined, boolean, Error | undefined, () => void] => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();
  const [product, setProduct] = useState<ProductRecord>();

  const refetch = useCallback(() => {
    getProductById(id)
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

export function ProductPage() {
  let { id } = useParams<IProductDetailRouteParams>();
  const [product, isLoading, error, refetch] = useProduct(id);

  if (isLoading) {
    return (
      <article
        className="product-item"
        itemScope
        itemType="http://schema.org/Product"
      >
        <div className="max-w-sm bg-white shadow-lg rounded overflow-hidden m-auto">
          <SkeletonItem
            className="product-image w-full"
            style={{ width: "384px", height: "288px" }}
          />
          <div className="p-4">
            <div className="text-gray-900 font-bold text-2xl">
              <SkeletonItem
                className="product-reference"
                style={{ width: "300px" }}
              />
            </div>
            <SkeletonItem
              className="product-description mt-2 text-gray-600 text-sm"
              style={{ width: "300px", height: "80px" }}
            />
          </div>
          <div className="p-4 flex item-center justify-between mt-3">
            <h1 className="text-gray-700 font-bold text-xl">
              <SkeletonItem
                className="product-price"
                style={{ width: "100px" }}
              />
            </h1>
            <SkeletonItem
              className="product-button"
              style={{ width: "100px", height: "32px" }}
            />
          </div>
        </div>
      </article>
    );
  } else {
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
      />
    );
  }
}
