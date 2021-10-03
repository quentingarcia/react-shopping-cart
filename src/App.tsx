import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { ProductsPage } from './ProductsPage';
import { ProductPage } from './ProductPage';
import { API, CartItem } from './types';
import { MiniCart } from './MiniCart';
import { useEffect, useState } from 'react';
import {getProductsList, getProductById} from './api';
import logo from './logo.svg';
import './App.css';

const defaultAPI = {getProductsList, getProductById};

const computeCartTotal = (cart: CartItem[]) => {
  return cart.reduce((total, cartItem) => { 
    const product = getProductById(cartItem.product_id);
    return (total + (product.price * cartItem.quantity));
  }, 0)
}

const computeCartCountProducts = (cart: CartItem[]) => {
  return cart.reduce((count, cartItem) => count+cartItem.quantity, 0);
}

export default function App(props: AppProps) {

  const {api = defaultAPI} = props;
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(() => computeCartTotal(cart));
  const [cartCountProducts, setCartCountProducts] = useState(() => computeCartCountProducts(cart));

  const addToCart = (product_id: number, quantity: number) => setCart((currentCart) => {
    let newCart = currentCart.slice();

    let productAlreadyInCart = newCart.findIndex((item) => (item.product_id === product_id));
    if(productAlreadyInCart > -1) {
      newCart[productAlreadyInCart].quantity += quantity;
      return newCart;
    } else {
      return [...newCart, {product_id, quantity}];
    }
  });

  // Called only one time at first render ?
  /*useEffect(() => {
    addToCart(1, 1);
    addToCart(2, 2);
    addToCart(3, 3);
  }, []);*/

  // Called one time and when cart change
  useEffect(() => {
    setCartTotal(computeCartTotal(cart));
    setCartCountProducts(computeCartCountProducts(cart));
  }, [cart]);

  return (
    <Router>
      <div className="App">
        <Header cart={cart} cartTotal={cartTotal} cartCountProducts={cartCountProducts} />

        <main>
          <Switch>
            <Route path="/product/:id">
              <ProductPage api={api} handleAddToCart={addToCart} />
            </Route>
            <Route path="/">
              <ProductsPage api={api} handleAddToCart={addToCart} />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

type AppProps = {
    api?: API
}

type HeaderProps = {
  cart: CartItem[],
  cartTotal: number,
  cartCountProducts: number
}

const Header = (props: HeaderProps) => {

  const {cart, cartTotal, cartCountProducts} = props;
  const [miniCartOpened, setMiniCartOpened] = useState<boolean>(false);

  const handleCartIconClick = () => {
    setMiniCartOpened(!miniCartOpened);
  }

  return (
    <header className="App-header">
      <nav className="flex items-center p-3 flex-wrap">
        <Link to="/" className="p-2 mr-4 inline-flex items-center">
          <img src={logo} className="App-logo" alt="logo" style={{width: '50px', height: '40px'}} />
        </Link>
        <div className="top-navbar inline-flex flex-grow w-auto" id="navigation">
          <div className="inline-flex flex-row ml-auto w-auto items-center items-start flex flex-col h-auto">
            <Link to="/" className="inline-flex w-auto px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white">
              <span>Home</span>
            </Link>
          </div>
        </div>
        <div className="p-5">
          <div className="flex justify-center">
              <div className="relative ">
                  <div className="flex flex-row cursor-pointer truncate p-2 px-4 rounded">
                      <div></div>
                      <div className="flex flex-row-reverse ml-2 w-full">
                          <div slot="icon" className="relative" onClick={handleCartIconClick}>
                              <div className="absolute text-xs rounded-full -mt-1 -mr-2 px-1 font-bold top-0 right-0 bg-red-700 text-white">
                                {cartCountProducts}
                              </div>
                              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-shopping-cart w-6 h-6 mt-2">
                                  <circle cx="9" cy="21" r="1"></circle>
                                  <circle cx="20" cy="21" r="1"></circle>
                                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                              </svg>
                          </div>
                      </div>
                  </div>
                  <div className="absolute w-full rounded-b border-t-0 z-10">
                      <div className="shadow-xl w-64">
                          <MiniCart cartItems={cart} cartTotal={cartTotal} miniCartOpened={miniCartOpened} />
                      </div>
                    </div>
                </div>
            </div>
        </div>
      </nav>
    </header>
  );
}
