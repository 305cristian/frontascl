import { useSession } from "next-auth/react";

export function Account() {
  const { data: session } = useSession();

  const account = {
    displayName: session?.user?.name || "",
    email: session?.user?.email || "",
    photoURL: "/assets/images/avatars/avatar_25.jpg",
    role: session?.user?.rol || "",
    cellphone: session?.user?.telefono || "",
    idUser: session?.user?.id?.toString() || "",
  };
  return account;
}
