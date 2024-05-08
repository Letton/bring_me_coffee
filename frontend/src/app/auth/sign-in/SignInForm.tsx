"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { signInValidator } from "@/lib/validations/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { HTMLAttributes, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ISignInForm extends HTMLAttributes<HTMLFormElement> {}

type FormData = z.infer<typeof signInValidator>;

export default function SignInForm({ className, ...props }: ISignInForm) {
  const router = useRouter();
  const { toast } = useToast();
  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signInValidator),
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    if (errors?.username)
      toast({
        title: "Ошибка аутентификации",
        description: errors.username?.message,
      });
    if (errors?.password)
      toast({
        title: "Ошибка аутентификации",
        description: errors.password?.message,
      });
  }, [errors.username, errors.password, toast]);

  const signIn = async (data: FormData) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
        {
          username: data.username,
          password: data.password,
        }
      );
      if (!response.data?.token) throw Error;
      setAuth(response.data?.token);
      return router.push("/");
    } catch (err) {
      if (err instanceof AxiosError)
        return toast({
          title: "Ошибка аутентификации",
          description: err.response?.data,
        });
      return toast({
        title: "Ошибка аутентификации",
        description: "Something went wrong",
      });
    }
  };

  const onSubmit = (data: FormData) => {
    signIn({ username: data.username, password: data.password });
  };

  return (
    <form
      className={cn(className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Input type="text" placeholder="Username" {...register("username")} />
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <Button type="submit">Войти</Button>
      </div>
    </form>
  );
}
