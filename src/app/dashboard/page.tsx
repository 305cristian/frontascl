"use client";
import DashboardMian from "@/app/sections/dashboard/dashboard";
import PageContainer from "../components/container/PageContainer";
import ThemeProvider from "@/theme";
import { Suspense } from "react";

//---------------------------------------------------------------------

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Suspense>
        <ThemeProvider>
          <DashboardMian />
        </ThemeProvider>
      </Suspense>
    </PageContainer>
  );
};

export default Dashboard;
