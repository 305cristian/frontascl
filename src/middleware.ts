import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/pages/sa:path*", "/pages/qa:path*"],
};

export async function middleware(req: any) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  console.log("dddddd: ", session);
  const { pathname, origin } = req.nextUrl;

  // Rutas protegidas
  const protectedRoutes = ["/dashboard", "/pages"];

  // Si la ruta solicitada está en la lista de rutas protegidas
  if (protectedRoutes.some((route) => pathname.startsWith(`/`))) {
    // Y no hay sesión activa
    if (!session) {
      // Redirigir a la ruta de no autenticado
      const loginUrl = `/`;
      return NextResponse.redirect(new URL(loginUrl, req.url));
    }
  }

  // Si no es una ruta protegida o hay una sesión activa, continuar
  return NextResponse.next();
}
