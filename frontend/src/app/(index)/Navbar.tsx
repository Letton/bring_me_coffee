"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const { user } = useAuth();
  const { cart } = useCart();

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
        {!user ? (
          <li>
            <Button asChild>
              <Link href="/auth/signin">Вход</Link>
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
                {cart.length > 0 ? <Badge>{cart.length}</Badge> : null}
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
