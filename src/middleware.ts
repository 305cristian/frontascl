export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard", "/pages/ssa/:path*", "/pages/qa/:path*"],
};

//TODO ESTE CODIGO SE LO REDUCE APLICANDO

/* pages: {
    //Cuando se cierra la seción se va a la raiz
    signIn: "/",
  },
 */
//EN EL route.tsx de nextAuth
