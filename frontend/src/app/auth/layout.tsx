import { Metadata } from "next";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="container h-screen flex items-center justify-center">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col space-y-6 max-w-sm">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
