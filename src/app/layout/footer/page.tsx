"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
const Footer = () => {
  const [fecha, setDate] = useState(new Date().getFullYear());
  return (
    <Box sx={{ pt: 0, textAlign: "center" }}>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Copyright &copy; {fecha} All rights reserved. &not; IT Solutions - (CLP - TICS). Ver: 1.0
        <Link href="http://clpcatering.com/">
          <span style={{ color: "#1877F2" }}> Catering CLP</span>
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
