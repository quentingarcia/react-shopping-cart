import { useContext, useEffect, useState } from 'react';
import { CartContext } from './Cart';
import { formatPrice } from './helpers';
import { SkeletonItem } from './SkeletonItem';
import { API, CartItem, ProductRecord } from './types';

const CartItemDetail = (props: CartItemDetailProps) => {

    const {api, cartItem} = props;
    const [isLoading, setLoading] = useState<Boolean>(true);
    const [product, setProduct] = useState<ProductRecord|undefined>();

    useEffect(() => {
        api.getProductById(cartItem.product_id.toString()).then((response) => {
            setProduct(response);
            setLoading(false);
        });
    }, [api, cartItem]);

    if(isLoading) {
        return (
            <div className="text-gray-900 p-2 flex bg-white cursor-pointer border-b border-gray-100 hover:bg-gray-100">
                <div className="p-2 w-12"><SkeletonItem className="product-image" style={{width: '32px', height: '24px'}} /></div>
                <div className="flex-auto text-sm w-32">
                    <div className="font-bold"><SkeletonItem className="product-reference" style={{}} /></div>
                    <div className="text-gray-400"><SkeletonItem className="product-quantity" style={{}} /></div>
                </div>
                <div className="flex flex-col w-18 items-end">
                    <div className="w-4 h-4 mb-6 hover:bg-red-200 rounded-full cursor-pointer text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2 ">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </div>
                    <span className="text-base font-medium"><SkeletonItem className="product-price" style={{width: '100px', height: '40px'}} /></span>
                </div>
            </div>
        );
    } else {
        return (
            <div className="text-gray-900 p-2 flex bg-white cursor-pointer border-b border-gray-100 hover:bg-gray-100">
                <div className="p-2 w-12"><img src={product?.thumbnail} alt={product?.reference} /></div>
                <div className="flex-auto text-sm w-32">
                    <div className="font-bold">{product?.reference}</div>
                    <div className="text-gray-400">Qty: {cartItem.quantity} x {product?.price ? formatPrice(product.price) : 0}</div>
                </div>
                <div className="flex flex-col w-18 items-end">
                    <div className="w-4 h-4 mb-6 hover:bg-red-200 rounded-full cursor-pointer text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2 ">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </div>
                    <span className="text-base font-medium">{product?.price ? formatPrice(cartItem.quantity * product.price) : 0}</span>
                </div>
            </div>
        );
    }
}

export function MiniCart(props: MiniCartProps) {
    
    const {api, cartTotal, miniCartOpened} = props;

    const cartContext = useContext(CartContext);
    
    return (
        <div className={'shadow-xl w-64 '+(miniCartOpened ? 'visible' : 'invisible')}>
            {cartContext?.cartItems.map((cartItem) => (<CartItemDetail key={cartItem.product_id} cartItem={cartItem} api={api} />))}
            <div className="text-gray-900 p-2 flex bg-white hover:bg-gray-100 cursor-pointer border-b border-gray-100">                    
                <div className="p-4 justify-center flex">
                    <button className="text-base bg-white focus:outline-none flex justify-center px-4 py-2 rounded font-bold bg-teal-100 text-teal-700 border border-teal-600">Checkout {formatPrice(cartTotal)}</button>
                </div>
            </div>
        </div>
    );
}

type MiniCartProps = {
    cartItems: CartItem[],
    cartTotal: number,
    miniCartOpened: boolean,
    api: API
}

type CartItemDetailProps = {
    cartItem: CartItem,
    api: API
}
