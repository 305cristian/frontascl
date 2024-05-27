/*
 * Created on Wed Apr 24 2024
 *
 * Copyright (c) 2024 CC
 * Author:  Cristian R. Paz  */

"use client";

import PageContainer from "@/app/components/container/PageContainer";
import ReportSSA from "@/app/sections/ssa/listar-programas";

export default function reportSSA() {
  return (
    <PageContainer title="SSA" description="REPORTES">
      <ReportSSA />
    </PageContainer>
  );
}
