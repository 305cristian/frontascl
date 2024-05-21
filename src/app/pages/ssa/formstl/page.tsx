/*
 * Created on Wed Apr 24 2024
 *
 * Copyright (c) 2024 CC
 * Author:  Cristian R. Paz  */

"use client";

import PageContainer from "@/app/components/container/PageContainer";
import FormSTL from "@/app/sections/ssa/form-stl";

export default function pageSTL() {
  return (
    <PageContainer title="SSA" description="PAGE SSA">
      <FormSTL />
    </PageContainer>
  );
}
