import Link from "next/link";
import SignInForm from "./SignInForm";

export default function SignInPage() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Вход в аккаунт
        </h1>
        <p className="text-sm text-muted-foreground">
          Войдите с помощью ваших учетных данных, чтобы начать пользоваться
          сервисом
        </p>
      </div>
      <SignInForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        Нет аккаунта?{" "}
        <Link
          href="/auth/sign-up"
          className="underline underline-offset-4 hover:text-primary"
        >
          Зарегистрируйтесь
        </Link>
        , чтобы начать пользоваться сервисом
      </p>
    </>
  );
}
