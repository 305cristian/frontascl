/*
 * Created on Wed Apr 24 2024
 *
 * Copyright (c) 2024 CC
 * Author:  Cristian R. Paz  */

import { Button, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import BaseCard from "@/app/components/shared/BaseCard";
import Iconify from "@/app/components/iconify/iconify";

// ----------------------------------------------------------------------

export default function QaView() {
  return (
    <PageContainer title="QA" description="PAGE QA">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">QA</Typography>

       {/*    <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" width={undefined} sx={undefined} color={""} />}>
            New
          </Button> */}
        </Stack>
        <Divider sx={{ borderStyle: "revert", m: 2 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="QA CONTENT">
              <Stack spacing={2} direction="row">
                <Button variant="contained" color="error">
                  Contained
                </Button>
                <Button variant="contained" color="secondary">
                  Contained
                </Button>
                <Button variant="contained" color="success">
                  Contained
                </Button>
                <Button variant="contained" color="warning">
                  Contained
                </Button>
              </Stack>
            </BaseCard>
          </Grid>
        </Grid>
      </Container>
    </PageContainer>
  );
}
