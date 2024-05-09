import { Button } from "@/components/ui/button";
import { MessagesSquare, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default async function IndexPage() {
  return (
    <section className="flex items-center justify-center min-h-[calc(100svh-73px)] container mx-auto overflow-x-hidden relative">
      <div className="absolute -z-50 top-[10%] left-[50%] w-[450px] h-[350px] blur-3xl rotate-45 bg-white opacity-20 rounded-full" />
      <div className="absolute -z-50 top-[55%] left-[5%] sm:left-[25%] w-[350px] h-[150px] blur-3xl -rotate-12 bg-white opacity-20 rounded-full" />
      <div className="space-y-6">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] max-w-xl text-center mx-auto drop-shadow	">
          Bring me Coffee - Доставка коффе в любое время
        </h1>
        <p className="text-md text-muted-foreground sm:text-xl text-center mx-auto max-w-[750px]">
          Добро пожаловать в мир превосходного кофе! Находите и заказывайте ваш
          любимый кофе с лёгкостью. С каждым глотком — путешествие в мир
          ароматов и вкусов.
        </p>
        <ul className="text-md text-muted-foreground sm:text-lg mx-auto max-w-[750px] space-y-1">
          <li>
            <span className="font-semibold text-foreground">
              🚚 Быстрая доставка
            </span>{" "}
            — ваш кофе будет у вас дома, пока он ещё горячий.
          </li>
          <li>
            <span className="font-semibold text-foreground">
              ☕ Широкий ассортимент
            </span>{" "}
            — эспрессо, латте, капучино и многое другое.
          </li>
          <li>
            <span className="font-semibold text-foreground">
              🌱 Всегда свежий
            </span>{" "}
            — мы обжариваем кофе непосредственно перед отправкой.
          </li>
        </ul>
        <div className="mx-auto flex justify-center">
          <Button asChild className="font-bold">
            <Link href="/shop">
              <ShoppingBag className="mr-2" />
              Заказать сейчас
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
