"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "./Navbar";
import { CartProvider } from "react-use-cart";

export default function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CartProvider>
        <header className="border-b">
          <div className="container mx-auto py-4 flex justify-between items-center">
            <Link href="/" className="w-fit flex gap-2" prefetch={false}>
              <Image
                src="/coffee-bean.svg"
                alt="Coffe Logo"
                className="dark:invert"
                width={24}
                height={24}
                priority
              />
              <div className="text-lg font-semibold tracking-tight">
                Bring me coffee
              </div>
            </Link>
            <Navbar />
          </div>
        </header>
        <main className="min-h-[calc(100svh-73px)]">{children}</main>
        <footer className="border-t">
          <div className="container mx-auto py-4 text-muted-foreground text-sm flex justify-between">
            <p>
              Обратная связь:{" "}
              <Link href="https://t.me/Letton" className="underline">
                @Letton
              </Link>
            </p>
            <p>©{new Date().getFullYear()} Все права защищены</p>
          </div>
        </footer>
      </CartProvider>
    </>
  );
}
