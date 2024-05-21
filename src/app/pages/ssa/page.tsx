/*
 * Created on Wed Apr 24 2024
 *
 * Copyright (c) 2024 CC
 * Author:  Cristian R. Paz  */

"use client";

import PageContainer from "@/app/components/container/PageContainer";
import SsaView from "@/app/sections/ssa/view/ssa-view";
import ThemeProvider from "@/theme";
import { Suspense } from "react";

export default function mainSSA() {
  return (
    <PageContainer title="SSA" description="Page SSA">
      <Suspense>
        <ThemeProvider>
          <SsaView />
        </ThemeProvider>
      </Suspense>
    </PageContainer>
  );
}
