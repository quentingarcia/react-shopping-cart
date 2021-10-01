import generateData from 'data-generator-retail';
import { ProductRecord } from './types';

// Intialise demo data
const data = generateData();

export function getProductsList() {
    return data.products as ProductRecord[];
}

export function getProductById(id: string) {
    return data.products.find((product) => product.id === parseInt(id)) as ProductRecord;
}
