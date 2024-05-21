/*
 * Created on Wed Apr 24 2024
 *
 * Copyright (c) 2024 CC
 * Author:  Cristian R. Paz  */

"use client";

import PageContainer from "@/app/components/container/PageContainer";
import FormRS from "@/app/sections/ssa/form-rs";

export default function pageRS() {
  return (
    <PageContainer title="SSA" description="PAGE SSA">
      <FormRS />
    </PageContainer>
  );
}
