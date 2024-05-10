"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { headers } from "next/headers";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "react-use-cart";
import useSWR from "swr";
import { z } from "zod";
import AddToCart from "../../shop/AddToCart";
import { Separator } from "@/components/ui/separator";
import { orderValidator } from "@/lib/validations/makeOrder";
import { useAuth } from "@/contexts/authContext";

type FormData = z.infer<typeof orderValidator>;

export default function CartPage() {
  const { items, updateItemQuantity, cartTotal, emptyCart } = useCart();

  const { accessToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(orderValidator),
    reValidateMode: "onSubmit",
  });

  const makeOrder = async (data: FormData) => {
    try {
      let response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        {
          items: items,
          address: data.address,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      emptyCart();
      return toast({
        title: "Успешно!",
        description: `Заказ с номером ${response.data?.orderId} создан`,
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        return toast({
          title: "Ошибка создания заказа",
          description: err.response?.data?.message,
        });
      }
      return toast({
        title: "Ошибка создания заказа",
        description: "Something went wrong",
      });
    }
  };

  const onSubmit = (data: FormData) => {
    makeOrder({
      address: data.address,
    });
  };

  return (
    <section className="flex items-center justify-center min-h-[calc(100svh-73px)] mx-auto container">
      <Card>
        <CardHeader>
          <CardTitle>Корзина</CardTitle>
          <CardDescription>
            Чтобы оформить заказ, запоните нужные данные и нажмите кнопку
            оформить заказ.
          </CardDescription>
        </CardHeader>
        {items.length > 0 ? (
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Позиция</TableHead>
                  <TableHead>Тип</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Сумма</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items?.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name} x {product.quantity}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.type}</Badge>
                    </TableCell>
                    <TableCell className="table-cell">
                      <div className="flex justify-center gap-2">
                        <Button
                          onClick={() =>
                            updateItemQuantity(
                              product.id,
                              (product.quantity as number) + 1
                            )
                          }
                        >
                          +
                        </Button>
                        <Button
                          variant={"outline"}
                          onClick={() =>
                            updateItemQuantity(
                              product.id,
                              (product.quantity as number) - 1
                            )
                          }
                        >
                          -
                        </Button>
                        <Button
                          variant={"destructive"}
                          onClick={() => updateItemQuantity(product.id, 0)}
                        >
                          x
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {(product.price * (product.quantity as number)).toFixed(
                        2
                      )}
                      ₽
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Separator className="my-4" />
            <div className="flex items-center justify-between px-4">
              <span>Итого:</span>
              <span>{cartTotal.toFixed(2)}₽</span>
            </div>
            <Separator className="my-4" />
            <div className="flex items-center justify-between px-4">
              <span>Оплата:</span>
              <span>Картой курьеру или наличными</span>
            </div>
            <Separator className="my-4" />
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex w-full flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="Адресс доставки"
                    {...register("address")}
                  />
                  <Button type="submit">Создать заказ</Button>
                </div>
              </form>
            </div>
          </CardContent>
        ) : (
          <CardContent>
            <p>Ваша корзина пуста</p>
          </CardContent>
        )}
      </Card>
    </section>
  );
}
