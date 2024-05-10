"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/authContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "react-use-cart";

export default function Navbar() {
  const { accessToken } = useAuth();
  const { totalUniqueItems } = useCart();

  return (
    <nav>
      <ul className="flex justify-between gap-4 items-center">
        <li>
          <Button variant="link" asChild>
            <Link href="/faq">FAQ</Link>
          </Button>
        </li>
        <li>
          <Button variant="link" asChild>
            <Link href="/shop">Меню</Link>
          </Button>
        </li>
        {!accessToken ? (
          <li>
            <Button asChild>
              <Link href="/auth/sign-in">Вход</Link>
            </Button>
          </li>
        ) : (
          <>
            <li>
              <Button variant="link" asChild>
                <Link href="/account">Профиль</Link>
              </Button>
            </li>
            <li>
              <Link href="/account/cart" className="flex gap-2">
                <ShoppingCart />{" "}
                {totalUniqueItems > 0 ? (
                  <Badge>{totalUniqueItems}</Badge>
                ) : null}
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
