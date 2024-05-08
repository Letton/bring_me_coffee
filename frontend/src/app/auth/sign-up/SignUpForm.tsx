"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { signUpValidator } from "@/lib/validations/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { HTMLAttributes, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

interface ISignUpForm extends HTMLAttributes<HTMLFormElement> {}

type FormData = z.infer<typeof signUpValidator>;

export default function SignInForm({ className, ...props }: ISignUpForm) {
  const router = useRouter();
  const { toast } = useToast();
  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpValidator),
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    if (errors?.username)
      toast({
        title: "Ошибка регистрации",
        description: errors.username?.message,
      });
    if (errors?.email)
      toast({
        title: "Ошибка регистрации",
        description: errors.email?.message,
      });
    if (errors?.password)
      toast({
        title: "Ошибка регистрации",
        description: errors.password?.message,
      });
  }, [errors.username, errors.email, errors.password, toast]);

  const signUp = async (data: FormData) => {
    try {
      let response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
        {
          username: data.username,
          email: data.email,
          password: data.password,
        }
      );
      if (!response.data?.token) throw Error;
      setAuth(response.data?.token);
      return router.push("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        return toast({
          title: "Ошибка регистрации",
          description: err.response?.data?.message,
        });
      }
      return toast({
        title: "Ошибка регистрации",
        description: "Something went wrong",
      });
    }
  };

  const onSubmit = (data: FormData) => {
    signUp({
      username: data.username,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form
      className={cn(className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Input type="text" placeholder="Username" {...register("username")} />
        <Input type="email" placeholder="Email" {...register("email")} />
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <Button type="submit">Зарегистрироваться</Button>
      </div>
    </form>
  );
}
