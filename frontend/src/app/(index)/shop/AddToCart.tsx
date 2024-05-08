"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { HTMLAttributes } from "react";

interface IAddToCart extends HTMLAttributes<HTMLButtonElement> {
  product: Product;
}

export default function AddToCart({ product, ...props }: IAddToCart) {
  const { addToCart } = useCart();

  const addToCartHandler = () => {
    addToCart({ ...product, count: 1 });
  };

  return <Button onClick={addToCartHandler}>Купить</Button>;
}
