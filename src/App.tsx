import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ProductsPage } from "./ProductsPage";
import { ProductPage } from "./ProductPage";
import { API, CartItem } from "./types";
import { MiniCart } from "./MiniCart";
import { useCallback, useEffect, useState } from "react";
import { getProductsList, getProductById } from "./api";
import { CartContext } from "./Cart";
import logo from "./logo.svg";
import "./App.css";

const defaultAPI = { getProductsList, getProductById };

export default function App(props: AppProps) {
  const { api = defaultAPI } = props;
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((product_id: number, quantity: number) => {
    setCart((currentCart) => {
      let indexOfProduct = currentCart.findIndex(
        (item) => item.product_id === product_id
      );

      if (indexOfProduct > -1) {
        return currentCart.map((item, index) => ({
          ...item,
          quantity:
            index === indexOfProduct ? item.quantity + quantity : item.quantity,
        }));
      } else {
        return [...currentCart, { product_id, quantity }];
      }
    });
  }, []);

  const cartContext = {
    addItem: addToCart,
  };

  return (
    <Router>
      <CartContext.Provider value={cartContext}>
        <div className="App">
          <Header cart={cart} api={api} />

          <main>
            <Switch>
              <Route path="/product/:id">
                <ProductPage api={api} />
              </Route>
              <Route path="/">
                <ProductsPage api={api} />
              </Route>
            </Switch>
          </main>
        </div>
      </CartContext.Provider>
    </Router>
  );
}

type AppProps = {
  api?: API;
};

type HeaderProps = {
  api: API;
  cart: CartItem[];
};

const computeCartTotal = async (cart: CartItem[], api: API) => {
  let total = 0;
  for (let cartItem of cart) {
    const product = await api.getProductById(cartItem.product_id.toString());
    total += product.price * cartItem.quantity;
  }
  return total;
};

const computeCartCountProducts = (cart: CartItem[]) => {
  return cart.reduce((count, cartItem) => count + cartItem.quantity, 0);
};

const Header = (props: HeaderProps) => {
  const { api, cart } = props;
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCountProducts, setCartCountProducts] = useState(() =>
    computeCartCountProducts(cart)
  );
  const [miniCartOpened, setMiniCartOpened] = useState<boolean>(false);

  // Called one time and when cart change
  useEffect(() => {
    computeCartTotal(cart, api).then((total) => setCartTotal(total));
    setCartCountProducts(computeCartCountProducts(cart));
  }, [cart, api]);

  const handleCartIconClick = () => {
    setMiniCartOpened(!miniCartOpened);
  };

  return (
    <header className="App-header">
      <nav className="flex items-center p-3 flex-wrap">
        <Link to="/" className="p-2 mr-4 inline-flex items-center">
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            style={{ width: "50px", height: "40px" }}
          />
        </Link>
        <div
          className="top-navbar inline-flex flex-grow w-auto"
          id="navigation"
        >
          <div className="inline-flex flex-row ml-auto w-auto items-center items-start flex flex-col h-auto">
            <Link
              to="/"
              className="inline-flex w-auto px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
            >
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
                  <div
                    slot="icon"
                    className="relative"
                    onClick={handleCartIconClick}
                  >
                    <div className="absolute text-xs rounded-full -mt-1 -mr-2 px-1 font-bold top-0 right-0 bg-red-700 text-white">
                      {cartCountProducts}
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-shopping-cart w-6 h-6 mt-2"
                    >
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="absolute w-full rounded-b border-t-0 z-10">
                <MiniCart
                  cartItems={cart}
                  cartTotal={cartTotal}
                  miniCartOpened={miniCartOpened}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
