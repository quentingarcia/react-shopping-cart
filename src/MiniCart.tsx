import * as React from 'react';
import { getProductById } from './api';
import { formatPrice } from './helpers';
import { CartItem, ProductRecord } from './types';

const CartItemDetail = (props: CartItemDetailProps) => {

    const {cartItem} = props;
    const product: ProductRecord = getProductById(cartItem.product_id);

    return (
        <div className="text-gray-900 p-2 flex bg-white cursor-pointer border-b border-gray-100 hover:bg-gray-100">
            <div className="p-2 w-12"><img src={product.thumbnail} alt={product.reference} /></div>
            <div className="flex-auto text-sm w-32">
                <div className="font-bold">{product.reference}</div>
                <div className="text-gray-400">Qty: {cartItem.quantity} x {formatPrice(product.price)}</div>
            </div>
            <div className="flex flex-col w-18 items-end">
                <div className="w-4 h-4 mb-6 hover:bg-red-200 rounded-full cursor-pointer text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-trash-2 ">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </div>
                <span className="text-base font-medium">{formatPrice(cartItem.quantity * product.price)}</span>
            </div>
        </div>
    );
}

export function MiniCart(props: MiniCartProps) {
    
    const {cartItems, cartTotal, miniCartOpened} = props;
    
    return (
        <div className={miniCartOpened ? 'visible' : 'invisible'}>
            {cartItems.map((cartItem) => (<CartItemDetail cartItem={cartItem} />))}
            <div className="text-gray-900 p-2 flex bg-white hover:bg-gray-100 cursor-pointer border-b border-gray-100">                    
                <div className="p-4 justify-center flex">
                    <button className="text-base bg-white undefined hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                    hover:bg-teal-700 hover:text-teal-100 
                    bg-teal-100 
                    text-teal-700 
                    border duration-200 ease-in-out 
                    border-teal-600 transition">Checkout {formatPrice(cartTotal)}</button>
                </div>
            </div>
        </div>
    );
}

type MiniCartProps = {
    cartItems: CartItem[],
    cartTotal: number,
    miniCartOpened: boolean
}

type CartItemDetailProps = {
    cartItem: CartItem
}
