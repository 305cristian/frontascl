"use client";
import {  Container, Box } from "@mui/material";
import React, { Suspense, useState } from "react";
import Header from "@/app/layout/header/Header";
import Footer from "@/app/layout/footer/page";
import ThemeProvider from "@/theme";

//-----------------------------------------------------------------------------------------------

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return (
    <div>
        <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        <Suspense>

        <ThemeProvider>

        <Container
          maxWidth="xl"
          sx={{
            maxWidth: "1200px",
          }}
        >
          {/* CONTENEMOR MAON */}
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>

          <br />
          <Footer />
        </Container>
      </ThemeProvider>
    </Suspense>
    </div>
  );
}
