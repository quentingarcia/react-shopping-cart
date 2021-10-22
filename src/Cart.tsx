import { createContext } from "react";
import { CartItem } from "./types";

export const CartContext = createContext<CartContextValue|undefined>(undefined);

export type CartContextValue = {
    addItem: (productId: number, quantity: number) => void;
    removeItem: (productId: number) => void;
    cartItems: CartItem[];
}
