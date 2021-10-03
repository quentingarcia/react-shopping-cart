import { createContext } from "react";

export const CartContext = createContext<CartContextValue|undefined>(undefined);

export type CartContextValue = {
    addItem: (productId: number, quantity: number) => void;
}
