/*
 * Created on Wed Apr 24 2024
 *
 * Copyright (c) 2024 CC
 * Author:  Cristian R. Paz  */

"use client";

import PageContainer from "@/app/components/container/PageContainer";
import FormOPT from "@/app/sections/ssa/form-opt";

export default function pageOPT() {
  return (
    <PageContainer title="SSA" description="PAGE SSA">
      <FormOPT />
    </PageContainer>
  );
}
