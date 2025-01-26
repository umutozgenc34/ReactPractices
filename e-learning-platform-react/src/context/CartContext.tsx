import React, { createContext, useContext, useState } from "react";
import { Course } from "../types";

interface CartContextType {
  cartItems: Course[];
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<Course[]>([]);

  const addToCart = (course: Course) => {
    if (!cartItems.find((item) => item.id === course.id)) {
      setCartItems([...cartItems, course]);
    }
  };

  const removeFromCart = (courseId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== courseId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
