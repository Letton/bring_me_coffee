"use client";

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
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/authContext";
import { userDataValidator } from "@/lib/validations/updateUserData";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { headers } from "next/headers";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";

type FormData = z.infer<typeof userDataValidator>;

export default function AccountPage() {
  const { user, accessToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(userDataValidator),
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    async function fetchData() {
      if (accessToken) {
        let response = await axios.get<User>(
          `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response?.data.firstname)
          setValue("firstname", response?.data.firstname, {
            shouldValidate: true,
          });

        if (response?.data.lastname)
          setValue("lastname", response?.data.lastname, {
            shouldValidate: true,
          });
      }
    }
    fetchData();
  }, [accessToken, setValue]);

  const updateUserData = async (data: FormData) => {
    try {
      let response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        {
          firstname: data.firstname,
          lastname: data.lastname,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return toast({
        title: "Успешно!",
        description: "Данные успешно обновлены",
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        return toast({
          title: "Ошибка обновления даных",
          description: err.response?.data?.message,
        });
      }
      return toast({
        title: "Ошибка обновления даных",
        description: "Something went wrong",
      });
    }
  };

  const onSubmit = (data: FormData) => {
    updateUserData({
      firstname: data.firstname,
      lastname: data.lastname,
    });
  };

  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Ваши данные</CardTitle>
          <CardDescription>
            Впишите ваши данные, чтобы мы знали как к вам обращаться
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full max-w-sm flex-col gap-4">
              <Input type="text" placeholder="Имя" {...register("firstname")} />
              <Input
                type="text"
                placeholder="Фамилия"
                {...register("lastname")}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button onClick={handleSubmit(onSubmit)}>Сохранить</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
