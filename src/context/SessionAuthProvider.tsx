/*
 * Created on Thu May 02 2024
 *
 * Copyright (c) 2024 CC
 *
 * Author: Cristian R. Paz
 */

"use client";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}
const SessionAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionAuthProvider;
