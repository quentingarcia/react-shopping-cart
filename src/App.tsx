import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProductsPage } from "./ProductsPage";
import { ProductPage } from "./ProductPage";
import { API, CartItem } from "./types";
import { useCallback, useState } from "react";
import { getProductsList, getProductById } from "./api";
import { CartContext } from "./Cart";
import "./App.css";
import { Header } from "./Header";

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

  const removeFromCart = useCallback((product_id: number) => {
    setCart((currentCart) => {
      let indexOfProduct = currentCart.findIndex(
        (item) => item.product_id === product_id
      );
      return [...currentCart].splice(indexOfProduct, 1);
    });
  }, []);

  const cartContext = {
    addItem: addToCart,
    removeItem: removeFromCart,
    cartItems: cart
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
