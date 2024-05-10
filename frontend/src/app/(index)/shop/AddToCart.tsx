"use client";

import { Button } from "@/components/ui/button";
import { HTMLAttributes } from "react";
import { useCart } from "react-use-cart";

interface IAddToCart extends HTMLAttributes<HTMLButtonElement> {
  product: Product;
}

export default function AddToCart({ product, ...props }: IAddToCart) {
  const { addItem } = useCart();

  const addToCartHandler = () => {
    addItem(product, 1);
  };

  return <Button onClick={addToCartHandler}>Купить</Button>;
}
