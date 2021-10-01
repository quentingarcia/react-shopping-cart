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

export type API = {
    getProductsList: () => ProductRecord[],
    getProductById: (id: string) => ProductRecord
}
