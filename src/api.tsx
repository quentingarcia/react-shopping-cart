import generateData from 'data-generator-retail';
import { ProductRecord } from './types';

// Intialise demo data
const data = generateData();

export function getProductsList() {
    return data.products as ProductRecord[];
}

export function getProductById(id: string|number) {
    // If id is a string, convert it to a number
    // Use case : id from route param is a string
    id = typeof(id) === 'string' ? parseInt(id) : id;

    return data.products.find((product) => product.id === id) as ProductRecord;
}
