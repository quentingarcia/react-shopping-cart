import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import { ProductList } from './ProductList';
import { ProductRecord } from './types';

const products:ProductRecord[] = [
    {
        id: 0,
        category_id: 0,
        reference: 'Test Product 0',
        width: 200,
        height: 300,
        price: 12.50,
        thumbnail: '',
        image: '',
        description: 'Description of test product 0',
        stock: 123
    },
    {
        id: 1,
        category_id: 1,
        reference: 'Test Product 1',
        width: 300,
        height: 400,
        price: 27.10,
        thumbnail: '',
        image: '',
        description: 'Description of test product 1',
        stock: 50
    },
    {
        id: 2,
        category_id: 2,
        reference: 'Test Product 2',
        width: 500,
        height: 600,
        price: 47.00,
        thumbnail: '',
        image: '',
        description: 'Description of test product 2',
        stock: 20
    }
]

describe('<ProductList />', () => {
    it('ProductList should have 3 products after rendering', () => {
        const {getAllByRole} = render(<ProductList products={products} />);
        let li = getAllByRole('listitem');
        expect(li.length).toEqual(3);
    });
});
