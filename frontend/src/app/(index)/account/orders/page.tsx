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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "react-use-cart";
import useSWR from "swr";
import { z } from "zod";
import AddToCart from "../../shop/AddToCart";
import { Separator } from "@/components/ui/separator";
import { orderValidator } from "@/lib/validations/makeOrder";
import { useAuth } from "@/contexts/authContext";
import moment from "moment";

type FormData = z.infer<typeof orderValidator>;

export default function OrdersPage() {
  const { accessToken } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (accessToken) {
        let response = await axios.get<Order[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/orders`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setOrders(response.data);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [accessToken]);

  return (
    <section className="flex items-center justify-center min-h-[calc(100svh-73px)] mx-auto container">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Заказы</CardTitle>
          <CardDescription>
            На этой странице вы можете отследить ваши заказы
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isLoading ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Заказа</TableHead>
                  <TableHead>Адресс доставки</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Сумма заказа</TableHead>
                  <TableHead>Дата заказа</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell className="hidden md:table-cell text-xs">
                      {order.address}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="w-max">
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {order.total.toFixed(2)}₽
                    </TableCell>
                    <TableCell className="table-cell">
                      {moment(order.creationDate).format("MM.DD.YYYY HH:mm")}
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
