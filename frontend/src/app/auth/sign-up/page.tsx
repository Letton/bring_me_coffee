import Link from "next/link";
import SignInForm from "./SignUpForm";

export default function SignUpPage() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Регистрация</h1>
        <p className="text-sm text-muted-foreground">
          Зарегистрируйтесь и начните пользоваться сервисом
        </p>
      </div>
      <SignInForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        Отправляя форму, вы соглашаетесь с нашими{" "}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          условиями использования
        </Link>{" "}
        и{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          политикой конфиденциальности
        </Link>
      </p>
    </>
  );
}
