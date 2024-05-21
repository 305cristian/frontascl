import { useSession } from "next-auth/react";
import LoginView from "@/app/sections/login/login-view";
import { useRouter } from "next/navigation";

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
  if (session) {
    route.push("/dashboard");
  } else {
    return <LoginView />;
  }
}
