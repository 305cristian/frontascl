/*
 * Created on Wed Apr 24 2024
 *
 * Copyright (c) 2024 CC
 * Author:  Cristian R. Paz  */

"use client";

import PageContainer from "@/app/components/container/PageContainer";
import FormIP from "@/app/sections/ssa/form-ip";

export default function pageIP() {
  return (
    <PageContainer title="SSA" description="PAGE SSA">
      <FormIP />
    </PageContainer>
  );
}
