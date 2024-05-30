import { useSession } from "next-auth/react";
import LoginView from "@/app/sections/login/login-view";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { useEffect } from "react";

/*
 * Created on Thu May 02 2024
 *
 * Copyright (c) 2024 CC
 *
 * Author: Cristian R. Paz
 */

export default function Auth() {
  const route = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      route.push("/dashboard");
    }
  }, [session, route]);

  return <LoginView />;
}
