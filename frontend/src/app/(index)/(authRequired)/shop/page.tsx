"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddToCart from "./AddToCart";
import { redirect } from "next/navigation";

import axios from "axios";
import useSWR from "swr";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";

export default function ShopPage() {
  const router = useRouter();
  const fetcher = (url: string) =>
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}${url}`)
      .then((res) => res.data);

  const { data, isLoading, error } = useSWR<any[]>("/products", fetcher);

  return (
    <section className="flex items-center justify-center min-h-[calc(100svh-73px)] mx-auto container py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Меню</CardTitle>
          <CardDescription>
            Выбирайте любое блюдо по вашему вкусу
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isLoading ? (
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
                {data?.map((product) => (
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
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.net_weight} г.
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.type}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.price}₽
                    </TableCell>
                    <TableCell className="table-cell">
                      <div className="flex justify-center">
                        <AddToCart product={product} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            "Loading..."
          )}
        </CardContent>
      </Card>
    </section>
  );
}
