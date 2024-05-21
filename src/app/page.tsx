/*
 * Created on Wed Apr 24 2024
 *
 * Copyright (c) 2024 CC
 * Author:  Cristian R. Paz  */

"use client";
import Auth from "@/app/sections/login/auth/auth";

import { Suspense } from "react";
import ThemeProvider from "@/theme";
import PageContainer from "./components/container/PageContainer";

const Login = () => {
  return (
    <Suspense>
      <ThemeProvider>
        <PageContainer title="Zami" description="this is login">
          <Auth />
        </PageContainer>
      </ThemeProvider>
    </Suspense>
  );
};

export default Login;
