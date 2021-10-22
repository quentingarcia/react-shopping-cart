export type ProductRecord = {
    id: number,
    category_id: number,
    reference: string,
    width: number,
    height: number,
    price: number,
    thumbnail: string,
    image: string,
    description: string,
    stock: number
}

export type CartItem = {
    //id: number,
    product_id: number,
    quantity: number
}

export type API = {
    //getProductsList: () => ProductRecord[],
    //getProductById: (id: string) => ProductRecord
    getProductsList: () => Promise<ProductRecord[]>,
    getProductById: (id: string) => Promise<ProductRecord>
}

export type SkeletonStyles = {
    width: string,
    height: string
}
