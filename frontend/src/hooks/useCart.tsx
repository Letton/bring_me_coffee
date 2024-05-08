import { useState, useEffect } from "react";

const useCart = () => {
  const [cart, setCart] = useState<Position[]>([]);

  useEffect(() => {
    console.log(1);

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    console.log(2);

    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // const addToCart = (item: Position) => {
  //   setCart((prev) => {
  //     const itemIndex = prev.findIndex((i) => i.id === item.id);
  //     if (itemIndex > -1) {
  //       let newCart = [...prev];
  //       newCart[itemIndex].count += item.count;
  //       return newCart;
  //     } else {
  //       return [...prev, { ...item, count: 1 }];
  //     }
  //   });
  // };

  // const removeFromCart = (id: String) => {
  //   setCart((prev) => prev.filter((item) => item.id !== id));
  // };

  // const updateQuantity = (id: String, count: number) => {
  //   setCart((prev) => {
  //     return prev.map((item) => {
  //       if (item.id === id) {
  //         return { ...item, count };
  //       }
  //       return item;
  //     });
  //   });
  // };

  // const clearCart = () => {
  //   setCart([]);
  // };

  return {
    cart,
    // addToCart,
    // removeFromCart,
    // updateQuantity,
    // clearCart,
  };
};

export default useCart;
