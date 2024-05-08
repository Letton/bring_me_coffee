import { Button } from "@/components/ui/button";
import { MessagesSquare, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddToCart from "./AddToCart";

export const revalidate = 0;

const fetchProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  return await res.json();
};

export default async function ShopPage() {
  const products: Product[] = await fetchProducts();

  return (
    <section className="flex items-center justify-center min-h-[calc(100svh-73px)] mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Меню</CardTitle>
          <CardDescription>
            Выбирайте любое блюдо по вашему вкусу
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Масса нетто</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead className="hidden md:table-cell">Цена</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="128"
                      src={product.image}
                      width="128"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="font-medium">
                    {product.net_weight} г.
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">Кофе</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.price}₽
                  </TableCell>
                  <TableCell className="table-cell">
                    <AddToCart product={product} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
