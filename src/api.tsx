import generateData from 'data-generator-retail';
import { ProductRecord } from './types';

// Intialise demo data
const data = generateData();

export const getProductsList = async() => {
    return new Promise<ProductRecord[]>((resolve, reject) => {
        setTimeout(() => {
            resolve(data.products as ProductRecord[]);
        }, 3000);
    });
}

export const getProductById = async(id: string|number) => {
    // If id is a string, convert it to a number
    // Use case : id from route param is a string
    id = typeof(id) === 'string' ? parseInt(id) : id;

    return new Promise<ProductRecord>((resolve, reject) => {
        setTimeout(() => {
            resolve(data.products.find((product) => product.id === id) as ProductRecord);
        }, 3000);
    });
}
