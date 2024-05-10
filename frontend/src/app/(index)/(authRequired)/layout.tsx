"use client";

import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";

export default function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken } = useAuth();

  const router = useRouter();

  if (!accessToken) {
    router.push("/auth/sign-in");
    return null;
  }

  return <>{children}</>;
}
