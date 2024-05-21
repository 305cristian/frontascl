/*
 * Created on Wed Apr 24 2024
 *
 * Copyright (c) 2024 CC
 * Author:  Cristian R. Paz  */

"use client";
import { styled, Container, Box } from "@mui/material";
import React, { Suspense, useState } from "react";
import Header from "@/app/layout/header/Header";
import Sidebar from "@/app/layout/sidebar/Sidebar";
import Footer from "@/app/layout/footer/page";
import { usePathname } from "next/navigation";
import ThemeProvider from "@/theme";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return (
    <MainWrapper className="mainwrapper">
      <Sidebar isSidebarOpen={isSidebarOpen} isMobileSidebarOpen={isMobileSidebarOpen} onSidebarClose={() => setMobileSidebarOpen(false)} />

      <PageWrapper className="page-wrapper">
        <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        <Suspense>
          <ThemeProvider>
            <Container
              maxWidth="xl"
              sx={{ maxWidth: "1200px" }}
            >
              {/* CONTENEDOR MODULOS */}
              <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>

              <br />
              <Footer />
            </Container>
          </ThemeProvider>
        </Suspense>
      </PageWrapper>
    </MainWrapper>
  );
}
