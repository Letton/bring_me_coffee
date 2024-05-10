"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/authContext";
import { Home, Package, Package2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <section className="flex w-full flex-row h-full min-h-[calc(100svh-73px)]">
        <aside className="inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex min-h-[calc(100svh-73px)]">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/account"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Профиль</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Профиль</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/account/cart"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Корзина</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Корзина</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/account/orders"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Package className="h-5 w-5" />
                  <span className="sr-only">Заказы</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Заказы</TooltipContent>
            </Tooltip>
          </nav>
        </aside>
        <div className="flex items-center justify-center min-h-[calc(100svh-73px)] mx-auto container">
          {children}
        </div>
      </section>
    </TooltipProvider>
  );
}
