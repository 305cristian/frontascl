/*
 * Created on Wed Apr 24 2024
 *
 * Copyright (c) 2024 CC
 * Author:  Cristian R. Paz  */

"use client";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/*  <body className={inter.className}>{children}</body> */}
      <body className={inter.className}>
        <SessionAuthProvider>{children}</SessionAuthProvider>
      </body>
    </html>
  );
}
