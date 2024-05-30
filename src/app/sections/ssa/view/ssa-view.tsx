/*
 * Created on Wed Apr 24 2024
 *
 * Copyright (c) 2024 CC
 * Author:  Cristian R. Paz  */

import { Container, Divider, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";

// ----------------------------------------------------------------------

export default function SsaView() {
  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">SSA</Typography>
      </Stack>
      <Divider sx={{ borderStyle: "revert", m: 2 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={3}>
          <Stack spacing={2} direction="row">
            <Image src="/assets/background/overlay_3.jpg" alt="img" width={500} height={500}></Image>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Stack spacing={2} direction="row">
            <Image src="/assets/background/overlay_3.jpg" alt="img" width={500} height={500}></Image>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Stack spacing={2} direction="row">
            <Image src="/assets/background/overlay_3.jpg" alt="img" width={500} height={500}></Image>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Stack spacing={2} direction="row">
            <Image src="/assets/background/overlay_3.jpg" alt="img" width={500} height={500}></Image>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
