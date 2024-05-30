import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

//---------------------------------------------------------------------

const authCredentials = {
  username: process.env.NEXT_PUBLIC_USER || "",
  password: process.env.NEXT_PUBLIC_PASS || "",
};
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const datos = {
          usser: credentials?.username,
          password: credentials?.password,
        };
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ascl/auth`, datos, { auth: authCredentials });
        const user = response.data.object;
        if (response.data.status === "success") {
          const validate = validatePassword(user, datos.password);
          if (validate) {
            const userSession = {
              id: user[0].idUser.toString(),
              name: `${user[0].nombresUser} ${user[0].apellidosUser}`,
              email: user[0].emailUser,
              telefono: user[0].telefonoUser,
              rol: user[0].nombreRol,
            };
            return userSession;
          } else {
            throw new Error("La contraseña es incorrecta");
          }
        }
        if (response.data.status === "warning") {
          //throw response.data;
          throw response.data;
        }
        return null;

        // Return null if user data could not be retrieved
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    //Cuando se cierra la seción se va a la raiz
    signIn: "/",
  },
});
const validatePassword = (dataUser: any, password: any) => {
  return password == dataUser[0].password ? true : false;
};
export { handler as GET, handler as POST };
